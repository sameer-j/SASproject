sasApp.controller('salesStatsController', ['$rootScope','$scope','$route','salesStatsService', function($rootScope, $scope, $route, salesStatsService ){
	
	if($rootScope.token!=null && $rootScope.token == sessionStorage.token)
	{
		$rootScope.Authorised = true;
		$scope.errormessage = "";
		$scope.salesStats;
		var items;

		salesStatsService.getSalesStats().then(function(data){
			$scope.salesStats = data.data;
		});
    }
    else
    {
    	$rootScope.Authorised = false;
    }
    
}]);