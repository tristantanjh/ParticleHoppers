const express = require('express');
const router = express.Router();
const { User, passport } = require('../user');

const defaultMainText = "It's okay to not be okay."
const defaultSubText = "We’re here to support and allow everyone to feel more at ease in their daily lives by providing support and guidance along the way. No matter what you’re going through, we’re here for you."

// Renders home page
router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.user._id;
        User.findOne({ _id: userId })
            .then((user) => {
                const username = user.username;
                console.log(username);
            })
            .catch((error) => {
                console.error('Error retrieving user:', error);
            });
        res.render("home", { pageTitle: "Home" });
    } else {
        res.render("home", { pageTitle: "Home" });
    }
});

module.exports = router;