sasApp.service('customerService', ['$http', function($http){

	return {

		getCustomer : function(member_id){
			return $http.get('http://127.0.0.1:34343/validateCustomer/'+member_id)
					.success(function(data){
						return data.data;
					})
					.error(function(err){
						return err;
					});
		}
	}
}]);
