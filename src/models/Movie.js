const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true,
  },
  description: String,
  release_year: String,
  // TODO: genre should be array of objectID mongoose.Schema.Types.ObjectId
  genres: Array,
  duration: Number,
  casts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  director: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },

  updated_at: {
    type: Date,
    default: Date.now(),
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie