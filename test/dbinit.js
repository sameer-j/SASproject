var mongoose = require('mongoose');
var Item = require('./data/models/itemSchema');
var Employee = require('./data/models/employeeSchema');
// var SalesOrder = require('./data/modelssalesOrderSchema');
var Customer = require('./data/models/customerSchema');
var Discount = require('./data/models/discountSchema');

var db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1/SAS');

db.once('open', function() {
  console.log("Connected!");

//flushing all tables and then insert
Item.remove({}, function(err) { 
 console.log('item collection removed');
 insertItem(); 
});

Employee.remove({}, function(err) { 
 console.log('employee collection removed') ;
 insertEmployee();
});

Customer.remove({}, function(err) { 
 console.log('customer collection removed') ;
 insertCustomer();
});

Discount.remove({}, function(err) { 
 console.log('discount collection removed') ;
 insertDiscount();
});

// Items test data
function insertItem(){
  var item1 = new Item({ 
    item_code: 'code1',
    item_name: 'item1',
    category: 'category1',
    cost_price: 10,
    selling_price: 12,
    qty: 2
  });

  item1.save(function(err) {
    if (err) throw err;

    console.log('item inserted successfully!');
  });

  var item2 = new Item({ 
    item_code: 'code2',
    item_name: 'item2',
    category: 'category2',
    cost_price: 20,
    selling_price: 22,
    qty: 2
  });

  item2.save(function(err) {
    if (err) throw err;

    console.log('item inserted successfully!');
  });

  var item3 = new Item({ 
    item_code: 'code3',
    item_name: 'item3',
    category: 'category2',
    cost_price: 30,
    selling_price: 42,
    qty: 4
  });

  item3.save(function(err) {
    if (err) throw err;

    console.log('item inserted successfully!');
  });
}

// discount test data
function insertDiscount(){
  var discount1 = new Discount({ 
    lower_limit: 500,
    upper_limit: 1000,
    to_date: new Date(2015,11,5),
    from_date: new Date(2015,11,5),
    percent: 5
  });

  discount1.save(function(err) {
    if (err) throw err;

    console.log('discount inserted successfully!');
  });

  var discount2 = new Discount({ 
    lower_limit: 1001,
    upper_limit: 1500,
    to_date: new Date(2015,11,5),
    from_date: new Date(2015,11,5),
    percent: 10
  });

  discount2.save(function(err) {
    if (err) throw err;

    console.log('discount inserted successfully!');
  });

  var discount3 = new Discount({ 
    lower_limit: 1501,
    upper_limit: 99999999,
    to_date: new Date(2015,11,5),
    from_date: new Date(2015,11,5),
    percent: 20
  });

  discount3.save(function(err) {
    if (err) throw err;

    console.log('discount inserted successfully!');
  });

}

//Customer test data
function insertCustomer(){
  var customer1 = new Customer({ 
    member_id: 'c101',
    name: 'customer1',
    address: {
      street : 'street1',
      city : 'city1',
      country : 'country1', 
      pincode : '4023123'
          },    //composite attribute
          dob: Date.now(),
          phone_no: '671236123'
        });

  customer1.save(function(err) {
    if (err) throw err;
    console.log('customer inserted successfully!');
  });

  var customer2 = new Customer({ 
    member_id: 'c102',
    name: 'customer2',
    address: {
      street : 'street2',
      city : 'city2',
      country : 'country2', 
      pincode : '4023123'
          },    //composite attribute
          dob: Date.now(),
          phone_no: '671236123'
        });

  customer2.save(function(err) {
    if (err) throw err;
    console.log('customer inserted successfully!');
  });

  var customer3 = new Customer({ 
    member_id: 'c103',
    name: 'customer3',
    address: {
      street : 'street3',
      city : 'city3',
      country : 'country3', 
      pincode : '4023123'
          },    //composite attribute
          dob: Date.now(),
          phone_no: '671236123'
        });

  customer3.save(function(err) {
    if (err) throw err;
    console.log('customer inserted successfully!');
  });
}


//Employee test data
function insertEmployee(){
  var employee1 = new Employee({ 
    emp_id: 'emp1',
    emp_name: 'employee1',
    username: 'emp1',
    password: 'password',
    dob: Date.now(),
    phone_no: '213123',
    designation: 'manager'
  });

  employee1.save(function(err) {
    if (err) throw err;
    console.log('employee inserted successfully!');
  });

  var employee2 = new Employee({ 
    emp_id: 'emp2',
    emp_name: 'employee2',
    username: 'emp2',
    password: 'password',
    dob: Date.now(),
    phone_no: '213123',
    designation: 'manager'
  });

  employee2.save(function(err) {
    if (err) throw err;
    console.log('employee inserted successfully!');
  });

  var employee3 = new Employee({ 
    emp_id: 'emp3',
    emp_name: 'employee3',
    username: 'emp3',
    password: 'password',
    dob: Date.now(),
    phone_no: '213123',
    designation: 'manager'
  });

  employee3.save(function(err) {
    if (err) throw err;
    console.log('employee inserted successfully!');
  });
}
});