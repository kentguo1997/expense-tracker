// Include config/mongoose.js
const db = require('../../config/mongoose')

// Include category model
const Category = require('../category')

// define category seed data
const categories = [
  { 
    name: '家居物業',
    icon: 'fa-solid fa-house'
   },
  {
    name: '交通出行',
    icon: 'fa-solid fa-van-shuttle'       
  },
  {
    name: '休閒娛樂',
    icon: 'fa-solid fa-face-grin-beam'  
  }, 
  {
    name: '餐飲食品',
    icon: 'fa-solid fa-utensils'   
  },
  {
    name: '其他',
    icon: 'fa-solid fa-pen'
  }
]


db.once('open', () => {
  Promise.all(Array.from(categories, category => {
    return Category.create({
      categoryName: category.name,
      categoryIcon: category.icon
    })
  })).then(() => {
    console.log('done')
    process.exit() 
  })
})