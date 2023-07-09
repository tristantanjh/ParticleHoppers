const express = require('express');
const router = express.Router();

// Renders home page
router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("breathe");
    } else {
        res.redirect("/login");
    }
});

module.exports = router;