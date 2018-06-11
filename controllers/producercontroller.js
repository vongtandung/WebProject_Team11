var express = require('express'),
    producerrepo = require('../repos/producerrepo');

    var router = express.Router();
    router.get('/', (req, res) => {
        producerrepo.loadAll().then(rows => {
            var vm = {
                producers: rows
            }
        });
         res.render('category/dashboard', vm);
    });


module.exports = router;