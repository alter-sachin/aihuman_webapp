const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../database/schemas');

const Strategies = module.exports;

Strategies.local = new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Username doesn\'t exist' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect username or password' });
    }
    return done(null, user);
  });
});

Strategies.google = new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/api/auth/google/redirect',
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ username: profile.id.toLowerCase() })
    .then(user => {
      if (user) {
        done(null, user);
      }
      else {
        new User({
          username: profile.id.toLowerCase(),
          username_case: profile.id,
          googleAuth: true,
        })
          .save()
          .then(newUser => {
            done(null, newUser);
          });
      }
    });
});
