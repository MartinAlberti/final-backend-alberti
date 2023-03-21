const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Users = require('../models/user.mongo');
const logger = require('../logger/logger');


const UsersModel = new Users();

passport.use(new LocalStrategy(
    async function (username, password, done) {
        const user = await UsersModel.getByEmail(username)
        let isValidPassword = await bcrypt.compare(password, user.password);
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!isValidPassword) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);

    }
));

passport.use('login', new LocalStrategy(async (username, password, done) => {
    try {
        const user = await UsersModel.getByEmail(username)
        let isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            logger.error('Error login user in...')
            return done(null, false)
        }
        return done(null, user)
    } catch (error) {
        logger.error('Error login user in...')
        return done(error)
    }
}))


passport.serializeUser((user, done) => {
    return done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await UsersModel.getById(id)
    return done(null, user)
})

module.exports = passport;