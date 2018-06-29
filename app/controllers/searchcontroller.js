var express = require('express');
var homerepo = require('../repos/homerepo');
var config = require('../config/config');
var router = express.Router();

router.get('/', (req, res) => {
    var name = req.query.nameS;
    var cate = req.query.categS;
    var p1 = homerepo.searchproallcate(name);
    var p2 = homerepo.searchpro(name, cate);
    var p3 = homerepo.searchproother(cate);
    var p4 = homerepo.loadallproducer();
    var p5 = homerepo.loadalltype();
    Promise.all([p1, p2, p3,p4,p5]).then(([rows1, rows2, rows3,row4,row5]) => {
        if (name.length !== 0 && name !== 'Search') {
            var vm = {};
            if (cate === 'All') {
                vm = {
                    catefor: rows1,
                    produ: row4,
                    protype: row5,
                    nopro: rows1.length === 0
                }
                res.render('home/productview', vm)
            } else {
                homerepo.searchpro(name, cate).then(rows => {
                    vm = {
                        nopro: rows2.length === 0,
                        produ: row4,
                        protype: row5,
                        catefor: rows2
                    }
                    res.render('home/productview', vm)
                });
            }
        } else {
            vm = {
                nopro: rows3.length === 0,
                produ: row4,
                protype: row5,
                catefor: rows3
            }
            res.render('home/productview', vm)
        }
        
    });

});


module.exports = router;

