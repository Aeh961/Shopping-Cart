const itemsDB = require('../itemsDB.js');
const items = itemsDB.getModel();

module.exports = async (req , res , next) => {
    
    let id = req.body.id;


    items.findById(id, (err, item) => {
        if (err) {
            console.log("Error selecting: %s", err);
            return;
        }
        if (!item) {
            return res.render("404");
        }
        item.imageUrl = req.body.imageUrl,
        item.itemName =req.body.name,
        item.description= req.body.description,
        item.price = req.body.price,
        item.quantity = req.body.quantity,
    
        item.save((err) => {
            if (err) {
                console.log("Error updating: %s", err);
                return;
            }
        res.redirect("/items");
      });
    });
};
