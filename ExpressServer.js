var express = require('express');
var app = express();
var fs = require("fs");
var mongoose = require('mongoose');
var async = require('async');

var bodyParser=require('body-parser');

var itemModel = require('./data/models/itemSchema');
var employeeModel = require('./data/models/employeeSchema');
var orderItemModel = require('./data/models/orderItemSchema');
var salesOrderModel = require('./data/models/salesOrderSchema');
var discountModel = require('./data/models/discountSchema');
var customerModel = require('./data/models/customerSchema');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


var server = app.listen(34343, '127.0.0.1', function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port)

})

app.get('/', function (req, res) {
  res.sendFile(__dirname +'/index.html');
})


/*Reset OrderItem collection*/
app.delete('/resetOrderItem/:member_id', function (req, res) {
  console.log("reseting order item table....")
 var member_id = req.params.member_id;

 //deleting the collection
 mongoose.connect('mongodb://127.0.0.1/SAS');
 var db = mongoose.connection;
 orderItemModel.findOneAndRemove({'member_id':member_id}, function(err, data) {
  if (err) throw err;
  console.log('orderItem document deleted successfully!');
  console.log(JSON.stringify(data));
  db.close();
  res.write("orderItem document deleted Successfully");
  res.end();
  });
});

/*Restore item collection*/
app.post('/restoreItems/:member_id', function (req, res) {
  var member_id = req.params.member_id;
  //deleting the collection
  mongoose.connect('mongodb://127.0.0.1/SAS');
  var db = mongoose.connection;
  orderItemModel.findOne({'member_id':member_id}, function(err, odata) {
    if (err) throw err;
    db.close(function(err,d){
      db.close();
      if(odata != null)
      {
        mongoose.connect('mongodb://127.0.0.1/SAS', function(err,data){
            console.log("connected");
            console.log("Exiting cart for the customer found!");
            console.log("Restoring item collection qty before reseting orderItem....");
            var oitems = odata.items;
            for (var i = 0; i < oitems.length; i++) {
              // console.log(JSON.stringify(oitems[i].qty));
              var buy_qty = oitems[i].qty;
              var buy_item = oitems[i].item_code;
              db = mongoose.connection;
              itemModel.findOne({ item_code: buy_item }, 'item_code qty', function(err, idata){
                if(err) throw err;

                var old_qty = parseInt(idata.qty) + buy_qty;
                var iitem = idata.item_code
                console.log("old qty:"+old_qty);
                itemModel.update({ item_code: iitem }, {qty:old_qty}, {}, mycallback);

                function mycallback (err, numAffected) {
                  if(err)
                    throw err;
                  console.log("item rows updated\n");
                };
              });
            }
            if(i == (oitems.length))
            {
              db.close();
              res.end();  
            } 
        });   
      }
      else
      {
        db.close();
        res.end();
      }
    });
  });
});

//List Items
app.get('/data/listItem', function (req, res) {
  mongoose.connect('mongodb://127.0.0.1/SAS', function(err,data){
    if(err)
      console.log("here 1 trying to open again!")
    console.log(" here 1 Connection Opened!");
  });
  var db = mongoose.connection;
  itemModel.find(function(err, items) {
    if (err) return console.error(err);
    res.write(JSON.stringify(items));
    db.close(function(err,data){
      console.log("List Item closed\n");
    });
    res.end();
  });
});

//Get Sales Statistics
app.get('/salesStats', function (req, res) {
  mongoose.connect('mongodb://127.0.0.1/SAS', function(err,data){
    if(err) throw err;
    var db = mongoose.connection;
    var mRObject = mapReduceObject();
    var salesStats = {};
    var totalSalesValue = 0, totalQtySold = 0;
    salesOrderModel.mapReduce(mRObject, function(err, results) {
      if (err) return console.error(err);
      for (var i = 0; i < results.length; i++) {
        console.log(results[i].value.sales_value);
        totalSalesValue += results[i].value.sales_value;
        totalQtySold += results[i].value.qty;
      };
      salesStats.stats = results;
      salesStats.totalQtySold = totalQtySold;
      salesStats.totalSalesValue = totalSalesValue; 
      db.close(function(err,data){
        console.log("List Item closed\n");
        res.write(JSON.stringify(salesStats));
        res.end();
      });
    });
  });
});

//Validate Customer Id
app.get('/validateCustomer/:member_id', function (req, res) {
  var member_id = req.params.member_id;

  mongoose.connect('mongodb://127.0.0.1/SAS');
  var db = mongoose.connection;
  customerModel.findOne({'member_id':member_id}, 'member_id name', function(err, cData) {
    if (err) return console.error(err);

    if(cData != null)
      res.write(cData.name);
    else
      res.write("Not Registered");
    // res.write(JSON.stringify(cData));
    db.close();
    res.end();
  });
})

/* serves all the static files */
app.get(/^(.+)$/, function(req, res){
  res.sendFile( __dirname + req.params[0]); 
});


/*Adding Item*/
app.post('/addingItem', function (req, res) {
  res.write('Got a POST request');
  var item = req.body;
  console.log("Item Added Successfully");
  console.log("Item: "+item.item_code);

  //writing to database
  var itemData = new itemModel(item);
  mongoose.connect('mongodb://127.0.0.1/SAS');
  var db = mongoose.connection;
  itemData.save(function(err) {
    if (err) throw err;

    console.log('item inserted successfully!');
    db.close();
  });
  // db.close();
  res.write("Item Added!");
  res.end();
});

/*Editing*/
app.post('/updatingItemQty', function (req, res) {
 var code = req.body.item_code;
 var item_qty = req.body.qty;

 mongoose.connect('mongodb://127.0.0.1/SAS');
 var db = mongoose.connection;

 itemModel.update({ item_code: code }, {qty:item_qty}, {}, callback);

 function callback (err, numAffected) {
  if(err)
    throw err;
  console.log("rows updated\n");
  db.close();
}
res.write("Edited Successfully");
res.end();

});

/*Editing*/
app.post('/updatingItemPrice', function (req, res) {
 var code = req.body.item_code;
 var item_price = req.body.price;

 console.log("item code: "+code);

 mongoose.connect('mongodb://127.0.0.1/SAS');
 var db = mongoose.connection;

 var new_price = parseInt(item_price);

 itemModel.update({ item_code: code }, {selling_price:new_price}, {}, callback);

 function callback (err, numAffected) {
  if(err)
    throw err;
  console.log("rows updated\n");
  db.close();
}
res.write("Edited Successfully");
res.end();

});

/*Deleting*/
app.post('/deletingItem', function (req, res) {
 var item_code = req.body.item_code;
 //writing to database
 mongoose.connect('mongodb://127.0.0.1/SAS');
 var db = mongoose.connection;
 itemModel.findOneAndRemove({'item_code':item_code}, function(err, data) {
  if (err) throw err;
  console.log('item deleted successfully!');
  db.close();
});
 res.write("Deleted Successfully");
 res.end();
});

/*Adding Employee*/
app.post('/addingEmployee', function (req, res) {
  res.write('Got a POST request');
  var employee = req.body;
  console.log("Employee Added Successfully");
  console.log("Employee: "+employee.emp_id);

  //writing to database
  var employeeData = new employeeModel(employee);
  mongoose.connect('mongodb://127.0.0.1/SAS');
  var db = mongoose.connection;
  employeeData.save(function(err) {
    if (err) throw err;

    console.log('Employee inserted successfully!');
    db.close();
  });
  // db.close();
  res.write("Employee Added!");
  res.end();
});

/*Deleting Employee*/
app.post('/deletingEmployee', function (req, res) {
 var item_code = req.body.item_code;
 
 //writing to database
 mongoose.connect('mongodb://127.0.0.1/SAS');
 var db = mongoose.connection;
 employeeModel.findOneAndRemove({'emp_id':emp_id}, function(err, data) {
  if (err) throw err;
  console.log('Employee deleted successfully!');
  db.close();
});
 res.write("Employee Successfully");
 res.end();
});

/*Adding OrderItem*/
app.post('/savingItems', function (req, res) {
  // res.write('Got a POST request');
  console.log("savingItems...");
  var orderItem = req.body;
  var items = orderItem.items;
  delete orderItem.category;
  delete orderItem.cost_price;
  var billNo = "1";

  var orderItemData = new orderItemModel(orderItem);

  //writing to database
  mongoose.connect('mongodb://127.0.0.1/SAS');
  var db = mongoose.connection;


  var billdata = {};

  async.parallel([
    function(callback) {
      orderItemData.save(function(err, data){
        if(err) throw err;
        console.log("Row inserted in OrderItem table!");

        calculateAmount(items, function(data){
          salesOrderModel.findOne({}, 'bill_no',{
            limit:1,
            sort:{bill_no: -1}
          },function(err, salesData){
            // console.log("Sales Data: ")
            console.log(JSON.stringify(salesData));
            if(err) throw err;
            if(salesData == null)
              {billNo = "1";}
            else
              billNo = JSON.stringify(parseInt(salesData.bill_no) + 1);
            // console.log(billNo);
            billdata.billno = billNo;
            billdata.amount = data;
            console.log("one");
            callback();
          });
        });
      });
    },
    function(callback) {
      var oitems = items;
      console.log("updating items:")
      var i;
      for (i = 0; i < oitems.length;i++) {
        // console.log(JSON.stringify(oitems[i].qty));
        var buy_qty = oitems[i].qty;
        var buy_item = oitems[i].item_code;

        itemModel.findOne({ item_code: buy_item }, 'item_code qty', function(err, data){
          if(err) throw err;
          var new_qty = parseInt(data.qty) - buy_qty;
          var uitem = data.item_code;
          console.log("Updating item :"+ uitem);
          console.log("new qty:"+new_qty);
          itemModel.findOneAndUpdate({ item_code: uitem }, {qty:new_qty}, {new:true}, mycallback);

          function mycallback (err, item) {
           if(item!=null)
           {
             console.log("Item Updated:\n"+JSON.stringify(item));
           }
            if(err)
              throw err;
          };
        });
      };
       if(i == oitems.length)
      {
        console.log(i+" items updated");
        callback();
      }
    }
  ],
  function (errs, results) {
    console.log("three")
    if (errs) {
      /*async.each(results, rollback, function () {
        console.log('Rollback done.');
      });*/
      console.log("Rollback required!");
    } else {
      db.close();
      console.log("BillData");
      console.log(JSON.stringify(billdata));
      res.write(JSON.stringify(billdata));
      res.end();
      console.log('Done.');
    }
  });
});

function calculateAmount(items, myCallback){

  var amount = {};
  var discount = {};
  amount.net_amount = 0;
      //cal total amount
      for (var i = 0; i < items.length; i++) {
        amount.net_amount += (items[i].selling_price * items[i].qty);
      };
      discountModel.findOne({$and:[{'lower_limit':{$lte:amount.net_amount}},{'upper_limit':{$gte:amount.net_amount}}]},function(err, discount) {
        if (err) return console.error(err);
        if(discount == null)
          amount.discount_percent = 0;
        else
          amount.discount_percent = discount.percent;
        amount.discount_amount = (amount.discount_percent/100 * amount.net_amount);
        amount.net_amount_payable = (amount.net_amount - amount.discount_amount);
        myCallback(amount);
      });
}


    /*Adding salesOrder*/
app.post('/payBill', function (req, res) {
  var salesOrder = req.body;
  console.log(JSON.stringify(salesOrder));
  var salesOrderData = new salesOrderModel(salesOrder);
  console.log(JSON.stringify(salesOrderData));

  //writing to database
  mongoose.connect('mongodb://127.0.0.1/SAS');
  var db = mongoose.connection;

  salesOrderData.save(function(err, data){
    if(err) throw err;
    console.log("Row inserted in salesOrder table!")
    db.close(function(err,data){
      console.log("salesOrder Connection Closed")
    });
    // data.amount = calculateAmount(orderItem);
    res.write("Row inserted in salesOrder table!");
    res.end();
  });
});

/*Login Credentials check*/
app.post('/checking', function (req, res) {

 var username = req.body.username;
 var password = req.body.password;
 var fileName = "loginCredentials.json";
 fs.readFile(fileName, "utf8", function(error, data){

  var obj;
  if(!error){
    status = 200;
    obj = JSON.parse(data);
    obj.every (function (e){
      console.log("Checking User:")
      if(e.Username == username && e.Password == password)
      {
        console.log("Login verified!")
        token = e.Username+"."+Date.now();
        res.send({username:e.Username, token: token, role:e.role});
        return false;
      }
      return true;
    });
  }
  else
  {
    console.log("Error reading file");
  }
  res.end();

});
});

function mapReduceObject(){
  var o = {}
  o.map = function() {
                 for (var idx = 0; idx < this.order_items.length; idx++) {
                     var key = this.order_items[idx].item_name;
                     var value = {
                                   sales_value: this.order_items[idx].selling_price,
                                   qty: this.order_items[idx].qty
                                 };
                     emit(key, value);
                 }
              };

  o.reduce = function(keyItem, countObjVals) {
                       reducedVal = { sales_value:0, qty: 0 };

                       for (var idx = 0; idx < countObjVals.length; idx++) {
                           reducedVal.qty += countObjVals[idx].qty;
                           reducedVal.sales_value += countObjVals[idx].sales_value;
                       }

                       return reducedVal;
              };
  return o;
}



