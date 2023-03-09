const customerDB = require('../customerDB.js');
const customer = customerDB.getModel()

module.exports = async (req , res , next) => {
  // Retrieve all customers 
  let Customer = await customer.find({});
  // Map the retrieved customers to an array of objects with only the necessary information
  let results = Customer.map( cus => {
    return {
      id: cus._id,
      firstName: cus.firstName,
      lastName: cus.lastName
    }
  });
  // Render the customerView with data and dynamic base url 
  res.render('customerView', { title: "Customer List", data: results, baseUrl: req.baseUrl });
};