const itemsDB = require('../itemsDB.js');
const items = itemsDB.getModel();

module.exports = async (req , res , next) => {
    let id = req.params.id
    // Use the findById method to find item with given ID
    items.findById(id, function (err,item){
        if(err)
        console.log("Error Selecting:%s", err);
        // If no item is found with the given ID, render a 404 page
        if(!item)
            return res.render('404');

          // If an item is found with the given ID, render the deleteItemView with its details    
        res.render('deleteItemView', {
            title: "Admin Delete Item",
            data: {
                id: item._id,
                itemName: item.itemName,
                description: item.description,
                price: item.price,
                quantity :item.quantity,
                }
              });


    });
    
};