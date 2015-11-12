sasApp.service('billItemService', ['$http', function($http){
	
	var billno;
	var amount ={};

	return {

		reset : function(member_id){
			billno = 1;
			amount = {};
			return $http.delete('http://127.0.0.1:34343/resetOrderItem/'+member_id)
					.success(function(data){
						return data;
					})
					.error(function(err){
						return err;
					});
		},

		getBillNo : function(){
			return billno;
		},

		saveItems: function(orderItem){
					return $http.post('http://127.0.0.1:34343/restoreItems/'+orderItem.member_id)
						.success(function(data){
							//restore item table qty
							$http.delete('http://127.0.0.1:34343/resetOrderItem/'+orderItem.member_id)
								.success(function(data){
									$http.post('http://127.0.0.1:34343/savingItems', orderItem)
										.success(function(data){
											billno = data.billno;
											amount = data.amount;
											return data;
										})
										.error(function(err){
											return err;
										});
								})
								.error(function(err){
									alert("error restoring item table");
								});

						})
						.error(function(err){
							return err;
						});
		},

		getAmount : function(){
			return amount;
		},

		payBill : function(salesOrder){
			return $http.post('http://127.0.0.1:34343/payBill', salesOrder)
					.success(function(data){
						return data;
					})
					.error(function(err){
						return err;
					});
		}
	}
}]);
