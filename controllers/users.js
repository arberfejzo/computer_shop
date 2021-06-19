const User = require('../models/users');
const Computer = require('../models/computers')

module.exports.home = async (req, res, next) => {
    const computers = await Computer.find({});
    res.render('home', { computers })
};

module.exports.desktop = async (req, res, next) => {
    const computers = await Computer.find({versioni: "Desktop"});
    res.render('home', { computers })
};

module.exports.laptop = async (req, res, next) => {
    const computers = await Computer.find({versioni: "Laptop"});
    res.render('home', { computers })
};

module.exports.workstation = async (req, res, next) => {
    const computers = await Computer.find({workstation: "true"});
    res.render('home', { computers })
};

module.exports.register = (req, res) => {
    res.render('register');
};

module.exports.registerSubmit = async (req, res, next) => {
    console.log(req.body)
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to e3computers!');
            res.redirect('/computers');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.login = (req, res) => {
    res.render('login');
};

module.exports.userAuthenticate = (req, res) => {
    req.flash('success', 'Wellcome back');
    const redirectUrl = req.session.returnTo || '/computers';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/');
};