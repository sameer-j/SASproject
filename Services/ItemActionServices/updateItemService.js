sasApp.service('updateItemService', ['$q','$http', function($q , $http){
	
	return {
		updateItemQty: function(item_code, qty){
			// alert(qty);
			var deferred=$q.defer();

			$http({
				method:'POST',
				url:'http://127.0.0.1:34343/updatingItemQty',
				data:{"item_code":item_code,"qty":qty}
			})
			.success(function(data,header,config){
				//provide data on ui
				deferred.resolve(data);
			})
			.error(function(data,header,config){
				//error block
				deferred.reject(data);
			});
			
			return deferred.promise;
		
		},

		updateItemPrice: function(item_code, price){
			var deferred=$q.defer();

			$http({
				method:'POST',
				url:'http://127.0.0.1:34343/updatingItemPrice',
				data:{"item_code":item_code,"price":price}
			})
			.success(function(data,header,config){
				//provide data on ui
				deferred.resolve(data);
			})
			.error(function(data,header,config){
				//error block
				deferred.reject(data);
			});
			
			return deferred.promise;
		
		}

	}
}])