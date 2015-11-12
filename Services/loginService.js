sasApp.service('loginService', ['$q','$http', function($q , $http){
	
	return {
		checkLogin: function(User){
			var deferred = $q.defer();

			$http({
				method:'POST',
				url:'http://127.0.0.1:34343/checking',
				data: {
					username:User.Username,
					password:User.Password
				}
			})
			.success(function(data,header,config){
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