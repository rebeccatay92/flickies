// will help to create new movie json

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    match: emailRegex
  },
  password: String
})

userSchema.pre('save', function(next) {
  var savingUser = this
  savingUser.password += '123321123321123321'
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
