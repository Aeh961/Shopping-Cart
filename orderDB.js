const mongoose = require('mongoose');
const credentials = require('./credentials.js');



const dbUrl = 'mongodb+srv://' + credentials.username +
  ':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  items: [{
    itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
    itemName: String,
    imageUrl: String,
    price: Number,
    quantity: {
      type: Number,
      min: 1, // ensure quantity is positive
      validate: {
        validator: Number.isInteger, // ensure quantity is an integer
        message: '{VALUE} is not an integer'
      }
    }
  }]
}, {
  collection: 'orders'
});

module.exports = {
  getModel: () => {
    if (connection == null) {
      console.log('Creating connection and model...');
      connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
      model = connection.model('orderModel', orderSchema);
    }
    return model;
  }


};