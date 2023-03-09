const itemsDB = require('../itemsDB.js');
const items = itemsDB.getModel();


module.exports = async (req , res , next) => {
        // Map the items to an array of objects containing relevant information
        let item = await items.find({});

        let results = item.map( it => {
            return {
                id: it._id,
                imageUrl: it.imageUrl,
                itemName: it.itemName,
                description: it.description,
                price: it.price,
                quantity: it.quantity
            }
        });
            
        res.render('displayItemsView',
                {title:"List of items", data:results});
        
};