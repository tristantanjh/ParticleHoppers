const express = require('express');
const router = express.Router();

// Renders Journal page
router.get("/", (req, res) => {
    res.render("journal", { pageTitle: "Journal"});
});

module.exports = router;