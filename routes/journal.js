const express = require('express');
const router = express.Router();

// Renders About page
router.get("/", (req, res) => {
    res.render("journal", { pageTitle: "Journal"});
});

module.exports = router;