"use strict";

var iotiedApp = angular.module('dashboard.controller', []);
iotiedApp.controller("dashboardController", ['$scope', '$rootScope', '$localStorage', 'dashboardService', '$routeParams', '$route', '$location', '$state', '$stateParams', '$http','toastr',
    function($scope, $rootScope, $localStorage, dashboardService, $routeParams, $route, $location, $state, $stateParams, $http,toastr) {
       $scope.service = {'vinod':'telang'};
       $scope.connectToWithings =function(){
       		$scope.connectData = dashboardService.connectWithing().get({},function(response, err) {
       			console.log('response',response);
                if(response.code == 200){
                	window.location.href = response.url;
                    $scope.connectData = response.data;
                    //console.log('serviceList:- ',$scope.serviceList);
                }else{
                    $scope.connectData = {};    
                }                
            });
       };
		//params: {'userid': null,'oauth_token': null,'oauth_verifier': null}, 
       console.log($state.params, '-------');
       console.log($routeParams,'=====');
       //console.log($state.params)

        $scope.deviceForm = {};
        $scope.disableSubmitBtn = false;
        $scope.loader = false;

        $scope.addDevice = function() {
                if ($scope.form.$valid) {
                    $scope.err = '';
                    $scope.disableSubmitBtn = true;
                    $scope.loader = true;
                    dashboardService.addDevice().save($scope.deviceForm, function(response) {
                        console.log(response);
                        $scope.disableSubmitBtn = false;
                        $scope.loader = false;
                        if (response.code == 200) {
                            //$window.location.href = '/#!/deviceList'
                            toastr.success(response.message);
                            $location.path('/deviceList');
                        } else {
                            toastr.error(response.message, 'Error');
                            $scope.disableSubmitBtn = false;
                            $scope.loader = false;
                        }
                    });
                }
            };

        $scope.deviceList = function() {
            $scope.deviceData = dashboardService.getDeviceList().get({},function(response, err) {
                console.log('response',response);
                if(response.code == 200){
                    $scope.deviceData = response.data;
                }else{
                    $scope.connectData = {};    
                }                
            });
        }    
	}
]);

