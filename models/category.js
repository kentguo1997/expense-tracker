const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Include User Model
const User = require('./user')

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  categoryIcon: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Category', categorySchema)