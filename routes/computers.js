const express = require('express');
const path = require('path');
const { index, newComputer, createComputer, showComputer, editComputer, updateComputer, deleteComputer } = require('../controllers/computers')
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Computer = require('../models/computers');
const multer = require('multer');
const { isLoggedIn, storage } = require('../middleware');
const upload = multer({ storage: storage });

router.get('/', isLoggedIn, catchAsync(index))

router.get('/new', isLoggedIn, newComputer)

router.post('/', isLoggedIn, upload.single('image'), catchAsync(createComputer))

router.get('/:id', catchAsync(showComputer))

router.get('/:id/edit', isLoggedIn, catchAsync(editComputer))

router.put('/:id', isLoggedIn, /* upload.single('image'), */ catchAsync(updateComputer))

router.delete('/:id', isLoggedIn, catchAsync(deleteComputer))

module.exports = router;

