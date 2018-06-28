var express = require('express'),
    historyrepo = require('../repos/historyrepo');
config = require('../config/config');
var router = express.Router();

router.get('/', (req,res)=>{
    res.render('account/history');

});
router.get('/billdetail/:Email', (req, res) => {
    var Em = req.params.Email;
    var p1 = historyrepo.customerinfo(Em);
    var p2 = historyrepo.productinfo(Em);
    var p3 = historyrepo.sumbill(Em);
    var p4 = historyrepo.countbill(Em);
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

module.exports = router;