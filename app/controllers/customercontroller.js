var express = require('express'),
    adminrepo = require('../repos/adminrepo');

var router = express.Router();

router.get('/', (req, res) => {
    var p1 = adminrepo.loadallcategories();
    var p2 = adminrepo.loadalltype();
    var p3 = adminrepo.loadallproducer();
    var p4 = adminrepo.loadtotal();

    Promise.all([p1, p2, p3, p4]).then(([rows, row2, row3, row4]) => {

        var vm = {
            categories: rows,
            type: row2,
            producer: row3,
            total: row4
        };
        res.render('admin/dashboard', vm);
    });
});

router.post('/', (req, res) => {


    if (req.body.flag === "1") {
        var id = req.body.CatID;
        adminrepo.deletecategory(id).then(value => {
            adminrepo.loadallcategories().then(rows => {
                var vm = {
                    categories: rows
                };
                res.render('admin/dashboard', vm);
            });
        });;
    } else {
        if (req.body.flag === "2") {
            var ecategory = {
                id: req.body.id,
                name: req.body.name,
                type: req.body.type,
                producer: req.body.producer,
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
                adminrepo.editcategorytype(ecategory.type, ecategory.id).then(value => {
                    adminrepo.loadallcategories().then(rows => {
                        var p1 = adminrepo.loadallcategories();
                        var p2 = adminrepo.loadalltype();
                    
                        Promise.all([p1, p2]).then(([rows, row2]) => {
                    
                            var vm = {
                                categories: rows,
                                type: row2
                            };
                            res.render('admin/dashboard', vm);
                        });
                    });
                });
            }

        } else {
            var acategory = {
                id: req.body.id,
                name: req.body.name,
                type: req.body.type,
                producer: req.body.producer,
                price: req.body.price,
                view: 0,
                by: 0,
                detail: req.body.detail,
                image: req.body.image
            };
            adminrepo.add(acategory).then(value => {
                adminrepo.loadallcategories().then(rows => {
                    var vm = {
                        categories: rows
                    };
                    res.render('admin/dashboard', vm);
                });
            });
        }

    }
});





module.exports = router;