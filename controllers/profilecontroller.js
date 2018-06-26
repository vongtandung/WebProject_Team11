var express = require('express'),
    profilerepo = require('../repos/profilerepo');
     sha256 = require('crypto-js/sha256'),
    moment = require('moment'),

var router = express.Router();

router.get('/profile', (req, res) => {
    res.render('account/profile');
});

router.post('/profile', (req, res) => {
    var user = {
        password: sha256(req.body.Password).toString(),
        name: req.body.Fname + req.body.Lname,
        phone: req.body.Phone,
        dob: req.body.DOB,
        address: req.body.Address,
        gender: req.body.Gender,
        index: 0
    };
    profilerepo.findemail(user.email).then(rows => {
        if (rows = 1) {
            profilerepo.update(user.password, user.name, user.phone, user.dob, user.address, user.gender).then(value =>{
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