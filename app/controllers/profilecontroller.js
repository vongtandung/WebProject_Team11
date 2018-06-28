var express = require('express'),
    profilerepo = require('../repos/profilerepo');
config = require('../config/config');
var router = express.Router();

router.get('/profile', (req, res) => {
    res.render('account/profile');
});

router.post('/profile', (req, res) => {
    var user = {
        email: req.body.email,
        password: sha256(req.body.password).toString(),
        name: req.body.fname + req.body.lname,
        phone: req.body.phone,
        dob: req.body.dob,
        address: req.body.address,
        gender: req.body.gender,
        index: 0
    };
    profilerepo.findemail(user.email).then(rows => {
        if (rows = 1) {
            profilerepo.delete(email).then(value =>{
                var url = '/profile';
                res.redirect(url);
            });
            profilerepo.add(user).then(value => {
                var url = '/profile';
                res.redirect(url);
            });
        } else {
            var vm = {
                flag:1
            };
            res.render('account/register', vm);
        }
    });
});
router.get('/login', (req, res) => {
    res.render('account/login');
});
router.post('/login', (req, res) => {

    var a = sha256(req.body.password).toString();
    var user = {
        username: req.body.email,
        password: a
    };

    accountrepo.login(user).then(rows => {
        if (rows.length > 0) {
            // req.session.isLogged=true;
            var url = '/dashboard';
            res.redirect(url);
            
        } else {
            var vm = {
                flag:1
            };

            res.render('account/login', vm);
        }
    });
});

module.exports = router;