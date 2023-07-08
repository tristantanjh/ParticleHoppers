const express = require('express');
const router = express.Router();
const { User, passport } = require('../models/user');


// Renders about page
router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.user._id;
        User.findOne({ _id: userId })
            .then((user) => {
                const username = user.username;
                res.render("about", {
                    pageTitle: "About",
                    loginOrQuoteRoute: "/quote",
                    loginOrQuoteText: "Daily Quote"
                });
            })
            .catch((error) => {
                console.error('Error retrieving user:', error);
            });
    } else {
        res.render("about", {
            pageTitle: "About",
            loginOrQuoteRoute: "/login",
            loginOrQuoteText: "Login"
        });
    }
});

module.exports = router;






