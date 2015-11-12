sasApp.controller('logoutController', ['$rootScope','$scope','$location', function($rootScope, $scope, $location){
	sessionStorage.clear();
	$rootScope.valid = false;
	$rootScope.Role = "";
	$location.path("#/Login");
}]);