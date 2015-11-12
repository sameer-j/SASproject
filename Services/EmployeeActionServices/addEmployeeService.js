sasApp.service('addEmpService', ['$q','$http', function($q , $http){
	
	return {
		addEmp: function(Emp){
			var deferred=$q.defer();
			$http({
				method:'POST',
				url:'http://127.0.0.1:34343/addingEmp',
				data: Emp,
				responseType:'text/json'
			})
			.success(function(data,header,config){
				deferred.resolve(data);
			})
			.error(function(data,header,config){
				deferred.reject(data);
			});
			
			return deferred.promise;

		
		}

	}
}])