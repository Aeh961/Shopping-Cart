const customerDB = require('../customerDB.js');
const customer = customerDB.getModel();


module.exports = async (req, res, next) => {

  const newCustomer = new customer({

    //Assigning the value of the firstName and lastName property from the request body to the new customer instance
    firstName: req.body.firstName, 
    lastName: req.body.lastName,

  });
  //Saving the new customer instance to the database
  newCustomer.save(function (err) { 
    if (err) 
      console.log("Error: %s", err); 
    res.redirect('/adminCustomerView');
  });
};