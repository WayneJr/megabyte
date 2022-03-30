const express = require('express');
const router = express.Router();

const passport = require('passport');
const { indexRegister, showRegister, indexLanding, showLogin, showAbout } = require('../controllers/index');


router.get('/', indexLanding);
router.get('/about', showAbout);

router.get('/register', showRegister);

router.post('/register', indexRegister);


// Login Functionality
router.get('/login', showLogin);


router.post('/login', passport.authenticate('local', {
    successRedirect: '/meals',
    failureRedirect: '/login',
    failureFlash: true
}), (req, res) => {
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Successfully logged you out')
    res.redirect('/meals');
});

module.exports = router;
