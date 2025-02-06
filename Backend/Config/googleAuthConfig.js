import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from '../Models/User.js';
import { generate } from '../Utils/WebToken.js';

dotenv.config();

export const setupGoogleAuth = (app) => {
  app.use(passport.initialize());

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            isVerified: true
          });
          await user.save();
        }

        return done(null, user); // Pass MongoDB user
      } catch (error) {
        return done(error, null);
      }
    }
  ));
};

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, async (err, user) => {
    if (err || !user) {
      return res.send(
        `<script>
          window.opener.postMessage({ error: "Google authentication failed" }, "*");
          window.close();
        </script>`
      );
    }

    // Ensure MongoDB user is fetched correctly
    const dbUser = await User.findOne({ email: user.email }); 
    if (!dbUser) {
      return res.send(
        `<script>
          window.opener.postMessage({ error: "User not found in database" }, "*");
          window.close();
        </script>`
      );
    }

    // Generate JWT using the correct MongoDB user ID
    const token = generate(dbUser._id, res);

    // Send user data to frontend and close popup
    res.send(
      `<script>
        window.opener.postMessage({
          token: "${token}",
          user: { 
            name: "${dbUser.name}", 
            email: "${dbUser.email}", 
            userId: "${dbUser._id.toString()}",
          }
        }, "*");
        window.close();
      </script>`
    );
  })(req, res, next);
};
