// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var discountSchema = new Schema({
  lower_limit: Number,
  upper_limit: Number,
  to_date: Date,
  from_date: Date,
  percent: Number
});

discountSchema.index({lower_limit: 1, upper_limit: 1}, {unique: true});
// we need to create a model using it
var Discount = mongoose.model('Discount', discountSchema);

// make this available to our users in our Node applications
module.exports = Discount;