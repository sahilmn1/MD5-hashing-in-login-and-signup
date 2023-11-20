// server.js

const express = require("express");
const mongoose = require("mongoose");
const md5 = require("md5"); // Using MD5 for educational purposes only; use bcrypt for production
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

mongoose.connect(
  "mongodb+srv://sahilabcd60:sahilmn@cluster0.6nkidrb.mongodb.net/mern_login"
);

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB database");
});

// Create a User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema, "signup");

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Endpoint to handle user registration
// Endpoint to handle user registration
app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
  
    // Hash the password using MD5 (replace with bcrypt for production)
    const hashedPassword = md5(password);
  
    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        // If the username is already taken, return an error
        res.status(409).send("Username already exists. Please choose a different one.");
      } else {
        // If the username is not taken, save the new user
        const newUser = new User({
          username,
          password: hashedPassword,
        });
  
        await newUser.save();
        res.status(200).send("User registered successfully.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error registering new user.");
    }
  });
// Endpoint to handle user login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Hash the provided password for comparison
  const hashedPassword = md5(password);

  try {
    const user = await User.findOne({ username, password: hashedPassword });

    if (user) {
      res.status(200).send("Login successful!");
    } else {
      res.status(401).send("Invalid username or password.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during login.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
