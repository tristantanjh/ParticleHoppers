const express = require('express');
const router = express.Router();
const { User, passport } = require('../user');

// Redirects to Breathe page if already logged in
router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/breathe");
    } else {
        const errorMessage = req.flash("error")[0];
        res.render("register", { error: errorMessage, pageTitle: "Register" });
    }
});

router.post("/", (req, res) => {
    // Check if the username field is empty
    if (!req.body.email || !req.body.username || !req.body.password) {
        req.flash("error", "Missing credentials");
        res.redirect("/register");
        return;
    }
    // Registers new user in database, then redirects to Breathe page
    User.register(
        {
            email: req.body.email,
            username: req.body.username,
        },
        req.body.password, (err, user) => {
        if (err) {
            if (err.code === 11000 || err.name === "UserExistsError") {
                // Duplicate key error, indicating a repeated username
                req.flash("error", "Email or username is already taken");
              } else {
                req.flash("error", err.message);
              }
            req.flash("error", err.message); 
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/breathe");
            });
        }
    });
});

module.exports = router;