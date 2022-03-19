// Include config/mongoose.js
const db = require('../../config/mongoose')

// Include bcryptjs
const bcrypt = require('bcryptjs')

// Include category & User model
const Category = require('../category')
const User = require('../user')

// define category & user seed data
const seedCategories = [
  {
    categoryName: '家居物業',
    categoryIcon: 'fa-solid fa-house'
  },
  {
    categoryName: '交通出行',
    categoryIcon: 'fa-solid fa-van-shuttle'
  },
  {
    categoryName: '休閒娛樂',
    categoryIcon: 'fa-solid fa-face-grin-beam'
  },
  {
    categoryName: '餐飲食品',
    categoryIcon: 'fa-solid fa-utensils'
  },
  {
    categoryName: '其他',
    categoryIcon: 'fa-solid fa-pen'
  }
]

const seedUsers = [{
  name: '小明',
  email: 'user1@example.com',
  password: '12345678'
}]

db.once('open', () => {
  Promise.all(Array.from(seedUsers, seedUser => {
    return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        seedCategories.forEach(seedCategory => {
          seedCategory.userId = userId
        })
        return Category.create(seedCategories)
      })
  })).then(() => {
    console.log('done')
    process.exit()
  })
})
