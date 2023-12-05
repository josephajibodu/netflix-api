const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        minlength: 6,
        required: true,
    },
    full_name: { type: String, required: true },
    dob: Date,
    gender: String,
    role: {
        type: String,
        required: false,
        enum: ['admin', 'movie-actor', 'customer']
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;