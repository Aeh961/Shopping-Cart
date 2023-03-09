const orderDB = require('../orderDB.js');
const Order = orderDB.getModel();

const itemsDB = require('../itemsDB.js');
const Item = itemsDB.getModel();



module.exports = async (req, res, next) => {
    // Extract the customerId, itemId, and newQuantity from the request
    const customerId = req.params.customerId;
    const itemId = req.params.itemId;
    const newQuantity = req.body.quantity;

    try {
        // Find the order for the customer
        const order = await Order.findOne({ customerId: customerId })
        if (!order) {
            // If no order is found, send a 404 Not Found response
            res.sendStatus(404)
            return
        }

        // Find the order item for the specified itemId
        const orderItem = await order.items.find((item) => item.itemId.toString() === itemId)

        // Calculate the difference between the new quantity and the old quantity
        const quantityChange = newQuantity - orderItem.quantity

        // Find the stock item for the specified itemId
        const stockItem = await Item.findById(itemId)
        if (stockItem.quantity < quantityChange) {
            // If there is not enough stock, send a 400 Bad Request response
            res.status(400).send('Not Enough In Stock')
            return
        }

        // Update the order item with the new quantity
        orderItem.quantity = newQuantity

        // Update the stock item quantity by subtracting the quantityChange
        stockItem.quantity -= quantityChange

        // Save the changes to the order and stock items
        await order.save()
        await stockItem.save()

        // Redirect to the customer's order page
        res.redirect(`/customer/${customerId}/order`)
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send(err.message);
    }
}