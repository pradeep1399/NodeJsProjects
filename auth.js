const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(async (username, password, done) => {
    // authentication logic
    try{
        console.log('Received credentials:', username, password);
        const user = await User.findOne({username: username});
        if(!user)
            return done(null, false, {message: 'incorrect username.'});
        const isPasswordMatch =  await user.comparePassword(password);
        if(isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Incorrect password.'});
        }
    } catch(err) {
        return done(err);
    }
}));

module.exports = passport; // Export configujred passport