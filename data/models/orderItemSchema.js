var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var orderItemSchema = new Schema({
  member_id: String,
  items : [
  		{
  			item_code: String,
  			item_name: String,
  			selling_price: Number,
		    qty: Number
  		}
  ]
});

orderItemSchema.index({member_id: 1}, {unique: true});

// we need to create a model using it
var OrderItem = mongoose.model('OrderItem', orderItemSchema);

// make this available to our users in our Node applications
module.exports = OrderItem;