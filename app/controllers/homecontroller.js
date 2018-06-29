var express = require('express'),
    homerepo = require('../repos/homerepo');

var router = express.Router();

router.get('/', (req, res) => {
    var p1 = homerepo.loadcategorynew();
    var p2 = homerepo.loadcategoryby();
    var p3 = homerepo.loadcategoryview();
    Promise.all([p1, p2, p3]).then(([Row1, Row2, Row3]) => {
        var vm = {
            new: Row1,
            buy: Row2,
            view: Row3
        }
        res.render('home/index', vm);
    });
});
router.get('/product/:fors', (req, res) => {
    var fors = req.params.fors;
    var p1 = homerepo.loadallproducer();
    var p3 = homerepo.countallcategoriesby(fors);
    var p4 = homerepo.loadalltype();
    var page = req.query.page;
    var sort=req.body.sort;
    if (!page) page = 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;
    var p2 = homerepo.loadallcategoriesby(fors, offset);
    Promise.all([p1, p2, p3, p4]).then(([row, row2, row3, row4]) => {
        var totals = row3[0].countw;
        var nPages = totals / config.PRODUCTS_PER_PAGE;
        if (totals % config.PRODUCTS_PER_PAGE > 0)
            nPages++;
        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurrentPage: i === +page
            });
        }
        var vm = {
            produ: row,
            catefor: row2,
            catetitle: row2[0],
            page_numbers: numbers,
            numpage: parseInt(nPages),
            protype: row4
        }
        res.render('home/productview', vm);
    })

});

router.get('/product/:fors', (req, res) => {
    var fors = req.params.fors;
    var p1 = homerepo.loadallproducer();
    var p3 = homerepo.countallcategoriesby(fors);
    var p4 = homerepo.loadalltype();
    var page = req.query.page;
    var sort=req.body.sort;
    if (!page) page = 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;
    var p2 = homerepo.loadallcategoriesbysort1(fors, offset);
    Promise.all([p1, p2, p3, p4]).then(([row, row2, row3, row4]) => {
        var totals = row3[0].countw;
        var nPages = totals / config.PRODUCTS_PER_PAGE;
        if (totals % config.PRODUCTS_PER_PAGE > 0)
            nPages++;
        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurrentPage: i === +page
            });
        }
        var vm = {
            produ: row,
            catefor: row2,
            catetitle: row2[0],
            page_numbers: numbers,
            numpage: parseInt(nPages),
            protype: row4
        }
        res.render('home/productview', vm);
    })

});
router.post('/product/:fors', (req, res) => {
    var fors = req.params.fors;
    var p1 = homerepo.loadallproducer();
    var p3 = homerepo.countallcategoriesby(fors);
    var p4 = homerepo.loadalltype();
    var page = req.query.page;
    var sort1=req.body.giaduoi;
    var sort2=req.body.giatren;
    if (!page) page = 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;
    var p2 = homerepo.loadallcategoriesbysort1(fors, offset,sort1,sort2);
    Promise.all([p1, p2, p3, p4]).then(([row, row2, row3, row4]) => {
        console.log(row2)
        var totals = row3[0].countw;
        var nPages = totals / config.PRODUCTS_PER_PAGE;
        if (totals % config.PRODUCTS_PER_PAGE > 0)
            nPages++;
        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurrentPage: i === +page
            });
        }
        var vm = {
            produ: row,
            catefor: row2,
            catetitle: row2[0],
            page_numbers: numbers,
            numpage: parseInt(nPages),
            protype: row4
        }
        res.render('home/productview', vm);
    })

});

router.get('/detail/:proid', (req, res) => {
    var proID = req.params.proid;
    homerepo.loadcategorybyid(proID).then(row => {
        if (row.length>0) {
            var p1 = homerepo.loadcategorybyid(proID);
            var p2 = homerepo.loadcategoryproducer(row[0].Nhasx,row[0].Masp);
            var p3 = homerepo.loadcategorytype(row[0].Loai,row[0].Masp);
            Promise.all([p1, p2, p3]).then(([r1, r2, r3]) => {
                var vm = {
                    catebyid: r1[0],
                    producer: r2,
                    typein: r3
                }
                homerepo.updateview(proID);
                res.render('home/prodetail', vm);
            })
        } else {
            res.render('eror/index');
        }

    });



});
module.exports = router;