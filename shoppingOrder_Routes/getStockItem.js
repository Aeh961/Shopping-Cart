const itemsDB = require('../itemsDB.js');
const Item = itemsDB.getModel();

module.exports = async (req, res, next) => {
    try {
        const itemName = req.params.itemName
        const items = await Item.find({itemName: itemName})
        res.json(items)

    } catch (err) {
        console.log('Error:', err);
        res.status(500).send(err.message);
    }


}