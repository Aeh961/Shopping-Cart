const orderDB = require('../orderDB.js');
const Order = orderDB.getModel();

const itemsDB = require('../itemsDB.js');
const Item = itemsDB.getModel();
const customerDB = require('../customerDB.js');
const customer = customerDB.getModel();


module.exports = async (req, res, next) => {
  const customerId = req.params.customerId;

  try {
    let customerInfo = await customer.findOne({ _id: customerId });
    const order = await Order.findOne({ customerId });
    let fullName = `${customerInfo.firstName} ${customerInfo.lastName} `;

    // Send an error if the order is not found
    if (!order) {
      let message = `Customer Did not start a order`;
      return res.status(400).send(message);
    }

    // Retrieve the items in the order from the database
    const items = await Item.find({ _id: { $in: order.items.map(item => item.itemId) } });

    // Map the items in the order to the data needed for rendering the view
    const orderItems = order.items.map(item => {
      const itemData = items.find(i => i._id.toString() === item.itemId.toString());
      if (!itemData) {
        let message = `Item not found`;
        return res.status(400).send(message);
      }
      return {
        itemId: item.itemId,
        itemName: itemData.itemName,
        imageUrl: itemData.imageUrl,
        description: itemData.description,
        price: itemData.price,
        quantity: item.quantity,
        name: fullName,
        customerId: customerId
      };
    });

    // Calculate the total price of the order
    const total = orderItems.reduce((orderPrice, item) => orderPrice + item.price * item.quantity, 0);

    // Render the view with the order information
    res.render('customerOrders', {
      orderItems: orderItems,
      total: total,
      customerId: customerId,
      name: fullName,
    });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).send(err.message);
  }
};