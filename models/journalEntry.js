const { mongoose } = require("../config");

const journalEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);

module.exports = { JournalEntry };
