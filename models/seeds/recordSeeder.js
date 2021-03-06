// Include config/mongoose.js
const db = require('../../config/mongoose')

// Include models
const Record = require('../record')
const Category = require('../category')
const User = require('../user')

// define record & user seed data
const seedRecords = [
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

const seedUsers = [{
  name: '小明',
  email: 'user1@example.com',
  password: '12345678'
}]

// create data once db connected
db.once('open', async () => {
  await Promise.all(Array.from(seedRecords, async (seedRecord) => {
    const user = await User.findOne({ email: seedUsers[0].email })
    const userId = user._id
    const updatedRecords = []

    const category = await Category.findOne({ categoryName: seedRecord.categoryName, userId })

    seedRecord.categoryId = category._id
    seedRecord.categoryIcon = category.categoryIcon
    seedRecord.userId = userId
    delete seedRecord.categoryName
    updatedRecords.push(seedRecord)

    await Record.create(updatedRecords)
  }))

  console.log('done')
  process.exit()
})
