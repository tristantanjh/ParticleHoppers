const express = require('express');
const router = express.Router();
const { User, passport } = require('../models/user');

const defaultMainText = "It's okay to not be okay."
const defaultSubText = "We’re here to support and allow everyone to feel more at ease in their daily lives by providing support and guidance along the way. No matter what you’re going through, we’re here for you."
const loginSubText = "Thank you for allowing us to support your mental health journey. Explore our app's empowering features and unlock personalized support for a transformative experience. "

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
                    loginOrLogoutRoute: "/logout",
                    loginOrLogoutText: "Logout",
                    isVisible: true
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
            loginOrLogoutRoute: "/login",
            loginOrLogoutText: "Login",
            isVisible: false
        });
    }
});

module.exports = router;