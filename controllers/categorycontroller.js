var express = require('express'),
    categoryrepo = require('../repos/categoryrepo');
   

var router = express.Router();
router.get('/', (req, res) => {
    categoryrepo.loadAll().then(rows => {
        var vm = {
            categories: rows
        }
    });
     res.render('category/dashboard', vm);
});


module.exports = router;