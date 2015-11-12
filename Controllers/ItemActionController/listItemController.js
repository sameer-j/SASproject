sasApp.controller('listItemController', ['$rootScope','$scope','$route','listItemService', 'deleteItemService' , 'updateItemService', function($rootScope, $scope, $route, listItemService, deleteItemService, updateItemService){

	if($rootScope.token!=null && $rootScope.token == sessionStorage.token)
	{
		$rootScope.Authorised = true;
		$scope.mydata=[];
		listItemService.getItemList().then(function(data){
			$scope.mydata = data;
		})

		$scope.deletingItem = function(Item){
			deleteItemService.deleteItem(Item).then(function(data){
				$route.reload();
			});
		}

		$scope.updatingItemQty = function(item_code, qty){
			updateItemService.updateItemQty(item_code, qty).then(function(data){
				$route.reload();
			});
		}

		$scope.updatingItemPrice = function(item_code, price){
			updateItemService.updateItemPrice(item_code, price).then(function(data){
				$route.reload();
			});
		}

	}
	else
	{
		$rootScope.Authorised = false;
	}

}]);