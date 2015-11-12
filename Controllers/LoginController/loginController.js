sasApp.controller('loginController', ['$rootScope','$scope','$location', 'loginService', function($rootScope, $scope, $location, loginService){

	$scope.User = {};
	sessionStorage.clear();
	$rootScope.valid = false;
	$rootScope.Authorised = true;
	$scope.errormessage="";
	$rootScope.Role = "";
	$scope.login = function(User){
		$scope.User = User;
		loginService.checkLogin(User).then(function(data){
			if(data.role === "sales_clerk")
			{
				$rootScope.Role = data.role;
				sessionStorage.token = data.token;
				sessionStorage.username = data.username;
				$rootScope.token = data.token;
				$rootScope.message = 'Welcome Sales Clerk';
				$rootScope.valid = true;
				$location.path("/SalesClerk/Bill");
			}
			else if(data.role === "manager")
			{
				$rootScope.Role = data.role;
				sessionStorage.token = data.token;
				sessionStorage.username = data.username;
				$rootScope.token = data.token;
				$rootScope.message = 'Welcome Manager';
				$rootScope.valid = true;
				$location.path("/Manager/SalesStatistics");
			}
			else if(data.role === "stock_manager")
			{
				$rootScope.Role = data.role;
				sessionStorage.token = data.token;
				sessionStorage.username = data.username;
				$rootScope.token = data.token;
				$rootScope.message = 'Welcome Stock Manager';
				$rootScope.valid = true;
				$location.path("/StockManager/ListItem");
			}
			else
			{
					$scope.errormessage = 'Error: Invalid user or password';
					$location.path("/Login");
			}
		});
	}
}]);
