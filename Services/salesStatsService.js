sasApp.service('salesStatsService', ['$http', function($http){

	return {
		getSalesStats : function(){
			return $http.get('http://127.0.0.1:34343/salesStats')
					.success(function(data){
						return data;
					})
					.error(function(err){
						return err;
					});
		}
	}
}]);
