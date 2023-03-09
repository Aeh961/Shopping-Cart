const customerDB = require('../customerDB.js');
const customer = customerDB.getModel();

 
module.exports = async (req, res, next) => {
    const newCustomer = new customer({

      firstName : req.body.firstName,
      lastName :req.body.lastName,

  });
  
  
    newCustomer.save(function (err){
      if(err)
        console.log("Error: %s",err);
      res.redirect('/customerView');
  });
};