const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;

passport.use('local',
    new LocalStrategy((username, password, done) => {
      User.findOne({ email: username }, (err, user) => {
        if (err) { 
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user)
          } else {
            // passwords do not match!
            return done(null, false, { message: "Incorrect password" })
          }
        });
      });
    })
);

passport.use('jwt', new JWTStrategy({
        jwtFromRequest: function (req) {
            var token = null;
            if (req && req.cookies) token = req.cookies['jwt'];
            return token;
        },
        secretOrKey: process.env.TOKEN_SECRET
    },
    function (jwtPayload, done) {
        User.findById(jwtPayload._id)
            .then(user => {
                if (user) return done(null, user);
                else return done(null, false);
            })
            .catch(err => done(err, null));
    }
));