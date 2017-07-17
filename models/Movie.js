// will help to create new movie json

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  genre: String,
  year: {
    type: Number,
    max: 2017,
    min: 1950
  },
  rating: {
    type: Number,
    max: 99,
    min: 0
  }
})

// create movie
// update
// read
// delete (CRUD)

// registering to 
const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
