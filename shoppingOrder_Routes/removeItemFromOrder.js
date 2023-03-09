const orderDB = require('../orderDB.js');
const Order = orderDB.getModel();

const itemsDB = require('../itemsDB.js');
const Item = itemsDB.getModel();


module.exports = async (req, res, next) => {
    const customerId = req.params.customerId;
    const itemId = req.params.itemId;
    try{
        const order = await Order.findOne({customerId : customerId})
        if (!order){
            res.sendStatus(404)
            return
        }
        // Find the item in the order with the specified item ID
        const item = await order.items.find((item) => item.itemId.toString() === itemId )

        // Remove the item from the order's item list
        order.items = order.items.filter( (item) => item.itemId.toString() !== itemId )

        // Increase the item's quantity in the Item collection by the amount that was in the order
        await Item.updateOne({ itemId: itemId }, { $inc: { quantity: item.quantity }});

        // Save the updated order and redirect to the customer's order page
        await order.save()
        res.redirect(`/customer/${customerId}/order`)
    } catch (err) {
        // If an error occurs, log the error and send a 500 Internal Server Error status code with the error message
        console.log('Error:', err);
        res.status(500).send(err.message);
      }
    
}