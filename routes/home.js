const express = require('express');
const router = express.Router();

// Renders home page
router.get("/", (req, res) => {
    res.render("home", { pageTitle: "Home" });
});

module.exports = router;