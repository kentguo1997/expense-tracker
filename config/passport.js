// Include passport & passport strategy
const bcrypt = require('bcryptjs/dist/bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// Include User Model
const User = require('../models/user')

// export as a function for controller to use
module.exports = app => {
  // passport initialization & setting login session
  app.use(passport.initialize())
  app.use(passport.session())
  
 
  // local strategy
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('loginError', '找不到這個使用者！'))
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch =>{
            if(!isMatch){
              return done(null, false, req.flash('loginError', '信箱或密碼輸入錯誤！'))
            }
            return done(null, user)
          })
      })
      .catch(error => done(err, false))
  }))

  
  // serialization & deserialization
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })

}
