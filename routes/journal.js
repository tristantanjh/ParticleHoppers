const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { JournalEntry } = require('../models/journalEntry');

// Renders Journal page
router.get("/", async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const currentUser = req.user; // Access the authenticated user from req.user
  
        // Check if the user has already submitted an entry today
        const today = new Date().setHours(8, 0, 0, 0);
        const journalEntry = await JournalEntry.findOne({
          user: currentUser._id,
          createdAt: { $gte: today },
        });
  
        if (journalEntry) {
          // Render the existing journal entry
          res.render("journal", { pageTitle: "Journal", journalEntry });
        } else {
          // Render the form to submit a new entry
          res.render("journal", { pageTitle: "Journal", journalEntry: null });
        }
      } else {
        res.redirect("/login");
      }
    } catch (error) {
      console.error(error);
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
      res.redirect("/journal");
    }
});

router.post("/edit", async (req, res) => {
    try {
      const currentUser = req.user;
      const { title, content } = req.body;
  
      // Find and update the journal entry for today
      const today = new Date().setHours(8, 0, 0, 0);
      const journalEntry = await JournalEntry.findOneAndUpdate(
        {
          user: currentUser._id,
          createdAt: { $gte: today },
        },
        { title, content },
        { new: true }
      );
  
      res.redirect("/journal");
    } catch (error) {
      console.error(error);
      res.redirect("/login");
    }
  });

module.exports = router;