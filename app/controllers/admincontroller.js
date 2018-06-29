var express = require('express'),
    adminrepo = require('../repos/adminrepo');
config = require('../config/config');
var router = express.Router();

router.get('/', (req, res) => {
    var p2 = adminrepo.loadalltype();
    var p3 = adminrepo.loadallproducer();
    var p6 = adminrepo.loadallbill();
    var p4 = adminrepo.loadtotal();
    var p5 = adminrepo.loadforproducer();
    var p7 = adminrepo.countcate();
    var page = req.query.page;
    if (!page) page = 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;
    var p1 = adminrepo.loadpage(offset);
    Promise.all([p1, p2, p3, p4, p5, p6, p7]).then(([rows, row2, row3, row4, row5, row6, count_rows]) => {
        var totals = count_rows[0].total;
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
            categories: rows,
            type: row2,
            producer: row3,
            total: row4,
            totalproducer: row5,
            bill: row6,
            page_numbers: numbers,
            numpage: parseInt(nPages)
        };
        res.render('admin/dashboard', vm);
    });
});

router.post('/', (req, res) => {


    if (req.body.flag === "1") {
        var id = req.body.CatID;
        adminrepo.deletecategory(id).then(value => {
            var url = '/dashboard';
            res.redirect(url);
        });;
    } else {
        if (req.body.flag === "2") {
            var ecategory = {
                id: req.body.id,
                name: req.body.name,
                type: req.body.type,
                fors: req.body.fors,
                producer: req.body.producer,
                ori: req.body.ori,
                price: req.body.price,
                detail: req.body.detail,
                image: req.body.image
            };
            if (ecategory.name !== '') {
                adminrepo.editcategoryname(ecategory.name, ecategory.id);
            }
            if (ecategory.producer !== '') {
                adminrepo.editcategoryproducer(ecategory.producer, ecategory.id);
            }
            if (ecategory.price !== '') {
                adminrepo.editcategoryprice(ecategory.price, ecategory.id);
            }
            if (ecategory.detail !== '') {
                adminrepo.editcategorydetail(ecategory.detail, ecategory.id);
            }
            if (ecategory.image !== '') {
                adminrepo.editcategoryimage(ecategory.image, ecategory.id);
            }
            if (ecategory.type !== '') {
                adminrepo.editcategorytype(ecategory.type, ecategory.id);
            }
            if (ecategory.ori !== '') {
                adminrepo.editcategoryorigin(ecategory.ori, ecategory.id);
            }
            if (ecategory.fors !== '') {
                adminrepo.editcategoryfor(ecategory.fors, ecategory.id).then(value => {
                    var url = '/dashboard';
                    res.redirect(url);
                });
            }

        } else {
            if (req.body.flag === "3") {
                var danggiao = 1;
                dagiao = 0;
                if (req.body.billsts === "1") {
                    dagiao = 1;
                }
                if (req.body.billsts === "2") {
                    dagiao = 0;
                    danggiao = 0;
                }

                adminrepo.delistatus(danggiao, dagiao, req.body.billid).then(value => {
                    var url = '/dashboard';
                    res.redirect(url);

                });
            } else {
                var acategory = {
                    id: req.body.id,
                    name: req.body.name,
                    type: req.body.type,
                    fors: req.body.fors,
                    producer: req.body.producer,
                    ori: req.body.ori,
                    price: req.body.price,
                    view: 0,
                    by: 0,
                    detail: req.body.detail,
                    image: req.body.image
                };
                adminrepo.findcategory(acategory.id).then(rows => {
                    if (rows.length < 1) {
                        
                        adminrepo.add(acategory).then(value => {
                            var url = '/dashboard';
                            res.redirect(url);
                        });
                    }
                    else{
                        var url = '/dashboard';
                            res.redirect(url);

                    }
                });
            }
        }

    }
});

router.get('/billdetail/:Madh', (req, res) => {
    var Ma = req.params.Madh;
    var p1 = adminrepo.customerinfomation(Ma);
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

module.exports = router;