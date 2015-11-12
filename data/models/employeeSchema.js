// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var employeeSchema = new Schema({
  emp_id: { type: String, required: true, unique: true },
  emp_name: { type: String, required: true},
  username: { type: String, required: true},
  password: { type: String, required: true},
  dob: {type: Date, required: true},
  phone_no: String,
  designation: { type: String, required: true}
});

/*employeeSchema.methods.findAge = function() {
	return 
} */
employeeSchema.index({emp_id: 1}, {unique: true});
// we need to create a model using it
var Employee = mongoose.model('Employee', employeeSchema);

// make this available to our users in our Node applications
module.exports = Employee;