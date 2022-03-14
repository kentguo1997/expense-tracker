// Include config/mongoose.js
const db = require('../../config/mongoose')

// Include record & category model
const Record = require('../record')
const Category = require('../category')
const User = require('../user')

// define record & seed data
const records = [
  {
    name: '房租',
    date: '2022-03-08',
    amount: 7000,
    method: '現金',
    categoryName: '家居物業'
  },
  {
    name: '通勤',
    date: '2022-03-08',
    amount: 100,
    method: '現金',
    categoryName: '交通出行'
  },
  {
    name: '高爾夫',
    date: '2022-03-08',
    amount: 1000,
    method: '信用卡',
    categoryName: '休閒娛樂'
  },
  {
    name: '晚餐',
    date: '2022-03-08',
    amount: 300,
    method: '行動支付',
    categoryName: '餐飲食品'
  },
  {
    name: '罰單',
    date: '2022-03-08',
    amount: 1000,
    method: '現金',
    categoryName: '其他'
  }
]

const users = [
  {
    name: '小明',
    email: 'user1@example.com',
    password: '12345678',
    writtenRecords: records.slice(2)
  },
  {
    name: '小花',
    email: 'user2@example.com',
    password: '12345678',
    writtenRecords: records.slice(0, 2)
  }
]

// create data once db connected
db.once('open', () => {
  Promise.all(Array.from(users, seedUser => {
    return User.create({
      name: seedUser.name,
      email: seedUser.email,
      password: seedUser.password
    }) .then(user => {
      const userId = user._id
      seedUser.writtenRecords.forEach(writtenRecord => {
        Category.findOne({ categoryName: writtenRecord.categoryName })
          .then(category => {
            const categoryId = category._id
            const categoryIcon = category.categoryIcon
            Record.create({
              name: writtenRecord.name,
              date: writtenRecord.date,
              amount: writtenRecord.amount,
              method: writtenRecord.method,
              categoryId,
              categoryIcon,
              userId
            })
          })  
      }) 
    })
  })).then(() => {
    console.log('done') 
  })
})

