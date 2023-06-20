// requiring required packages
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const flash = require("connect-flash");
const https = require("https");

// creating application using express
const app = express();

// Connecting to MongoDB database
mongoose.connect("mongodb+srv://user-tester-1:RfpwqXKbLB73sCBl@chillout.tqvbohs.mongodb.net/orbitalUserDB");

app
  .set("view engine", "ejs") // Set EJS as the view engine
  .use(bodyParser.urlencoded({ extended: true })) // Parse URL-encoded bodies
  .use(express.static("public")) // Serve static files from the "public" directory
  .use(
    session({
      secret: process.env.ENCRYPTION_KEY, // Secret key for session encryption
      resave: false, // Do not save session if unmodified
      saveUninitialized: false, // Do not create session until something is stored
    })
  )
  .use(passport.initialize()) // Initialize Passport.js for authentication
  .use(passport.session()) // Enable persistent login sessions
  .use(flash()) // Enable flash messages
  .use("/scripts", express.static("scripts", { extensions: ["js"] })); // Serve JavaScript files from the "scripts" directory

// Define user schema and model for authentication
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose); // Add passport-local-mongoose plugin to handle user authentication

const User = mongoose.model("User", userSchema); // Create User model

passport.use(User.createStrategy()); // Use local strategy for authentication
passport.serializeUser(User.serializeUser()); // Serialize user for session
passport.deserializeUser(User.deserializeUser()); // Deserialize user from session

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