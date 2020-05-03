const local = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../model/User');

module.exports = async function(passport) {
    passport.use(
        new local({ usernameField: 'email' }, async(email, password, done) => {
            let user = await User.findOne({ email }).catch(m => console.log(m));
            if (!user) {
                done(null, false, 'Email is not registered');
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, 'Password incorrect!');
            }
            return done(null, user);
        }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}