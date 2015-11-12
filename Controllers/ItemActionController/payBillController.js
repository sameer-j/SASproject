sasApp.controller('payBillController', ['$rootScope','$scope','$route', 'billItemService', function($rootScope, $scope, $route, billItemService){

	$scope.RegisteredCustomer = false;
	if($rootScope.token!=null && $rootScope.token == sessionStorage.token)
	{

		$rootScope.Authorised = true;
		$scope.paid = false;
		$scope.Customer;
		$scope.items = [];
		$scope.orderItem = {};
		$scope.salesOrder = {};

		$scope.salesOrder.order_items = JSON.parse(sessionStorage.items);
		$scope.salesOrder.bill_no = billItemService.getBillNo();
		$scope.salesOrder.bill_date = new Date();
		$scope.salesOrder.customer = JSON.parse(sessionStorage.Customer);

		amount = billItemService.getAmount();
		$scope.net_amount = amount.net_amount;
		$scope.salesOrder.net_amount_payable = amount.net_amount_payable;
		$scope.salesOrder.discount_percent = amount.discount_percent;
		$scope.salesOrder.discount_amount = amount.discount_amount;
		
		$scope.payBill = function(){
			billItemService.payBill($scope.salesOrder).then(function(data){
				billItemService.reset($scope.salesOrder.customer.member_id);
   				$scope.paid = true;
	  		},function(data){
				alert('payBill Error');
			});
		}
	}
	else
	{
		$rootScope.Authorised = false;
	}
    
}]);