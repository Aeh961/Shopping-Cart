const customerDB = require('../customerDB.js');
const customer = customerDB.getModel()


module.exports = async (req , res , next) => {
  // get all customers from the database
  let Customer = await customer.find({});

  // Map the customer data to an array of objects containing only the id, first name, and last name properties
  let results = Customer.map( cus => {
    return {
      id: cus._id,
      firstName: cus.firstName,
      lastName: cus.lastName
    }
  });

  // Render the adminCustomerView page and pass in the customer data as an object
  res.render('adminCustomerView', { title: "Admin Customer List", data: results, baseUrl: req.baseUrl });
};