const passport = require('passport')
const JwtPassport = require('passport-jwt').Strategy
const localStrategy = require('passport-local').Strategy
const GooglePlusTokenStrategy = require('passport-google-token').Strategy
const FacebookToken = require('passport-facebook-token')

const { ExtractJwt } = require('passport-jwt')
const { JWT_SECRET, oauth } = require('./server/configuration/index')
const User = require('./server/models/user')
const configuration = require('./server/configuration/index')

// JSON WEB TOKEN STRATEGY
passport.use(
  new JwtPassport(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        // find the users specified in token
        const user = await User.findById(payload.sub)
        // handel if user doesn't exist
        if (!user) {
          return done(null, false)
        }
        //otherwise return the user

        done(null, user)
      } catch (error) {
        done(error, false)
      }
    },
  ),
)

//Google OAuth Strategy

passport.use(
  'googleToken',
  new GooglePlusTokenStrategy(
    {
      clientID: configuration.oauth.google.clientID,
      clientSecret: configuration.oauth.google.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //check if user exist in our database
        const existUser = await User.findOne({ 'google.id': profile.id })

        if (existUser) {
          return done(null, existUser)
        }
        //if new account
        const newUser = new User({
          method: 'google',
          google: {
            id: profile.id,
            email: profile.emails[0].value,
            name: profile.name.givenName,
          },
        })

        await newUser.save()
        done(null, newUser)
      } catch (error) {
        done(error, false, error.message)
      }
    },
  ),
)
//facebook Login
passport.use(
  'facebookToken',
  new FacebookToken(
    {
      clientID: configuration.oauth.facebook.clientID,
      clientSecret: configuration.oauth.facebook.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //check if user exist in our database
        const existUser = await User.findOne({ 'facebook.id': profile.id })

        if (existUser) {
          return done(null, existUser)
        }
        //if new account
        const newUser = new User({
          method: 'facebook',
          facebook: {
            id: profile.id,
            email: profile.emails[0].value,
            name: profile.name.givenName,
          },
        })

        await newUser.save()
        done(null, newUser)
      } catch (error) {
        done(error, false, error.message)
      }
    },
  ),
)
// LOCAL STRATEGY

passport.use(
  new localStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        //find the user
        const user = await User.findOne({ 'local.email': email })

        //if not ,handel it
        if (!user) {
          return done(null, false)
        }
        //check if password is correct

        const isMatch = await user.ValidatePassword(password)

        //if not handel it
        if (!isMatch) {
          return done(null, false)
        }

        // otherwise return the user
        done(null, user)
      } catch (error) {
        console.log(email, password)
        done(error, false)
      }
    },
  ),
)
