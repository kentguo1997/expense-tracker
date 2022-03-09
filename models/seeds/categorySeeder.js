// Include config/mongoose.js
const db = require('../../config/mongoose')

// Include category model
const Category = require('../category')

// define category seed data
let categoryId = Math.floor(Math.random()*100) + 1
const categories = [
  { 
    name: '家居物業',
    icon: 'https://fontawesome.com/icons/home?style=solid'
   },
  {
    name: '交通出行',
    icon: 'https://fontawesome.com/icons/shuttle-van?style=solid'       
  },
  {
    name: '休閒娛樂',
    icon: 'https://fontawesome.com/icons/grin-beam?style=solid'  
  }, 
  {
    name: '餐飲食品',
    icon: 'https://fontawesome.com/icons/utensils?style=solid'   
  },
  {
    name: '其他',
    icon: 'https://fontawesome.com/icons/pen?style=solid'
  }
]


db.once('open', () => {
  Promise.all(Array.from(categories, category => {
    categoryId = categoryId + 1
    return Category.create({
      categoryId,
      categoryName: category.name,
      categoryIcon: category.icon
    })
  })).then(() => {
    console.log('done')
    process.exit() 
  })
})