sasApp.controller('addItemController', ['$rootScope','$scope','addItemService', function($rootScope, $scope, addItemService){
	$scope.addresponse=[];

	$scope.addingItem = function(Item){
    	
    	
    	if($rootScope.token!=null && $rootScope.token == sessionStorage.token)
    	{
    		addItemService.addItem(Item).then(function(data){
    			$scope.addresponse=data;
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