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
        res.render("login", { error: false });
      }
    })
    .post((req, res) => {
      const user = new User({
        username: req.body.username,
        password: req.body.password
      });
  
      req.login(user, (err) => {
        if (err) {
          console.log(err);
          res.status(401).json({ error: "Incorrect username or password" });
        } else {
          passport.authenticate("local", (err, user, info) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: "Internal server error" });
            }
            if (!user) {
              return res.status(401).json({ error: "Incorrect username or password" });
            }
            req.logIn(user, (err) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal server error" });
              }
              return res.status(200).json({ success: true });
            });
          })(req, res);
        }
      });
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