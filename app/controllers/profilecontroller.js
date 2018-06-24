var express = require('express'),
    profilerepo = require('../repos/profilerepo');

var router = express.Router();

router.get('/', (req, res) => {
    var p1 = profilerepo.loadallcategories();

    Promise.all([p1]).then(([rows]) => {

        var vm = {
            categories: rows
        };
        res.render('admin/dashboard', vm);
    });
});

router.post('/', (req, res) => {


    if (req.body.flag === "1") {
        var id = req.body.CatID;
        profilerepo.deletecategory(id).then(value => {
            profilerepo.loadallcategories().then(rows => {
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
                email: req.body.email,
                phone: req.body.phone,
                dob: req.body.dob,
                address: req.body.address,
                gender: req.body.gender
            };
            if (ecategory.name !== '') {
                profilerepo.editcategoryname(ecategory.name, ecategory.id);
            }
            if (ecategory.email !== '') {
                profilerepo.editcategoryemail(ecategory.email, ecategory.id);
            }
            if (ecategory.phone !== '') {
                profilerepo.editcategoryphone(ecategory.phone, ecategory.id);
            }
            if (ecategory.dob !== '') {
                profilerepo.editcategorydob(ecategory.dob, ecategory.id);
            }
            if (ecategory.address !== '') {
                profilerepo.editcategoryaddress(ecategory.address, ecategory.id);
            }
            if (ecategory.gender !== '') {
                profilerepo.editcategorygender(ecategory.gender, ecategory.id).then(value => {
                    profilerepo.loadallcategories().then(rows => {
                        var p1 = profilerepo.loadallcategories();
                        var p2 = profilerepo.loadalltype();
                    
                        Promise.all([p1]).then(([rows]) => {
                    
                            var vm = {
                                categories: rows
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
                email: req.body.email,
                phone: req.body.phone,
                dob: req.body.dob,
                address: req.body.address,
                gender: req.body.gender,
                view : 0,
                by : 0
            };
            profilerepo.add(acategory).then(value => {
                profilerepo.loadallcategories().then(rows => {
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