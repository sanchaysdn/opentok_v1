"use strict";

angular.module("Login", ['ngCookies'])
var iotiedApp = angular.module('login.controller', []);

iotiedApp.controller('loginController', ['$scope', 'loginService', '$rootScope', '$localStorage', '$routeParams', '$route', '$location', '$state', '$stateParams', '$http', 'toastr', '$window', '$cookies',
    function($scope, loginService, $rootScope, $localStorage, $routeParams, $route, $location, $state, $stateParams, $http, toastr, $window, $cookies) {
        $rootScope.title = 'Login';
        $scope.loginForm = {};
        $scope.loginForm.email = '';
        $scope.loginForm.password = '';
        $scope.disableLoginSbmtBtn = false;
        $scope.loader = false;
        //$scope.loginForm.email = $cookies.get('iotied.email');
        //$scope.loginForm.password = $cookies.get('iotied.password');

        $scope.loginUser = function() {
            if ($scope.form.$valid) {
                $scope.err = '';
                $scope.disableLoginSbmtBtn = true;
                $scope.loader = true;
                loginService.login().save($scope.loginForm, function(response) {
                    $scope.disableLoginSbmtBtn = false;
                    $scope.loader = false;

                    /*if($scope.selectedUsers){
                      $cookies.put('iotied.email',$scope.loginForm.email);
                      $cookies.put('iotied.password',$scope.loginForm.password);
                    }else{
                      $cookies.remove("iotied.email");
                      $cookies.remove("iotied.password");
                    } */

                    if (response.code === 200) {
                        $window.localStorage.token = response.data.token;
                        $window.localStorage.userLoggedin = true;
                        //$rootScope.userLoggedin = true;
                        //window.location.href = 'http://'+$window.location.host+$window.location.pathname+'#!/dashboard';
                        window.location = 'http://' + $window.location.host + $window.location.pathname + '#!/dashboard';

                    } else {
                        toastr.error(response.message, 'Error');
                        $scope.disableLoginSbmtBtn = false;
                        $scope.loader = false;
                    }
                });
            }
        };

    }

]);
