const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/flickies'
const Playlist = require('./models/Playlist')

//connect to db
mongoose.connect(url, {
  useMongoClient: true
})
mongoose.Promise = global.Promise

const app = express()

app.use(express.static('public'))
// without this, we can't read the req.body
app.use(bodyParser.urlencoded({
  extended: true
}))

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: 'views/partials'
}))
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
  res.render('home')
})

app.get('/search', function (req, res) {
  res.render('search')
})

app.get('/playlist', function (req, res) {
  Playlist.find({}, function(err, allPlaylists) {
    if (err) throw err
    res.render('playlist/index', {
      playlists: allPlaylists
    })
  })
})

// listen to the post request and read the form data
app.post('/playlist', function (req, res) {
  var newPlaylist = new Playlist({
    name: req.body.name,
    priority: req.body.priority
  })
  newPlaylist.save(function(err, newPlaylist) {
    if (err) throw err
    console.log('New playlist is saved')
    res.redirect('/playlist')
  })
})

const port = 4000
app.listen(port, function () {
  console.log('running flickies at ' + port)
})


// const Movie = require('./models/Movie')
// const User = require('./models/User')
//
// // create movie
// // new movie will come from your form
// var newMovie = new Movie({
//   name: 'Casablanca',
//   genre: 'Oldies',
//   year: '1960',
//   rating: 88
//   // website: 'test123', this will be ignored because different from schema
//   // artist: 'j lo'
// })
//
// // newMovie.save(function (err, data) {
// //   if (err) throw err
// //
// //   console.log('new movie created')
// //   console.log('new movie', data)
// // })
//
// // creating
// var newUser = new User({
//   name: 'Shimei',
//   email: 'shimei@ga.co',
//   password: 'shimeishimei'
// })
//
// // newUser.save(function (err, data) {
// //   if (err) throw(err)
// //
// //   console.log('user is created')
// //   console.log(data)
// // })
//
// // READ
// // User.findOne({
// //   name: 'Prima'
// // }, { _id: 0 }, function (err, users) {
// //   if (err) throw err
// //   console.log(users)
// // })
//
// // UPDATE
// var qObj = {
//   email: 'prima@ga.co'
// }
//
// updObj = {
//   $set: {
//     name: 'Prima Aulia'
//   }
// }
//
// var option = {
//   new: true
// }
//
// // User.findOneAndUpdate(qObj, updObj, option, function (err, data) {
// //   if (err) throw err
// //
// //   console.log(data)
// // })
//
// // DELETE
// User.findOneAndRemove({ name: 'Shimei' }, function (err, removedData) {
//   if (err) throw err
//
//   console.log(removedData)
// })
