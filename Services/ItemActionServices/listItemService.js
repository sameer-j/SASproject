sasApp.service('listItemService', ['$q','$http', function($q , $http){
	
	return {
		getItemList: function(){

			var deferred=$q.defer();

			$http({
				method:'GET',
				url:'http://127.0.0.1:34343/data/listItem',
				data:''
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