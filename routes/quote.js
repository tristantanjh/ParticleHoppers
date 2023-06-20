const express = require('express');
const router = express.Router();
const { fetchAndCacheQuote, cachedQuote, cacheExpirationTime } = require('../utils/quoteFunctions');

// Quote route
router.get("/", async (req, res) => {
    if (req.isAuthenticated()) {
        // Check if the cache is expired or not available
        if (!cachedQuote() || !cacheExpirationTime() || cacheExpirationTime() <= 0) {
            // console.log('Fetching new quote and caching...');
            await fetchAndCacheQuote();
        } 
        // Send the quote response
        if (cachedQuote() && cachedQuote().q && cachedQuote().a) {
            res.render("quote", { 
                pageTitle: "Quote of the Day",
                quote: cachedQuote().q,
                quoteAuthor: cachedQuote().a
            });
        } else {
            res.status(500).send('Error: Quote not available');
        }
    } else {
        res.redirect("/login");
    }
});

module.exports = router;