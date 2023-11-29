const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        minLength: 5,
        required: true
    },
    description: String,
    release_year: String,
    // TODO: genre should be array of objectID mongoose.Schema.Types.ObjectId
    genres: Array,
    duration: Number,
    casts: Array,
    director: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },

    updated_at: {
        type: Date,
        default: Date.now()
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie