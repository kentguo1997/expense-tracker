// Include passport & passport strategy
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
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Email or Password incorrect' })
        }
        return done(null, user)
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
