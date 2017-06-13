	"use strict";

	angular.module("Users")

	iotiedApp.controller("userController", ['$scope', '$rootScope', '$localStorage', 'UserService', 'ngTableParams', '$routeParams', '$route', '$location', 'logger', 'ngTableParamsService', '$state', '$stateParams', 'SchoolService', '$http', 'CommonService', '$uibModal',
	    function($scope, $rootScope, $localStorage, UserService, ngTableParams, $routeParams, $route, $location, logger, ngTableParamsService, $state, $stateParams, SchoolService, $http, CommonService, $uibModal) {
	        $scope.user = {};
	        $scope.profile = {};
	        $scope.changePass = {};
	        $scope.imageBase64 = '';
	        var formDataFileUpload = '';
	        $scope.profile.email = CommonService.getUser().email;
	        $scope.disabled = false;
	        $scope.loader = false;
	        $scope.disabledUpdate = false;
	        $scope.loaderChangePass = false;

	        $(document).ready(function() {
	            $(".fancybox").fancybox();
	        });
	        //empty the $scope.message so the field gets reset once the message is displayed.
	        $scope.message = "";
	        $scope.findOne = function() {
	            document.getElementById('filePicker').addEventListener('change', function(evt) {
	                var files = evt.target.files;
	                var file = files[0];
	                if (files && file) {
	                    var splitFileName = file.name.split('.');
	                    var ext = splitFileName[splitFileName.length - 1].toLowerCase();
	                    if (ext == 'jpg' || ext == 'jpeg' || ext == 'png') {
	                        if (file.size > 6291456) {
	                            logger.log('File size cannot exceed limit of 6 mb');
	                            document.getElementById("filePicker").value = "";
	                        } else {
	                            formDataFileUpload = file;
	                            // formDataFileUpload.append('file', file);
	                            var reader = new FileReader();
	                            reader.onload = function(readerEvt) {
	                                $scope.imageBase64 = btoa(readerEvt.target.result);
	                                $scope.$apply();
	                                document.getElementById('imgTag').src = 'data:image/' + ext + ';base64,' + $scope.imageBase64;
	                            };
	                            reader.readAsBinaryString(file);
	                        }
	                    } else {
	                        document.getElementById("filePicker").value = "";
	                        bootbox.alert('Invalid image format');
	                    }
	                }
	            }, false);

	            if ($stateParams.id) {
	                UserService.getUserById().get({ id: $stateParams.id }, function(response) {
	                    if (response.code == 200) {
	                        $scope.user = response.data;
	                        $scope.imageBase64 = $scope.user.profile_image;
	                        delete $scope.user.profile_image;
	                    }
	                });
	            }
	        }

	        $scope.getInstituteList = function() {
	            SchoolService.getInstituteList().get(function(response) {
	                if (response.code == 200) {
	                    $scope.instituteList = response.data;
	                }
	            });
	        }

	        $scope.changePassword = function(form) {
	            if (form.$valid) {
	                $scope.disabledUpdate = true;
	                $scope.loaderChangePass = true;

	                $scope.changePass.userId = CommonService.getUser()._id;
	                $scope.changePass.isAdmin = true;
	                UserService.changePassword().save($scope.changePass, function(response) {
	                    $scope.disabledUpdate = false;
	                    $scope.loaderChangePass = false;
	                    if (response.code == 200) {
	                        $state.reload();
	                        logger.logSuccess(response.message);
	                    } else {
	                        logger.logError(response.message);
	                    }
	                });
	            }
	        }

	        $scope.profileUpdate = function(form) {
	            if (form.$valid) {
	                $scope.disabled = true;
	                $scope.loader = true;
	                $scope.profile.userId = CommonService.getUser()._id;
	                UserService.adminProfileUpdate().save($scope.profile, function(response) {
	                    $scope.disabled = false;
	                    $scope.loader = false;
	                    if (response.code == 200) {
	                        $state.reload();
	                        logger.logSuccess(response.message);
	                    } else {
	                        logger.logError(response.message);
	                    }
	                });
	            }
	        }


	        $scope.addUpdateData = function(form) {
	            if (form.$valid) {
	                $scope.disabled = true;
	                $scope.loader = true;
	                UserService.addUpdateUser().save($scope.user, function(response) {
	                    $scope.disabled = false;
	                    $scope.loader = false;
	                    if (response.code == 200) {
	                        if (formDataFileUpload) {
	                            var formData = new FormData();
	                            formData.append('id', response.data._id);
	                            formData.append('file', formDataFileUpload);
	                            UserService.updateUserPic().save(formData, function(resp) {
	                                if (response.code != 200) {
	                                    logger.logError(response.message);
	                                }
	                            });
	                        }
	                        $location.path("/users");
	                        logger.logSuccess(response.message);
	                    } else {
	                        logger.logError(response.message);
	                    }
	                });
	            }
	        }

	        $scope.enableDisableUser = function(id, status) {
	            UserService.enableDisableUser().save({ userId: id, status: status }, function(response) {
	                if (response.code == 200) {
	                    $scope.getAllUsers();
	                    logger.logSuccess(response.message);
	                } else {
	                    logger.logError(response.message);
	                }
	            });
	        }

	        $scope.getAllUsers = function() {
	            $scope.tableParams = new ngTableParams(ngTableParamsService.get(), {
	                counts: [],
	                getData: function($defer, params) {
	                    // send an ajax request to your server. in my case MyResource is a $resource.
	                    ngTableParamsService.set(params.page(), params.count(), $scope.searchTextField, params.sorting());
	                    $scope.paramUrl = params.url();
	                    $scope.tableLoader = true;
	                    $scope.usersList = [];
	                    UserService.getUsersList().get($scope.paramUrl, function(response) {
	                        $scope.tableLoader = false;
	                        // $scope.paramUrlActive = paramUrl;
	                        $scope.usersList = response.data;
	                        var data = response.data;
	                        $scope.totalLength = response.totalLength;
	                        params.total(response.totalLength);
	                        $defer.resolve(data);
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
	                    $scope.usersList = [];
	                    UserService.getUsersList().get($scope.paramUrl, function(response) {
	                        $scope.tableLoader = false;
	                        // $scope.paramUrlActive = paramUrl;
	                        $scope.usersList = response.data;
	                        var data = response.data;
	                        $scope.totalLength = response.totalLength;
	                        params.total(response.totalLength);
	                        $defer.resolve(data);
	                    });
	                }
	            });
	        }

	        $scope.deleteUser = function(id) {
	            bootbox.confirm('Are you sure you want to delete this user', function(r) {
	                if (r) {
	                    UserService.deleteUser().delete({ id: id }, function(response) {
	                        if (response.code == 200) {
	                            $scope.getAllUsers();
	                            logger.logSuccess(response.message);
	                        } else {
	                            logger.logError(response.message);
	                        }
	                    });
	                }
	            })
	        }

	        $scope.viewUserOrders = function(userDetails) {
	            var modalInstance = $uibModal.open({
	                animation: $scope.animationsEnabled,
	                templateUrl: '/modules/orders/views/viewUserOrders.html',
	                controller: 'userOrderPopupCtrl',
	                windowClass: 'zindex',
	                size: 'lg',
	                resolve: {
	                    userDetails: userDetails
	                }
	            });
	        }

	        $scope.viewUserBids = function(userDetails) {
	            var modalInstance = $uibModal.open({
	                animation: $scope.animationsEnabled,
	                templateUrl: '/modules/users/views/viewUserBids.html',
	                controller: 'userBidPopupCtrl',
	                windowClass: 'zindex',
	                size: 'lg',
	                resolve: {
	                    userDetails: userDetails
	                }
	            });
	        }


	    }

	]);

	iotiedApp.controller('userBidPopupCtrl',
	    function($scope, $uibModalInstance, $location, logger, userDetails, ngTableParamsService, ngTableParams,
	        UserService, $uibModal) {
	        $scope.userDetails = userDetails;
	        ngTableParamsService.set('', '', '', '');
	        $scope.cancel = function() {
	            $uibModalInstance.dismiss('cancel');
	        };
	        $scope.ok = function() {
	            $uibModalInstance.dismiss('cancel');
	        };
	        $(document).ready(function() {
	            $(".fancybox").fancybox();
	        });
	        $scope.viewProduct = function(product) {
	            var modalInstance = $uibModal.open({
	                animation: $scope.animationsEnabled,
	                templateUrl: '/modules/products/views/viewProduct.html',
	                controller: 'viewProductCtrl',
	                windowClass: 'zindex',
	                // size: size,
	                resolve: {
	                    product: product
	                }
	            });
	        }
	        $scope.disabled = false;
	        $scope.loader = false;
	        $scope.getUserBidList = function() {
	            $scope.userBidsTableParams = new ngTableParams(ngTableParamsService.get(), {
	                counts: [],
	                getData: function($defer, params) {
	                    // send an ajax request to your server. in my case MyResource is a $resource.
	                    ngTableParamsService.set(params.page(), params.count(), $scope.searchTextField, params.sorting());
	                    $scope.paramUrl = params.url();
	                    $scope.tableLoader = true;
	                    $scope.userBidsList = [];
	                    $scope.paramUrl.userId = $scope.userDetails._id;
	                    UserService.getUserBidList().save($scope.paramUrl, function(response) {
	                        // $scope.paramUrlActive = paramUrl;
	                        $scope.tableLoader = false;
	                        $scope.userBidsList = response.data;
	                        var data = response.data;
	                        $scope.totalLength = response.totalLength;
	                        params.total(response.totalLength);
	                        $defer.resolve(data);
	                    });

	                }
	            });
	        }

	    })