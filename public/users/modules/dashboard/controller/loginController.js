"use strict";

angular.module("Login")

iotiedApp.controller("dashboardController", ['$scope', '$rootScope', '$localStorage', 'dashboardService', '$routeParams', '$route', '$location', '$state', '$stateParams', '$http',
    function($scope, $rootScope, $localStorage, dashboardService, $routeParams, $route, $location, $state, $stateParams, $http) {
        $scope.service = {};
               
        $scope.disabled = false;
        $scope.loader = false;
        $scope.disabledUpdate = false;
        $scope.loaderChangePass = false;

        $scope.owlOptions = {
            //autoPlay: 4000,
            //stopOnHover: true,
            //slideSpeed: 300,
            //paginationSpeed: 600,
            items: 3,
            navigation: true, 
            pagination: false, 
            rewindNav : false,
            navigationText: ["<i class='fa fa-angle-left' aria-hidden='true'></i>","<i class='fa fa-angle-right' aria-hidden='true'></i>"]
        };

        $scope.showService = function(itemId){  
            $state.go('service', {itemId: itemId} );
        };

        if($state.params.itemId){
            console.log('itemId:- ',$state.params);
            $scope.getDashboardItem = function() {
                $scope.service = dashboardService.getDashboardItem().save({itemId: $state.params.itemId},function(response, err) {
                    if(response.code == 200){
                        $scope.service = response.data;
                        //$scope.Images = $scope.service.media.image;
                        //console.log('service:- ',$scope.service);
                    }else{
                        $scope.service = {};    
                    }
                });            
            }
        }else{
            $state.go('dashboard');
        }

        $scope.getDashboardList = function() {
            $scope.serviceList = dashboardService.getDashboardList().get({},function(response, err) {
                if(response.code == 200){
                    $scope.serviceList = response.data;
                    //console.log('serviceList:- ',$scope.serviceList);
                }else{
                    $scope.serviceList = {};    
                }                
            });            
        }

        



        //empty the $scope.message so the field gets reset once the message is displayed.
        if ($stateParams.id) {
        	//console.log('$stateParams.id', $stateParams.id)
            dashboardService.getServiceById().get({ id: $stateParams.id }, function(response) {
                if (response.code == 200) {
                	$scope.imageBase64 = true
                    $scope.service = response.data;
                    $scope.Images = $scope.service.media.image;
                    console.log($scope.Images,'$scope.Images$scope.Images')
                    // delete $scope.service.profile_image;
                }
            });
        }        


    }

]);