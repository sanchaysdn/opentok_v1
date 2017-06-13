	"use strict";

	angular.module("Units")

	iotiedApp.controller("unitController", ['$scope', '$rootScope', '$localStorage',
	    'FileUploader', 'UnitService', 'ngTableParams', '$routeParams', '$route',
	    '$location', 'logger', 'ngTableParamsService', '$state', '$stateParams',
	    '$http', 'CommonService', '$uibModal',
	    function($scope, $rootScope, $localStorage,
	        FileUploader, UnitService, ngTableParams, $routeParams, $route,
	        $location, logger, ngTableParamsService, $state, $stateParams,
	        $http, CommonService, $uibModal) {
	        $scope.add = false;
	        $scope.unit = {};
	        $scope.profile = {};
	        $scope.profile.email = CommonService.getUser().email;
	        $scope.disabled = false;
	        $scope.loader = false;

	        $(document).ready(function() {
	            $(".fancybox").fancybox();
	        });
	        //empty the $scope.message so the field gets reset once the message is displayed.


	        if ($stateParams.id) {
	            UnitService.getUnitById().get({ id: $stateParams.id }, function(response) {
	                if (response.code == statusCode.ok) {
	                    $scope.add = true
	                    $scope.unit = response.data;
	                }else{
	                	logger.logError(response.message);
	                }
	            });
	        }

	        $scope.getUnitList = function() {
	            $scope.tableParams = new ngTableParams(ngTableParamsService.get(), {
	                counts: [],
	                getData: function($defer, params) {
	                    // send an ajax request to your server. in my case MyResource is a $resource.
	                    ngTableParamsService.set(params.page(), params.count(), $scope.searchTextField, params.sorting());
	                    $scope.paramUrl = params.url();
	                    $scope.tableLoader = true;
	                    $scope.unitsList = [];
	                    UnitService.getUnitList().get($scope.paramUrl, function(response) {
	                        if(response.code == statusCode.ok){
		                        $scope.tableLoader = false;
		                        $scope.unitsList = response.data.data;
		                        var data = response.data.data;
		                        $scope.totalCount = response.data.totalCount;
		                        params.total(response.data.totalCount);
		                        $defer.resolve(data);
	                        }else{
	                        	logger.logError(response.message);
	                        }
	                    });
	                }
	            });
	        }
	        var getData = ngTableParamsService.get();
	        $scope.searchTextField = getData.searchText;
	        $scope.searching = function() {
	            ngTableParamsService.set('', '', $scope.searchTextField, '');
	            $scope.tableParams = new ngTableParams(ngTableParamsService.get(), {
	                counts: [],
	                getData: function($defer, params) {
	                    // send an ajax request to your server. in my case MyResource is a $resource.
	                    ngTableParamsService.set(params.page(), params.count(), $scope.searchTextField, params.sorting());
	                    $scope.paramUrl = params.url();
	                    $scope.tableLoader = true;
	                    $scope.unitsList = [];
	                    UnitService.getUnitList().get($scope.paramUrl, function(response) {
	                    	if(response.code == statusCode.ok){
		                        $scope.tableLoader = false;
		                        $scope.unitsList = response.data.data;
		                        var data = response.data.data;
		                        $scope.totalCount = response.data.totalCount;
		                        params.total(response.data.totalCount);
		                        $defer.resolve(data);
	                    	}else{
	                    		logger.logError(response.message);
	                    	}
	                    });
	                }
	            });
	        }

	        $scope.addUpdateUnitData = function(form) {
	            if (form.$valid) {
	                $scope.disabled = true;
	                $scope.loader = true;
	                if (!$scope.unit._id) {
	                    UnitService.addUnit().save($scope.unit, function(response) {
	                        $scope.disabled = false;
	                        $scope.loader = false;
	                        if(response.code == statusCode.ok) {
	                            $location.path("/units");
	                            logger.logSuccess(response.message);
	                        } else {
	                            logger.logError(response.message);
	                        }
	                    });
	                } else {
	                    UnitService.updateUnit().save($scope.unit, function(response) {
	                        $scope.disabled = false;
	                        $scope.loader = false;
	                        if (response.code == statusCode.ok) {
	                            $location.path("/units");
	                            logger.logSuccess(response.message);
	                        } else {
	                            logger.logError(response.message);
	                        }
	                    });
	                }
	            }
	        }

	        $scope.changeUnitStatus = function(unit) {
	            UnitService.changeUnitStatus().save({ unitId: unit._id, status: unit.status }, function(response) {
	                if (response.code == statusCode.ok) {
	                    $scope.getUnitList();
	                    logger.logSuccess(response.message);
	                } else {
	                    logger.logError(response.message);
	                }
	            });
	        }

	        $scope.deleteUnit = function(id) {
	            bootbox.confirm('Are you sure you want to delete this unit', function(r) {
	                if (r) {
	                    UnitService.deleteUnit().delete({ id: id }, function(response) {
	                        if (response.code == statusCode.ok) {
	                            $scope.getUnitList();
	                            logger.logSuccess(response.message);
	                        } else {
	                            logger.logError(response.message);
	                        }
	                    });
	                }
	            })
	        }
	    }

	]);