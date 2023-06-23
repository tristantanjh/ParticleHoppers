// Require necessary configured packages
const { mongoose, passport, passportLocalMongoose } = require("./config");

// Define user schema and model for authentication
const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" }); // Add passport-local-mongoose plugin to handle user authentication

const User = mongoose.model("User", userSchema); // Create User model

passport.use(User.createStrategy()); // Use local strategy for authentication
passport.serializeUser(User.serializeUser()); // Serialize user for session
passport.deserializeUser(User.deserializeUser()); // Deserialize user from session

module.exports = {
    User,
    passport,
};