var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var passport = require('passport');
var ensureAuthenticated = require('../../auth/auth').ensureAuthenticated;


router.get('/', function (req, res) {
    console.log('Hello im on the start page');
    res.render('home/index');
});

router.get('/home', function (req, res) {
    res.render('home/index');
});

router.get('/diet', function (req, res) {
    res.render('home/diet');
});

router.get('/potty', function (req, res) {
    res.render('home/potty');
});

router.get('/training', function (req, res) {
    res.render('home/training');
});

router.get('/about', function (req, res) {
    res.render('home/about');
});



router.get('/login', function (req, res) {
    res.render('home/login', {error: req.flash("error")});
});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout', function (req, res) {
    req.logout(() => {
        res.redirect('/home');
    });
});

router.get('/signup', function (req, res) {
    res.render('home/signup');
});

router.post('/signup', function (req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                req.flash("error", "This email is already in use.");
                res.redirect("/signup");
                return Promise.reject(new Error("This email is already in use."));
            }

            var newUser = new User({
                username: username,
                email: email,
                password: password
            });
            return newUser.save();
        })
        .then(() => {
            passport.authenticate('login', {
                successRedirect: '/',
                failureRedirect: '/signup',
                failureFlash: true
            })(req, res, next);  
        })
        .catch(err => {
            if (err.message !== "This user already exists.") {
                next(err);
            }
        });
});



module.exports = router;
