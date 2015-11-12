var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var salesOrderSchema = new Schema({
  bill_no: { type: String, unique: true },
  bill_date: Date,
  order_items: [{ 
  					item_name : String,
  					qty: Number,
  					selling_price: Number,
  				}],
  customer: {
  					member_id : String,
            name : String
  				},
  net_amount_payable: Number,
  discount_amount : Number
});

salesOrderSchema.index({bill_no: 1}, {unique: true});

// we need to create a model using it
var SalesOrder = mongoose.model('SalesOrder', salesOrderSchema);

// make this available to our users in our Node applications
module.exports = SalesOrder;