const express = require('express');
const router = express.Router();

// Logs user out and redirects to home page
router.get("/", (req, res) => {
    req.logout((err) => {
        console.log(err);
    });
    res.redirect("/");
});

module.exports = router;