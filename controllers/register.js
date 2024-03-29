const express = require('express');
const router = express.Router();
const { User, passport } = require('../models/user');

// Redirects to Home page if already logged in
router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/");
    } else {
        const errorMessage = req.flash("error")[0];
        res.render("register", { error: errorMessage, pageTitle: "Register" });
    }
});

router.post("/", (req, res) => {
    // Check if any fields are empty
    if (!req.body.email || !req.body.username || !req.body.password) {
        req.flash("error", "Missing credentials");
        res.redirect("/register");
        return;
    }

    // Check if the fields are strings
    if (typeof req.body.email !== "string" || typeof req.body.username !== "string" || typeof req.body.password !== "string") {
        req.flash("error", "Invalid password format");
        res.redirect("/register");
        return;
    }

    // Registers new user in database, then redirects to Breathe page
    User.register(
        {
            email: req.body.email,
            username: req.body.username,
            journalEntries: [],
        },
        req.body.password, (err, user) => {
        if (err) {
            if (err.code === 11000 || err.name === "UserExistsError") {
                // Duplicate key error, indicating a repeated username
                req.flash("error", "Email or username is already taken");
              } else {
                req.flash("error", "There was an error with your request. Please contact the support team for assistance!");
              }
            req.flash("error", "There was an error with your request. Please contact the support team for assistance!"); 
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/");
            });
        }
    });
});

module.exports = router;