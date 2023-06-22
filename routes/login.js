const express = require('express');
const router = express.Router();
const { passport } = require('../user');

router.get("/", (req, res) => {
    // Redirects to Breathe page if already logged in
    if (req.isAuthenticated()) {
        res.redirect("/breathe");
    } else {
        // Renders the error message for incorrect username or password
        const errorMessage = req.flash("error")[0];
        res.render("login", { error: errorMessage, pageTitle: "Login" });
    }
});

// Redirects to Breathe page on successful login
router.post("/", passport.authenticate("local", {
        successRedirect: "/breathe",
        failureRedirect: "/login",
        failureFlash: true
    }), (req, res) => {
        // Redirect back to the login page on entering invalid login details
        res.redirect("/login");
    }
);

module.exports = router;