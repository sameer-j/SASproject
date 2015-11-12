sasApp.service('deleteEmployeeService', ['$q','$http', function($q , $http){
	
	return {
		deleteEmployee: function(Employee){
			var deferred=$q.defer();

			$http({
				method:'POST',
				url:'http://127.0.0.1:34343/deletingEmployee',
				data: {emp_code:Employee.emp_code},
				responseType:'text/json'
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