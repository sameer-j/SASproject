sasApp.controller('listEmployeeController', ['$rootScope','$scope','$route','listEmployeeService', 'deleteEmployeeService' , function($rootScope, $scope, $route, listEmployeeService, deleteEmployeeService){

	if($rootScope.token!=null && $rootScope.token == sessionStorage.token)
	{
		$rootScope.Authorised = true;
		$scope.mydata=[];
		listEmployeeService.getEmployeeList().then(function(data){
			$scope.mydata=data;
		})

		$scope.deletingEmployee = function(Employee){
    		deleteEmployeeService.deleteEmployee(Employee).then(function(data){
				$route.reload();
    		});
    	}

    	/*$scope.editingEmployee= function(Employee){
    		alert('here');
    		alert(Employee.Employee_code);
			sessionStorage.Employee = Employee;
			alert(sessionStorage.Employee);
		}*/
	}
	else
	{
		$rootScope.Authorised = false;
	}
    
}]);