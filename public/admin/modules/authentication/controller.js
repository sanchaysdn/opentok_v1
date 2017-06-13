"use strict";


angular.module("Authentication");

iotiedApp.controller('loginController', ['$scope', '$rootScope', '$location', 'AuthenticationService', '$localStorage', 'logger', 
    function($scope, $rootScope, $location, AuthenticationService, $localStorage, logger) {

    var inputJSON = "";
    $scope.user = {};
    $scope.forgotPass = {};
    $scope.isPasswordSent = false;
    $scope.disabled = false;
    $scope.loader = false;
    //login
    $scope.login = function(form) {
        if (form.$valid) {
            $scope.disabled = true;
            $scope.loader = true;
            AuthenticationService.Login($scope.user, function(response) {
                var errorMessage = '';
                $scope.disabled = false;
                $scope.loader = false;
                if (response.code == 200) {
                    $localStorage.userLoggedIn = true;
                    $rootScope.userLoggedIn = true;
                    $localStorage.token = response.data.token;
                    // $localStorage.loggedInUser = response.data.email;
                    $location.path('/dashboard');
                } else {
                    logger.logError(response.message);
                }
            });
        }
    };


    //logout
    $scope.logout = function() {
        delete $localStorage.token;
        $rootScope.userLoggedIn = false;
        $location.path('/login');
    }


    //forgot password
    $scope.resendPassword = function(form) {
        if (form.$valid) {
            $scope.disabled = true;
            $scope.loader = true;
            $scope.forgotPass.isAdmin = true;
            AuthenticationService.resendPassword($scope.forgotPass, function(response) {
                $scope.disabled = false;
                $scope.loader = false;
                if (response.code == 200) {
                    $scope.isPasswordSent = true;
                    logger.logSuccess(response.message);
                } else {
                    logger.logError(response.message);
                }
            });
        }
    }
}]);
