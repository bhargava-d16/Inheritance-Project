// const WInCO3oPxm3SnMFU
const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_CONN;
const UserProfile = require("./userprofile");

const connectDB = async () => {
  await mongoose.connect(mongo_url);
};

const createUser = async () => {
  try {
    const newUser = new UserProfile({
      username: "akash",
      name: "John Doe",
      place: "New York",
      email: "johndoe@example.com",
      phone: "1234567890",
      education: "Bachelor's in CS",
      workexperices: "Software Engineer",
      extracirrucular: "Football, Coding",
      academics: "GPA: 3.8",
      skills: ["JavaScript", "Node.js", "MongoDB"],
      currentlyworking: "Yes",
      date: Date(2024, 4, 12),
    });

    await newUser.save();
    console.log("User saved successfully!");
  } catch (error) {
    console.error("Error saving user:", error);
  } finally {
    mongoose.connection.close();
  }
};

module.exports = { connectDB, createUser };
