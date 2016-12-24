var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config/config'); // load the auth variables

module.exports = function(passport) {
  
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  // ============== FACEBOOK ========================================================

  passport.use(new FacebookStrategy({
    // pull in our app id and secret from our auth.js file
    clientID        : config.facebookAuth.clientID,
    clientSecret    : config.facebookAuth.clientSecret,
    callbackURL     : config.facebookAuth.callbackURL
  },
  function(token, refreshToken, profile, done) { // facebook will send back the token and profile
      // asynchronous
      process.nextTick(function() {
        var newUser = {
          facebook:{}
        };

        // set all of the facebook information in our user model
        newUser.facebook.id    = profile.id; // set the users facebook id                   
        newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
        newUser.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
        
        // if successful, return the new user
        return done(null, newUser);
      });
  }));
}