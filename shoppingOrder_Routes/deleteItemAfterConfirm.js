const itemsDB = require('../itemsDB.js');
const items = itemsDB.getModel();

module.exports =  async (req , res , next) => {
    
  let id = req.body.id;

  items.findById(id, function(err, item){
      if(err)
          console.log("error selecting:%s", err);
      if (!item) {
          return res.render("404");
      }

      item.remove(function(err){
      if(err)
              console.log("error deleting: %s",err);
      res.redirect("/items");

            });
        });
    };


    