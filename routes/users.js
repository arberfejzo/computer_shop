const express = require('express');
const router = express.Router();
const passport = require('passport');
const { home, desktop, laptop, workstation, register, registerSubmit, login, userAuthenticate, logout } = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');

router.get('/', catchAsync(home))

router.get('/desktop', catchAsync(desktop))

router.get('/laptop', catchAsync(laptop))

router.get('/workstation', catchAsync(workstation))

router.get('/register', register);

router.post('/register', catchAsync(registerSubmit));

router.get('/login', login);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userAuthenticate);

router.get('/logout', logout);

module.exports = router;