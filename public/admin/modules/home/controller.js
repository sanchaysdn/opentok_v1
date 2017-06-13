"use strict";

angular.module("Home")

iotiedApp.controller("homeController", ['$scope', '$rootScope', '$localStorage', '$location', 'HomeService',
	function($scope, $rootScope, $localStorage, $location, HomeService) {
		
	$scope.counts = {};
	$scope.activationMessage = function() {
		$scope.parmas = $location.search();
		$scope.success = $scope.parmas.success;
		console.log($scope.success);
	}

	$scope.getCounts = function() {
	  	HomeService.getCounts().get(function(response) {
	              if (response.code == 200) {
	                  $scope.counts = response.data;
	              }
	          });
	}

}]);