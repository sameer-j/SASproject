var mongoose = require('mongoose');
var $ = require('jquery');
var salesOrderModel = require('./data/models/salesOrderSchema');

mongoose.connect('mongodb://127.0.0.1/SAS', function(err){

  if(err) throw err;
  var db = mongoose.connection;

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

var totalSalesValue = 0;
var totalQtySold = 0;
salesOrderModel.mapReduce(o, function (err, results) {
/*  $.each(results, function(i){
    $.each(i, function(key, v){
      totalSalesValue += v.value.sales_value;
      totalQtySold += v.value.qty;
    })
  })*/
console.log(results);
for (var i = 0; i < results.length; i++) {
  console.log(results[i].value.sales_value);
  totalSalesValue += results[i].value.sales_value;
  totalQtySold += results[i].value.qty;
};
})
});
