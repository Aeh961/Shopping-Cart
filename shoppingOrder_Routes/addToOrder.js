const orderDB = require('../orderDB.js');
let Order = orderDB.getModel(); 

const itemsDB = require('../itemsDB.js');
const items1 = itemsDB.getModel();

module.exports = async (req, res, next) => {
  const customerId = req.params.customerId;
  const itemId = req.body.itemId;
  const quantityOrdered = parseInt(req.body.quantity);

  try {
    // Find the order for the current customer
    let order = await Order.findOne({ customerId });

    // Find the item with the specified ID in the Item collection
    const item = await items1.findById(itemId); 

    // If the item doesn't exist, throw an error
    if (!item){
      let message = `Item not found`;
      return res.status(400).send(message);
    }

    // If the quantity ordered is not a positive number, throw an error
    if (quantityOrdered <= 0) {
      let message = `Ordered Quantity must be greater than 0`;
      return res.status(400).send(message);
    }

    // If there is not enough quantity of the item in stock, throw an error
    if (item.quantity < quantityOrdered) {
      let message = `Sorry, there are only ${item.quantity} units of ${item.itemName} available. Please reduce the quantity ordered or choose a different item.`;
      return res.status(400).send(message);
    }

    // If there is no existing order for the customer, create a new order
    if (!order) {
      order = new Order({
        customerId,
      });
    }

    // Find the index of the item in the order's item list
    const itemIndex = order.items.findIndex(item => item.itemId.toString() === itemId);

    // If the item is already in the order, increase its quantity using the item index
    if (itemIndex !== -1) {
      order.items[itemIndex].quantity += quantityOrdered;
    } else {
      // Otherwise, add the item to the order's item list
      order.items.push({
        itemId,
        itemName: item.itemName,
        imageUrl: item.imageUrl,
        price: item.price,
        quantity: quantityOrdered
      });
    }
    
    // Decrease the quantity of the item in the Item collection
    item.quantity -=quantityOrdered;
    await item.save();

    // Save the updated order
    await order.save();

    // Redirect to the customer's items page
    res.redirect('/customer/' + customerId + '/items');
  } catch (err) {
    // If an error occurs, log the error and send a 500 Internal Server Error status code with the error message
    console.log('Error:', err);
    res.status(500).send(err.message);
  }
};