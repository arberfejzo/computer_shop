const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require("method-override");
const mongoose = require('mongoose');
const passport = require("passport");
const LocalStrategy = require('passport-local');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const flash = require('connect-flash');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const ejsMate = require('ejs-mate');
const Computer = require('./models/computers');
const User = require('./models/users');
const multer = require('multer');
const fs = require('fs');
//const { session } = require('passport');

mongoose.connect('mongodb://localhost:27017/e3', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
   
  const upload = multer({ storage: storage })


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('database connected');
});


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

const userRoutes = require('./routes/users')
const computerRoutes = require('./routes/computers')
//const reviewRoutes = require('./routes/reviews')

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/e3',
        autoRemove: 'native' // Default
      }),
    cookie: {
        maxAge: 180 * 60 * 1000,
    }
}
app.use(session(sessionConfig));
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
    res.locals.session = req.session;
    next();
})

app.use('/', userRoutes);
app.use('/computers', computerRoutes);
//app.use('/campgrounds/:id/reviews', reviewRoutes);

/* app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
}) */

/* app.get('/', async (req, res) => {
    const computers1 = await Computer.find({});
    res.render('home', {computers1});
}) */

/* app.get('/admin', async (req, res) => {
    res.render('login')
})

app.get('/computers', async (req, res) => {
    const computers = await Computer.find({});
    res.render('computers/index', { computers })
})

app.get('/computers/new', (req, res) => {
    res.render('computers/new')
}) */

/* app.post('/computers', upload.single('image'), async (req, res) => {
    const computer = new Computer(req.body.computer);
    const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    computer.image = file.filename;
    await computer.save();
    res.redirect(`computers/${computer._id}`)
});

app.get('/computers/:id', async (req, res) => {
    const computer = await Computer.findById(req.params.id)
    res.render('computers/show', { computer });
}); */

/* app.get('/computers/:id/edit', async (req, res) => {
    const computer = await Computer.findById(req.params.id);
    res.render('computers/edit', { computer })
}); */

app.listen(3000, () => {
    console.log('Serving on port 3000');
});