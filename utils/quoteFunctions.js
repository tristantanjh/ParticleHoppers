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
                cacheExpirationTime = getNextExpirationTime();

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

// Function to calculate the next cache expiration time at 8 AM local time
function getNextExpirationTime() {
    const now = new Date();
    let expirationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0);
  
    // Check if the current time is past 8 AM
    if (now > expirationTime) {
      expirationTime.setDate(expirationTime.getDate() + 1); // Move to the next day
    }
  
    return expirationTime;
  }

// Function to check if the cache has expired
function hasCacheExpired() {
    const now = new Date();
    return now > cacheExpirationTime;
  }

function isQuoteCached() {
    return cachedQuote != null;
}

module.exports = {
    fetchAndCacheQuote,
    hasCacheExpired,
    cachedQuote: () => cachedQuote,
    isQuoteCached,
}