import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import dotenv from 'dotenv';
import User from '../Models/User.js';

dotenv.config();

export const setupGoogleAuth = (app) => {
  // Session setup
  app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // If the user doesn't exist, create a new one
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            isVerified : true
          });
          await user.save();
        }

        return done(null, user); // Pass the user to the next middleware (e.g., saving to session)
      } catch (error) {
        return done(error, null);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user._id); // Store the user ID in session
  });

  passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) return done(null, false);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
};

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleAuthCallback = passport.authenticate('google', { 
    failureRedirect: '/', 
    successRedirect: '/dashboard' 
});
