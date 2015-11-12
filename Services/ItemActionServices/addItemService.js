sasApp.service('addItemService', ['$q','$http', function($q , $http){
	
	return {
		addItem: function(Item){
			var deferred=$q.defer();
			$http({
				method:'POST',
				url:'http://127.0.0.1:34343/addingItem',
				data: Item
			})
			.success(function(data,header,config){
				//provide data on ui
				//alert("data received");
				deferred.resolve(data);
			})
			.error(function(data,header,config){
				//error block
				//alert("data not received");
				deferred.reject(data);
			});
			
			return deferred.promise;

		
		}

	}
}])