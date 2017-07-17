const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  }
})


// registering to
const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist
