// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var itemSchema = new Schema({
  item_code: { type: String, required: true, unique: true},
  item_name: { type: String, required: true},
  category: { type: String, required: true},
  cost_price: { type: Number, required: true},
  selling_price: Number,
  qty: { type: Number, required: true}
});

itemSchema.index({item_code: 1}, {unique: true});

// we need to create a model using it
var Item = mongoose.model('Item', itemSchema);

// make this available to our users in our Node applications
module.exports = Item;