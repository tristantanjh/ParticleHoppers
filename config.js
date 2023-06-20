// Requiring required packages
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const flash = require("connect-flash");
const https = require("https");

 // Creating application using express
const app = express();

// Connecting to MongoDB database
mongoose.connect("mongodb+srv://user-tester-1:RfpwqXKbLB73sCBl@chillout.tqvbohs.mongodb.net/orbitalUserDB");

app
  .set("view engine", "ejs") // Set EJS as the view engine
  .use(bodyParser.urlencoded({ extended: true })) // Parse URL-encoded bodies
  .use(express.static("public")) // Serve static files from the "public" directory
  .use(
    session({
      secret: process.env.ENCRYPTION_KEY, // Secret key for session encryption
      resave: false, // Do not save session if unmodified
      saveUninitialized: false, // Do not create session until something is stored
    })
  )
  .use(passport.initialize()) // Initialize Passport.js for authentication
  .use(passport.session()) // Enable persistent login sessions
  .use(flash()) // Enable flash messages
  .use("/scripts", express.static("scripts", { extensions: ["js"] })); // Serve JavaScript files from the "scripts" directory

module.exports = {
  app,
  mongoose,
  passport,
  passportLocalMongoose,
};