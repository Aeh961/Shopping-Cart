const itemsDB = require('../itemsDB.js');
const items = itemsDB.getModel();
const customerDB = require('../customerDB.js');
const customer = customerDB.getModel();

module.exports = async (req, res, next) => {
    const customerId = req.params.customerId;
    let customerInfo = await customer.findOne({ _id: customerId });

    // Get the search query from the request query parameters
    let searchQuery = req.query.search;
    let searchedItem = {};
    // If there is a search query, set the filter to search for items matching the query
    if (searchQuery) {
        searchedItem = {
            $or: [
                { itemName: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } },
            ],
        };
    }


    // Find all items that match the filter
    let availableItems = await items.find(searchedItem);

    // Create an array of items to display
    let results = availableItems.map(it => {
        return {
            id: it._id,
            imageUrl: it.imageUrl,
            itemName: it.itemName,
            description: it.description,
            price: it.price,
            quantity: it.quantity,
            idCus: customerId,
        };
    });

    // Get the full name and ID of the customer to display on the page
    let fullName = `${customerInfo.firstName} ${customerInfo.lastName} `;
    let idCustomer = `${customerInfo._id}`;

    // Render the page with the list of items, customer name, and customer ID
    res.render('displayItemsCustomer', {
        title: 'Cedar Shopping items',
        name: fullName,
        data: results,
        idCus: idCustomer,
        search: searchQuery,
    });
};