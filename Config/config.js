var sasApp = angular.module('sasApp', ['ngRoute']);

/*Custom Directive*/
angular.module('sasApp').directive('mySharedScope', function () {
	return {
		template: 'User operation performed successfully'
	};
});

/*Routing*/
sasApp.config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
	
	$routeProvider
	.when('/Login',
		{
			templateUrl: 'Partials/Login/login.html',   
			controller: 'loginController'
		})
	.when('/Logout',
		{
			templateUrl: 'Partials/Login/login.html',   
			controller: 'logoutController'
		})
	.when('/Manager/SalesStatistics',
		{
			templateUrl: 'Partials/SalesStatistics/salesstats.html',   
			controller: 'salesStatsController'
		})
	.when('/Manager/RevisePrice',
		{
			templateUrl: 'Partials/ItemAction/listItem.html',   
			controller: 'listItemController'
		})
	.when('/Manager/AddEmployee',
		{
			templateUrl: 'Partials/EmployeeAction/addEmployee.html',   
			controller: ''
		})
	.when('/StockManager/AddItem',
		{
			templateUrl: 'Partials/ItemAction/addItem.html',   
			controller: 'addItemController'
		})	
	.when('/StockManager/ListItem',
		{
			templateUrl: 'Partials/ItemAction/listItem.html',   
			controller: 'listItemController'
		})	
	.when('/SalesClerk/AddCustomer',
		{
			templateUrl: 'Partials/CustomerAction/addCustomer.html',   
			controller: ''
		})
	.when('/SalesClerk/Bill',
		{
			templateUrl: 'Partials/ItemAction/billItem.html',   
			controller: 'billItemController'
		})
	.when('/SalesClerk/PayBill',
		{
			templateUrl: 'Partials/ItemAction/paybill.html',   
			controller: 'payBillController'
		})
	.when('/SalesClerk/ListItem',
		{
			templateUrl: 'Partials/ItemAction/listItem.html',   
			controller: 'listItemController'
		})
	.otherwise({
		redirectTo:'/Login'
		});
}]);

