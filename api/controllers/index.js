const User = require('../../models/user');

function indexLanding(req, res) {
    res.render('meals/landing');
}

function showRegister(req, res) {
    res.render('register');
}

function indexRegister(req, res) {
    User.register(new User({name: req.body.name, username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/meals');
        });
    })
}

function showLogin(req, res) {
    res.render('login');
}


module.exports = {indexLanding, showRegister, indexRegister, showLogin};