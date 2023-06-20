const express = require('express');
const router = express.Router();

// Renders About page
router.get("/", (req, res) => {
    res.status(404).render('404');
});

module.exports = router;