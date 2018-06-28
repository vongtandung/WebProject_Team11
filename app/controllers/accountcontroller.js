var express = require('express'),
    sha256 = require('crypto-js/sha256'),
    moment = require('moment'),
    accountrepo = require('../repos/accountrepo'),
    adminrepo = require('../repos/adminrepo'),
    restrict = require('../middle-wares/restrict');

var router = express.Router();
router.get('/register', (req, res) => {
    res.render('account/register');
});
router.post('/register', (req, res) => {
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
    accountrepo.findemail(user.email).then(rows => {
        if (rows < 1) {
            accountrepo.add(user).then(value => {
                req.session.user = rows[0];
                req.session.isLogged = true;
                req.session.cart = [];
                res.redirect('/');
                
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
            req.session.user = rows[0];
            req.session.isLogged = true;
            req.session.cart = [];
            if(rows[0].index===1)
            {
                req.session.isAdmin=true;
            }
            res.redirect('/');
            
        } else {
            var vm = {
                flag:1
            };
            res.render('account/login', vm);
        }
    });
});

router.post('/logout', (req, res) => {
    req.session.user = null;
    req.session.isLogged = false;
    req.session.cart = [];
    req.session.isAdmin=false;
    res.redirect(req.headers.referer);

});
router.get('/history',(req,res)=>{
    var us=req.session.user.Email;
    console.log(us);
    accountrepo.loabillbyid(us).then(row=>{
        if(row.length>0)
        {
        var vm={
            bill:row,
            custom:req.session.user
        }
        res.render('account/buyhistory',vm);
    }
    else{
        res.render('account/buyhistory');
    }
    });
    
    });

    router.get('/billdetail/:Madh', (req, res) => {
        var Ma = req.params.Madh;
        var p1 = adminrepo.customerinfo(Ma);
        var p2 = adminrepo.productinfo(Ma);
        var p3 = adminrepo.sumbill(Ma);
        var p4 = adminrepo.countbill(Ma);
        Promise.all([p1, p2, p3, p4]).then(([cus, pro, sum, count]) => {
            if (pro.length > 0) {
                var vm = {
                    customer: cus,
                    product: pro,
                    sumb: sum,
                    countb: count
                };
                console.log(vm);
                res.render('admin/billdetail', vm);
            } else {
                res.end('NO PRODUCT');
            }
        });
    });
    router.get('/profileupdate', (req, res) => {
        res.render('account/profileupdate');
    });
    router.post('/profileupdate', (req, res) => {
    
        var user = {
            email: req.session.user.Email,
            name: req.body.hoten,
            phone: req.body.sdt,
            dob: req.body.dob,
            address: req.body.add,
            gender: req.body.gioi
        };
        console.log(user);
        accountrepo.editaccount(user).then(row=>{
            req.session.user=row[0];
            res.redirect('/');
        });
    });

module.exports = router;