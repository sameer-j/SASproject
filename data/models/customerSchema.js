// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var customerSchema = new Schema({
  member_id: { type: String, required: true, unique: true },
  name: { type: String, required: true},
  address: { street : String, city : String, country : String },    //composite attribute
  dob: {type: Date, required: true},
  phone_no: String
});

customerSchema.index({member_id: 1}, {unique: true});

// we need to create a model using it
var Customer = mongoose.model('Customer', customerSchema);

// make this available to our users in our Node applications
module.exports = Customer;