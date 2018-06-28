var express = require('express');
var homerepo = require('../repos/homerepo');
var config = require('../config/config');
var router = express.Router();

router.get('/', (req, res) => {
    var name = req.query.nameS;
    var cate = req.query.categS;
    var p1 = homerepo.searchproallcate(name,offset);
    var p2 = homerepo.searchpro(name, cate,offset);
    var p3 = homerepo.searchproother(cate,offset);
    Promise.all([p1, p2, p3]).then(([rows1, rows2, rows3]) => {
        if (name.length !== 0 && name !== 'Search') {
            var vm = {};
            if (cate === 'All categories') {
                vm = {
                    products: rows1,
                    nopro: rows1.length === 0
                }
                res.render('home/searchpro', vm)
            } else {
                homerepo.searchpro(name, cate).then(rows => {
                    vm = {
                        nopro: rows2.length === 0,
                        products: rows2
                    }
                    res.render('home/searchpro', vm)
                });
            }
        } else {
            vm = {
                nopro: rows3.length === 0,
                products: rows3
            }
            res.render('home/searchpro', vm)
        }
        
    });

});


module.exports = router;

