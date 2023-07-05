const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { JournalEntry } = require('../models/journalEntry');

// Renders Journal page
router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("journal", { pageTitle: "Journal"});
    } else {
        res.redirect("/login");
    }
});

router.post('/', async (req, res) => {
    try {
      const currentUser = req.user; // Access the authenticated user from req.user
      const { title, content } = req.body;
  
      // Create a new journal entry
      const journalEntry = await JournalEntry.create({
        title,
        content,
        user: currentUser._id // Set the user ID for the journal entry
      });
  
      // Update the user's journalEntries array
      currentUser.journalEntries.push(journalEntry);
      await currentUser.save();
  
      console.log('Journal entry created successfully');
      res.redirect("/journal");
    } catch (error) {
      console.error(error);
    }
});

module.exports = router;