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
// Registers new user in database, then redirects to Breathe page
    User.register({username: req.body.username}, req.body.password, (err, user) => {
        if (err) {
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