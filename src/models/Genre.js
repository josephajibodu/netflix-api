const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 6,
        required: true,
    },
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;