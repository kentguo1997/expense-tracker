// Include passport & passport strategy
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

// Include bryptjs
const bcrypt = require('bcryptjs')

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


  // facebook login strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {  
    const {email, name} = profile._json
    
    User.findOne({ email })
    .then(user => {
      if(user) return done(null, user)

      const randomPassword = Math.random().toString(36).slice(-8)
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(randomPassword, salt))
        .then(hash => User.create({
          email,
          name,
          password: hash
        }))
      .then(user => done(null, user))
      .catch(err => console.log(err))
    })  
  }
  ));

  
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
