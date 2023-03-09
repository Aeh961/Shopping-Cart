const itemsDB = require('../itemsDB.js');
const Item = itemsDB.getModel();


module.exports = async (req, res, next) => {
    try {
        const min = +req.params.min
        const max = +req.params.max
        const items = await Item.find({ price: { $gte: min, $lte: max } })
        const format = req.query.format || 'json'

        if (format === 'xml') {
            let xmlStr = '<?xml version="1.0"?>\n<items>\n';
            items.forEach(item => {
                xmlStr += `<item>\n<id>${item._id}</id><Name>${item.itemName}</Name><Price>$${item.price}</Price>\n</item>\n`;
            });
            xmlStr += '</items>\n';
            res.type('application/xml').send(xmlStr);
        }
        if (format === 'json') {
            if(items) {
                res.json(items);
            } else {
                res.status(404).json({ error: "items not found" });
            }
    }

    

    } catch (err) {
        console.log('Error:', err);
        res.status(500).send(err.message);
    }


}