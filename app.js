// requiring required packages

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const _ = require("lodash");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const flash = require("connect-flash");
const https = require("https");

// creating application using express

const app = express();

app.set('view engine', 'ejs');
mongoose.connect("mongodb+srv://user-tester-1:RfpwqXKbLB73sCBl@chillout.tqvbohs.mongodb.net/orbitalUserDB");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
    secret: process.env.ENCRYPTION_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/scripts', express.static('scripts', { "extensions": ["js"] }));

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

app.route("/")
    .get((req, res) => {
        res.render("home", { pageTitle: "Home" });
    });

app.route("/logout")
    .get((req, res) => {
        req.logout((err) => {
            console.log(err);
        });
        res.redirect("/");
    });

app.route("/login")
    .get((req, res) => {
      if (req.isAuthenticated()) {
        res.render("breathe");
      } else {
        const errorMessage = req.flash("error")[0];
        res.render("login", { error: errorMessage, pageTitle: "Login" });
      }
    })
    .post(passport.authenticate("local", {
        successRedirect: "/breathe",
        failureRedirect: "/login",
        failureFlash: true
    }), (req, res) => {
        // Flash a specific error message
        req.flash("error", "Invalid username or password.");
        // Redirect back to the login page
        res.redirect("/login");
    });

app.route("/register")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.redirect("/breathe");
        } else {
            res.render("register", { pageTitle: "Register" });
        }
    })
    .post((req, res) => {
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

app.route("/breathe")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.render("breathe");
        } else {
            res.redirect("/login");
        }
    });

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

app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
    });