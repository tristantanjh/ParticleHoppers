const express = require('express');
const router = express.Router();
const { User, passport } = require('../user');

const defaultMainText = "It's okay to not be okay."
const defaultSubText = "We’re here to support and allow everyone to feel more at ease in their daily lives by providing support and guidance along the way. No matter what you’re going through, we’re here for you."
const loginSubText = "Thank you for allowing us to support your mental health journey."

// Renders home page
router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.user._id;
        User.findOne({ _id: userId })
            .then((user) => {
                const username = user.username;
                res.render("home", { 
                    pageTitle: "Home", 
                    mainText: "Welcome back, " + username,
                    subText: loginSubText,
                    beginOrBreatheText: "Take a Breather",
                    beginOrBreatheRoute: "/breathe",
                    loginOrQuoteRoute: "/quote",
                    loginOrQuoteText: "Daily Quote"
                });
            })
            .catch((error) => {
                console.error('Error retrieving user:', error);
            });
    } else {
        res.render("home", { 
            pageTitle: "Home",  
            mainText: defaultMainText,
            subText: defaultSubText,
            beginOrBreatheText: "Begin Now",
            beginOrBreatheRoute: "/login",
            loginOrQuoteRoute: "/login",
            loginOrQuoteText: "Login"
        });
    }
});

module.exports = router;