var express = require('express'),
    cartrepo = require('../repos/cartrepo'),
    adminrepo = require('../repos/adminrepo');

var router = express.Router();
router.get('/mycart', (req, res) => {
    var arr_p = [];
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        var p = adminrepo.single(cartItem.Masp);
        arr_p.push(p);
    }
    var items = [],
        sum = 0;
    Promise.all(arr_p).then(result => {
        for (var i = result.length - 1; i >= 0; i--) {
            var pro = result[i][0];
            item = {
                product: pro,
                Quantity: req.session.cart[i].Quantity,
                Amount: pro.Gia * req.session.cart[i].Quantity,
                Price: pro.Gia
            };
            items.push(item);
            sum += parseInt(pro.Gia * req.session.cart[i].Quantity);
        }
        var vm = {
            items: items,
            sum: sum
        };
        res.render('cart/cartindex', vm);
    });
});

router.post('/add', (req, res) => {
    var item = {
        Masp: req.body.proId,
        Quantity: 1
    };
    console.log(item);
    cartrepo.add(req.session.cart, item);
    res.redirect(req.headers.referer);
});

router.post('/remove', (req, res) => {
    cartrepo.remove(req.session.cart, req.body.ProID);
    res.redirect(req.headers.referer);
});
router.get('/billpay', (req, res) => {
    var arr_p = [];
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        var p = adminrepo.single(cartItem.Masp);
        arr_p.push(p);
    }
    var items = [],
        sum = 0;
    Promise.all(arr_p).then(result => {
        for (var i = result.length - 1; i >= 0; i--) {
            var pro = result[i][0];
            item = {
                product: pro,
                Quantity: req.session.cart[i].Quantity,
                Amount: pro.Gia * req.session.cart[i].Quantity
            };
            items.push(item);
            sum += parseInt(pro.Gia * req.session.cart[i].Quantity);
        }
        var vm = {
            items: items,
            sum: sum,
            name: req.session.user.Name
        };
        res.render('cart/billpay', vm);
    });
});
router.post('/billpay', (req, res) => {
    var date = new Date();
    var bill = {
        name: req.session.user.Name,
        email: req.session.user.Email,
        address: req.body.add,
        phone: req.body.sdt,
        sum: req.body.sum,
        mkdate: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
    }
    var arr_p = [];
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        var p = adminrepo.single(cartItem.Masp);
        arr_p.push(p);
    }
    var items = [];
    cartrepo.addbill(bill).then(row => {
        cartrepo.getbillid(bill.email).then(rowid => {
            var billid = rowid[0].ID;
            console.log(billid);
            Promise.all(arr_p).then(result => {
                for (var i = result.length - 1; i >= 0; i--) {
                    var pro = result[i][0];
                    var ctdh = {
                        madh: billid,
                        masp: req.session.cart[i].Masp,
                        soluong: req.session.cart[i].Quantity,
                        gia: pro.Gia,
                        tong: pro.Gia * req.session.cart[i].Quantity
                    }
                    console.log(ctdh);
                    cartrepo.addbilldetail(ctdh);
                }
            });

        });

    });
    res.redirect('/');
});


module.exports = router;