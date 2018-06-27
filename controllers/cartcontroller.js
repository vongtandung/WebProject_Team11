var express = require('express'),
    cartrepo = require('../repos/cartrepo'),
    productrepo = require('../repos/productrepo');

var router = express.Router();
router.get('/mycart', (req, res) => {
    var arr_p = [];
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        var p = productrepo.single(cartItem.Masp);
        arr_p.push(p);
    }

    var items = [];
    Promise.all(arr_p).then(result => {
        for (var i = result.length - 1; i >= 0; i--) {
            var pro = result[i][0];
            var item = {
                Product: pro,
                Quantity: req.session.cart[i].Quantity,
                Amount: pro.Price * req.session.cart[i].Quantity
            };
            items.push(item);
        }

        var vm = {
            items: items
        };
        res.render('cart/cartindex', vm);
    });
});

module.exports = router;