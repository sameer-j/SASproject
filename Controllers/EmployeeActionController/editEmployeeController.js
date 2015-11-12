attendanceApp.controller('editController', ['$rootScope','$scope','editService', function($rootScope, $scope, editService){

	$scope.name1 = sessionStorage.firstName;
	$scope.name2  = sessionStorage.lastName;



	$scope.editresponse='';

	$scope.editingUser= function(User){
		User.FirstName= $scope.name1;
		User.LastName= $scope.name2;
		
		if($rootScope.token!=null && $rootScope.token == sessionStorage.token)
		{
			editService.editStudent(User).then(function(data){
			$scope.editresponse = data;
			});
			$rootScope.Authorised = true;
		}
		else
		{
			$rootScope.Authorised = false;
		}
	}


}]);
