const customerDB = require('../customerDB.js');
const customer = customerDB.getModel()


module.exports = async (req, res, next) => {
        res.render('homePageView',
                { title: "WELCOME TO THE STORE", });

};

