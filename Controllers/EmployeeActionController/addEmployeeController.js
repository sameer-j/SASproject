sasApp.controller('addEmployeeController', ['$rootScope','$scope','addEmployeeService', function($rootScope, $scope, addEmployeeService){
	$scope.addresponse=[];

	$scope.addingEmployee = function(Emp){
    	
    	
    	if($rootScope.token!=null && $rootScope.token == sessionStorage.token)
    	{
    		addEmployeeService.addEmp(Emp).then(function(data){
    			$scope.addresponse='';
    	});
    		$rootScope.Authorised = true;
    	}
    	else
    	{
    		$rootScope.Authorised = false;
    	}


    };

    $scope.Back = function(){
        alert("Sorry, this button needs to be configured")
    }


    
    
}]);