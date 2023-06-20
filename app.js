// Require configurated Express app
const { app } = require("./config");
const { User } = require("./user");

let cachedQuote = null;
let cacheExpirationTime = null;

// Function to fetch a new quote from the API and update the cache
function fetchAndCacheQuote() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'zenquotes.io',
            path: '/api/today',
            method: 'GET',
        };
    
        const req = https.request(options, res => {
            let data = '';
        
            res.on('data', chunk => {
                data += chunk;
            });
        
            res.on('end', () => {
                const quoteData = JSON.parse(data);
                const quote = quoteData[0].q;
                const author = quoteData[0].a;
        
                // Cache the quote and set the expiration time at 8 AM
                cachedQuote = { q: quote, a: author }; 
                cacheExpirationTime = calculateCacheExpiration();

                // console.log('Quote cached:', cachedQuote);
                // console.log('Cache expiration time:', cacheExpirationTime);

                resolve();
            });
        });
    
        req.on('error', error => {
            console.log('Error:', error);
            reject(error);
        });
        
        req.end();
    })
}

// Function to calculate the cache expiration time at 8 AM local time
function calculateCacheExpiration() {
    const now = new Date();
    const expirationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0);
    
    // Check if the current time is past 8 AM
    if (now > expirationTime) {
      expirationTime.setDate(expirationTime.getDate() + 1); // Set expiration to tomorrow's 8 AM
    }
  
    return expirationTime.getTime() - now.getTime();
}

// Routes and handlers

const homeRoute = require('./routes/home');
app.use(homeRoute);

const logoutRoute = require('./routes/logout');
app.use('/logout', logoutRoute);

const loginRoute = require('./routes/login');
app.use('/login', loginRoute);


// Register route
app.route("/register")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.redirect("/breathe");
        } else {
            res.render("register", { pageTitle: "Register" });
        }
    })
    .post((req, res) => {
        // Registers new user in database
        User.register({username: req.body.username}, req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                res.redirect("/register");
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/breathe");
                });
            }
        })
    });

// Breathe route
app.route("/breathe")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.render("breathe");
        } else {
            res.redirect("/login");
        }
    });

// Quote route
app.route("/quote")
    .get(async (req, res) => {
        if (req.isAuthenticated()) {
            // Check if the cache is expired or not available
            if (!cachedQuote || !cacheExpirationTime || cacheExpirationTime <= 0) {
                // console.log('Fetching new quote and caching...');
                await fetchAndCacheQuote();
            } 
            // Send the quote response
            if (cachedQuote && cachedQuote.q && cachedQuote.a) {
                res.render("quote", { 
                    pageTitle: "Quote of the Day",
                    quote: cachedQuote.q,
                    quoteAuthor: cachedQuote.a
                });
            } else {
                res.status(500).send('Error: Quote not available');
            }
        } else {
            res.redirect("/login");
        }
    });

// About route
app.route("/about")
    .get((req, res) => {
        res.render("about");
    })

// 404 Error Route
app.get('*', (req, res) => {
    res.status(404).render('404');
});

// Starting the server on port 3000
app.listen(3000, () => {
    console.log("Server started on port 3000");
});