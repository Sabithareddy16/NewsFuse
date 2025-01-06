const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
    // preferences: {
    //     categories: [String],
    //     sources: [String],
    // },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);