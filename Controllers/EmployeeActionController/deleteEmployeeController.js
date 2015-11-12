attendanceApp.controller('deleteController', ['$rootScope','$scope','deleteService', function($rootScope, $scope, deleteService){
	
	// $scope.name1 = sessionStorage.firstName;
	// $scope.name2  = sessionStorage.lastName;
	$scope.UserDelete= $rootScope.User;
	$scope.deleteresponse='';
	alert($scope.UserDelete.id.firstName);

	
	/*$scope.UserDelete.FirstName= $User.firstName
	$scope.UserDelete.LastName= $scope.name2;*/

	
	
	if($rootScope.token!=null && $rootScope.token == sessionStorage.token)
	{
		deleteService.deleteStudent($scope.UserDelete).then(function(data){
			
			$scope.deleteresponse = data;
		});
		$rootScope.Authorised = true;
	}
	else
	{
		$rootScope.Authorised = false;
	}


	


}]);