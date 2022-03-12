const mongoose = require('mongoose')
const category = require('./category')
const Schema = mongoose.Schema

// Include User Model
const Category = require('./category')
const User = require('./user')

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true 
  }, 
  amount: {
    type: Number,
    required: true
  }, 
  method: {
    type: String,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: Category,
    index: true,
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
    // required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)