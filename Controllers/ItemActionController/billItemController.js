sasApp.controller('billItemController', ['$rootScope','$scope','$route','listItemService', 'customerService', 'billItemService', function($rootScope, $scope, $route, listItemService, customerService, billItemService){
	
	if($rootScope.token!=null && $rootScope.token == sessionStorage.token)
	{
		$scope.RegisteredCustomer = false;
		$rootScope.Authorised = true;
		$scope.Saved = false;
		$scope.SearchOrder = false;
		$scope.mydata=[];
		$scope.Customer;
		$scope.items = [];
		$scope.orderItem = {};
		$scope.billno;
		$scope.errormessage = "";
		var items;


		listItemService.getItemList().then(function(data){
			$scope.mydata = data;
			items = $.extend(true,{},$scope.mydata);
		});

		$scope.getCustomer = function(member_id){
			customerService.getCustomer(member_id).then(function(data){
				if(data.data != "Not Registered")
				{
					$scope.RegisteredCustomer = true;
					$scope.Customer.name = data.data;
					$scope.errormessage = "";
					$scope.orderItem.member_id = member_id;
				}
				else
				{
					$scope.RegisteredCustomer = false;
					$scope.errormessage = "Customer Not Found! Try again";
				}
			})
		}

    	$scope.save = function(Item){
			if($scope.items.length != 0){
				$scope.orderItem.items = $scope.items;
	    		billItemService.saveItems($scope.orderItem).then(function(data){
			    		sessionStorage.Customer = JSON.stringify($scope.Customer);
			    		sessionStorage.items = JSON.stringify($scope.items);
			    		$scope.Saved = true;
		  			},function(data){
					    alert('Server reported Error');
				});
			}
			else
				alert("No items in the cart!")
    	}

    	$scope.reset = function(item){
    		// alert(JSON.stringify(items));

    		$.each(items, function(itemKey, itemVal){
    				if(itemVal.item_code == item.item_code)
	    			{
	    				$scope.mydata[itemKey].qty = itemVal.qty;
	    			}
    		});
    		var index = $scope.items.indexOf(item);
    		$scope.items.splice(index, 1);
    	}

    	$scope.resetall = function(){
    		$route.reload();
    	}

    	$scope.AddToBill = function(item, qty){
    		item.qty = qty;
    		for (var i = 0; (i < $scope.items.length) || $scope.items.length == 0; i++) {
    			if($scope.items.length != 0 && $scope.items[i].item_code == item.item_code)
    			{
    				$scope.items.splice(i, 1);
    				$scope.items.push(item);
    				break;
    			}
    			else
    				$scope.items.push(item);
    		};
    	}
    }
    else
    {
    	$rootScope.Authorised = false;
    }
    
}]);