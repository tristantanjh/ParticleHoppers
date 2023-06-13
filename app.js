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

// creating application using express

const app = express();

app.set('view engine', 'ejs');
mongoose.connect("mongodb+srv://admin-1:" + process.env.MONGO_ADMIN_1_PASSWORD + "@chillout.tqvbohs.mongodb.net/orbitalUserDB");

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

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.route("/")
    .get((req, res) => {
        res.render("home");
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
        res.render("login", { error: errorMessage });
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
            res.render("register");
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
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.render("quote");
        } else {
            res.redirect("/login");
        }
    });

app.listen(3000, function() {
    console.log("Server started on port 3000");
    });