const itemsDB = require('../itemsDB.js');
const item = itemsDB.getModel();

 
module.exports = async (req, res, next) => {
    const newItem = new item({
      imageUrl : req.body.imageUrl,
      itemName : req.body.itemName,
      description : req.body.description,
      price : req.body.price,
      quantity :req.body.quantity,
  });
  
  
    newItem.save(function (err){
      if(err)
        console.log("Error: %s",err);
      res.redirect('/items');
  });
};