const itemsDB = require('../itemsDB.js');
const items = itemsDB.getModel();

module.exports = async (req , res , next) => {
    let id = req.params.id
    
    items.findById(id, function (err,item){
        if(err)
        console.log("Error Selecting:%s", err);
    
        if(!item)
            return res.render('404');
    
            
        res.render('editItemView', {
            title: "Edit Item",
            data: {

                  id: item._id,
                  itemImage :item.itemImage,
                  itemName: item.itemName,
                  description: item.description,
                  price: item.price,
                  quantity :item.quantity,
                }
              });
    });
    
};


