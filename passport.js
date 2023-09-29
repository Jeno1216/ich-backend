const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const UserModel = require('./models/UserModel'); // Import your user model

const GOOGLE_CLIENT_ID = "832242390921-uc654kg4hhp9kdumt9qkmbm36ohk0spo.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"


passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "https://iloilo-coffee-house-api.onrender.com/auth/google/callback",
  scope: ['profile', 'email']  // Add this line
},

function(accessToken, refreshToken, profile, done) {
    console.log(profile.photos[0]);  // Log the profile object here

  UserModel.findOne({ email: profile.emails[0].value }).then((currentUser) => {
      if(currentUser){
          // if we already have a record with the given profile ID
          done(null, currentUser);
      } else{
          // if not, create a new user 
          new UserModel({
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value,  // Access the email from the profile object
              picture: profile.photos[0].value // Access the email from the profile object
          }).save().then((newUser) => {
              done(null, newUser);
          });
      } 
  })
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});