var express = require('express'),
    productRepo = require('../repos/productRepo'),
    config = require('../config/config');

var router = express.Router();

// router.get('/byCat', (req, res) => {
//     var catId = req.query.catId;
//     productRepo.loadAllByCat(catId).then(rows => {
//         var vm = {
//             products: rows
//         };
//         res.render('product/byCat', vm);
//     });
// });

// router.get('/byCat/:catId', (req, res) => {
//     var catId = req.params.catId;
//     productRepo.loadAllByCat(catId).then(rows => {
//         var vm = {
//             products: rows,
//             noProducts: rows.length === 0
//         };
//         res.render('product/byCat', vm);
//     });
// });

router.get('/byCat/:catId', (req, res) => {
    var catId = req.params.catId;

    var page = req.query.page;
    if (!page) page = 1;
    if (page < 1) page = 1;

    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

    var p1 = productRepo.loadPageByCat(catId, offset);
    var p2 = productRepo.countByCat(catId);
    Promise.all([p1, p2]).then(([rows, count_rows]) => {
        var total = count_rows[0].total;
        var nPages = total / config.PRODUCTS_PER_PAGE;
        if (total % config.PRODUCTS_PER_PAGE > 0)
            nPages++;

        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurrentPage: i === +page
            });
        }

        var vm = {
            products: rows,
            noProducts: rows.length === 0,
            page_numbers: numbers
        };
        res.render('product/byCat', vm);
    });

    // productRepo.loadPageByCat(catId, offset).then(rows => {
    //     productRepo.countByCat(catId).then(count_rows => {
    //         var total = count_rows[0].total;
    //         var nPages = total / config.PRODUCTS_PER_PAGE;
    //         if (total % config.PRODUCTS_PER_PAGE > 0)
    //             nPages++;

    //         var numbers = [];
    //         for (i = 1; i <= nPages; i++) {
    //             numbers.push({
    //                 value: i,
    //                 isCurrentPage: i === +page
    //             });
    //         }

    //         var vm = {
    //             products: rows,
    //             noProducts: rows.length === 0,
    //             page_numbers: numbers
    //         };
    //         res.render('product/byCat', vm);
    //     });
    // });
});

router.get('/detail/:proId', (req, res) => {
    var proId = req.params.proId;
    productRepo.single(proId).then(rows => {
        if (rows.length > 0) {
            var vm = {
                product: rows[0]
            };
            res.render('product/detail', vm);
        } else {
            res.end('NO PRODUCT');
        }
    });
});

module.exports = router;