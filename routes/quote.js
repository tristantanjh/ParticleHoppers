const express = require('express');
const router = express.Router();
const { https } = require('../config');

let cachedQuote = null;
let cacheExpirationTime = null;

// Function to fetch a new daily quote from Zenquotes API and update the cache
function fetchAndCacheQuote() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'zenquotes.io',
            path: '/api/today',
            method: 'GET',
        };
    
        const req = https.request(options, res => {
            let data = '';
        
            res.on('data', chunk => {
                data += chunk;
            });
        
            res.on('end', () => {
                const quoteData = JSON.parse(data);
                const quote = quoteData[0].q;
                const author = quoteData[0].a;
        
                // Cache the quote and set the expiration time at 8 AM
                cachedQuote = { q: quote, a: author }; 
                cacheExpirationTime = calculateCacheExpiration();

                // console.log('Quote cached:', cachedQuote);
                // console.log('Cache expiration time:', cacheExpirationTime);

                resolve();
            });
        });
    
        req.on('error', error => {
            console.log('Error:', error);
            reject(error);
        });
        
        req.end();
    })
}

// Function to calculate the cache expiration time at 8 AM local time
function calculateCacheExpiration() {
    const now = new Date();
    const expirationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0);
    
    // Check if the current time is past 8 AM
    if (now > expirationTime) {
      expirationTime.setDate(expirationTime.getDate() + 1); // Set expiration to tomorrow's 8 AM
    }
  
    return expirationTime.getTime() - now.getTime();
}


// Quote route
router.get("/", async (req, res) => {
    if (req.isAuthenticated()) {
        // Check if the cache is expired or not available
        if (!cachedQuote || !cacheExpirationTime || cacheExpirationTime <= 0) {
            // console.log('Fetching new quote and caching...');
            await fetchAndCacheQuote();
        } 
        // Send the quote response
        if (cachedQuote && cachedQuote.q && cachedQuote.a) {
            res.render("quote", { 
                pageTitle: "Quote of the Day",
                quote: cachedQuote.q,
                quoteAuthor: cachedQuote.a
            });
        } else {
            res.status(500).send('Error: Quote not available');
        }
    } else {
        res.redirect("/login");
    }
});

module.exports = router;