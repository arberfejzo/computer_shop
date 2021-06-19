const ExpressError = require('./utils/ExpressError');
const Computer = require('./models/computers');
const User = require('./models/users');
const multer = require('multer');
const path = require('path');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //store the url they are requesting
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in');
        return res.redirect('/login');
    }
    next();
}

module.exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})