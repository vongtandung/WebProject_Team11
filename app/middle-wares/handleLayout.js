var adminrepo = require('../repos/adminrepo');

module.exports = (req, res, next) => {

    if (req.session.isLogged === undefined) {
        req.session.isLogged = false;
    }
 
    adminrepo.loadallcategories().then(rows => {
        res.locals.layoutVM = {
            isLogged: req.session.isLogged
        }
        console.log("ms");
        next();
    });
}
