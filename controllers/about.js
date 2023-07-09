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
                    loginOrLogoutRoute: "/logout",
                    loginOrLogoutText: "Logout",
                    isVisible: true
                });
            })
            .catch((error) => {
                console.error('Error retrieving user:', error);
            });
    } else {
        res.render("about", {
            pageTitle: "About",
            loginOrLogoutRoute: "/login",
            loginOrLogoutText: "Login",
            isVisible: false
        });
    }
});

module.exports = router;






