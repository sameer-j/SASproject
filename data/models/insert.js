var mongoose = require('mongoose');
// if our itemSchema.js file is at /models/itemSchema.js
var Item = require('./itemSchema');
// var Employee = require('./employeeSchema');
// var SalesOrder = require('./salesOrderSchema');
// var Customer = require('./customerSchema');

var db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1/SAS');

db.once('open', function() {
  console.log("Connected!");
// create a new item
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

/*var customer1 = new Customer({ 
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
});*/


/*var salesOrder1 = new SalesOrder({ 
  bill_no: 'bill1',
  bill_date: Date.now(),
  order_items: [{ 
            item_name : 'item1',
            qty: 1,
            unit_price: 12.20,
          },
          { 
            item_name : 'item2',
            qty: 2,
            unit_price: 22.50,
          }
          ],
  employee_id: 'emp1',
  customer_id: 'c101',
  net_amount_payable: 150,
  discount_amount : 160
});

salesOrder1.save(function(err) {
  if (err) throw err;
  console.log('sales Order inserted successfully!');
});*/

/*var salesOrder2 = new SalesOrder({ 
  bill_no: 'bill2',
  bill_date: Date.now(),
  order_items: [{ 
            item_name : 'item1',
            qty: 1,
            unit_price: 12.20,
          },
          { 
            item_name : 'item2',
            qty: 2,
            unit_price: 22.50,
          }
          ],
  emp_id: '101',
  customer_id: 'c102',
  net_amount_payable: 150,
  discount_amount : 160
});

salesOrder2.save(function(err) {
  if (err) console.log("error");
  else console.log('sales Order inserted successfully!');
});*/


});