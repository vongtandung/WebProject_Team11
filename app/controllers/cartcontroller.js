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
        Quantity: +req.body.quantity
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
    var itemsquanti = [];
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        adminrepo.single(cartItem.Masp).then(p => {
            arr_p.push(p);

        });

    }
    for (var i = 0; i < req.session.cart.length; i++) {
        var quan = req.session.cart[i].Quantity;
        itemsquanti.push(quan);
    }

    cartrepo.addbill(bill).then(row => {
        cartrepo.getbillid(bill.email).then(rowid => {
            var billid = rowid[0].ID;
            Promise.all([arr_p, itemsquanti]).then(([result, qui]) => {
                for (var i = result.length - 1; i >= 0; i--) {
                    var pro = result[i][0];
                    console.log(result.length);
                    var ctdh = {
                        madh: billid,
                        masp: pro.Masp,
                        soluong: qui[i],
                        gia: pro.Gia,
                        tong: pro.Gia * qui[i]
                    }
                    cartrepo.addbilldetail(ctdh);
                    cartrepo.updateby(ctdh.masp,ctdh.soluong);
                    cartrepo.updateslt(ctdh.masp,ctdh.soluong);
                }
            });

        });

    });
    cartrepo.removeall(req.session.cart);
    res.redirect('/');
});
router.post('/addcate', (req, res) => {
    var id=req.body.proId;
    var quan=+req.body.quantity;
    cartrepo.getquantity(id).then(row=>{
        var qu=row[0].slt;
        var quanity=qu+quan
        console.log(qu);
        console.log(id);
        cartrepo.addcate(id,quanity);
        res.redirect(req.headers.referer);
    });

});


module.exports = router;