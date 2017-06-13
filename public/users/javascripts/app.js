"use strict";
angular.module("Login", []);
angular.module("Dashboard", []);
angular.module('OpenTok', []);


var iotiedApp = angular.module('iotiedApp', ['ui.router', 'oc.lazyLoad', 'toastr', 'ngRoute', 'ngStorage', 'ngTable', 'ngResource', 'Login', 'Dashboard', 'OpenTok', 'opentok'])
    .config(['$routeProvider', '$httpProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', '$qProvider', function($routeProvider, $httpProvider, $locationProvider, $stateProvider, $urlRouterProvider, $qProvider) {

        $qProvider.errorOnUnhandledRejections(false);

        $httpProvider.interceptors.push(function($q, $location, $window) {
            return {
                request: function(config) {
                    config.headers = config.headers || {};
                    if ($window.localStorage && $window.localStorage.token) {
                        config.headers.Authorization = $window.localStorage.token;
                    }
                    return config;
                },
                response: function(response) {
                    if (response.status !== 200) {
                        // handle the case where the user is not authenticated
                        //$location.path('/');
                    }
                    return response || $q.when(response);
                }
            };
        });
        //$urlRouterProvider.otherwise('/dashboard');
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('login', {
                url: '/',
                views: {
                    'header': {
                        //templateUrl: '/modules/dashboard/views/header.html'
                    },
                    'content': {
                        templateUrl: '/modules/login/views/login.html',
                        controller: "loginController"
                    },
                    'footer': {
                        //templateUrl: '/modules/dashboard/views/footer.html'
                    }
                },
                title: 'Login',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/modules/login/controller/loginController.js',
                            '/modules/login/services/loginService.js'
                        ]);
                    }
                }
            })
            .state('dashboard', {
                url: '/dashboard',
                views: {
                    'header': {
                        templateUrl: '/modules/dashboard/views/header.html'
                    },
                    'content': {
                        templateUrl: '/modules/dashboard/views/dashboard.html',
                        controller: "dashboardController"
                    },
                    'footer': {
                        templateUrl: '/modules/dashboard/views/footer.html'
                    }
                },
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/modules/dashboard/controller/dashboardController.js',
                            '/modules/dashboard/services/dashboardService.js'
                        ]);
                    }
                }
            })
            .state('opentok', {
                url: '/opentok',
                views: {
                    'header': {
                        templateUrl: '/modules/dashboard/views/header.html'
                    },
                    'content': {
                        templateUrl: '/modules/opentok/views/opentok.html',
                        controller: "openTokController"
                    },
                    'footer': {
                        templateUrl: '/modules/dashboard/views/footer.html'
                    }
                },
                data: {
                    //isAuthenticate: true
                },
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/modules/opentok/controller/openTokController.js',
                            '/modules/opentok/services/openTokService.js'
                        ]);
                    }
                }
            })
            .state('deviceList', {
                url: '/deviceList',
                views: {
                    'header': {
                        templateUrl: '/modules/dashboard/views/header.html'
                    },
                    'content': {
                        templateUrl: '/modules/dashboard/views/devicelist.html',
                        controller: "dashboardController"
                    },
                    'footer': {
                        templateUrl: '/modules/dashboard/views/footer.html'
                    }
                },
                //params: {'userid': null,'oauth_token': null,'oauth_verifier': null}, 
                //params: {}
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/modules/dashboard/controller/dashboardController.js',
                            '/modules/dashboard/services/dashboardService.js'
                        ]);
                    }
                }
            })
            .state('addDevice', {
                url: '/addDevice',
                views: {
                    'header': {
                        templateUrl: '/modules/dashboard/views/header.html'
                    },
                    'content': {
                        templateUrl: '/modules/dashboard/views/addDevice.html',
                        controller: "dashboardController"
                    },
                    'footer': {
                        templateUrl: '/modules/dashboard/views/footer.html'
                    }
                },
                //params: {'userid': null,'oauth_token': null,'oauth_verifier': null}, 
                //params: {}
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/modules/dashboard/controller/dashboardController.js',
                            '/modules/dashboard/services/dashboardService.js'
                        ]);
                    }
                }
            })
            //to remove the # from the URL
            //$locationProvider.html5Mode({enabled : true, requireBase : false});
    }])
    // Header controller
    .controller('headerCtrl', ['$scope', '$http', '$location', '$rootScope', '$window', 'toastr', '$state',
        function($scope, $http, $location, $rootScope, $window, toastr, $state) {

            // if ($window.localStorage.token && $rootScope.userLoggedin) {
            //     $scope.getUserInfo();
            // }
            if ($window.localStorage.userLoggedin) {
                $rootScope.userLoggedinnext = true;
                $rootScope.bodyclass = "skin-blue layout-top-nav fixed ng-scope";
            } else {
                $rootScope.bodyclass = "hold-transition login-page patientLoginBg";
            }
            // SignOut function
            $rootScope.logOut = function() {
                if ($window.localStorage.token) {
                    $http.get('/api/v1/auth/logout').then(function(data) {
                        if (data.data.code == 200) {
                            // Erase the token if the user fails to log in
                            delete $window.localStorage.token;
                            delete $window.localStorage.userLoggedin;
                            $scope.userLoggedin = false;
                            //$location.path('/');
                            window.location = "/";
                            toastr.success('Logout', 'Logout successfully');
                        } else {
                            toastr.error('Something went wrong please try again.!', 'Error');
                        }
                    });
                }
            };

            $rootScope.showww = function() {
                var dropd = document.getElementById("image-dropdown");
                dropd.style.height = "auto";
                dropd.style.overflow = "y-scroll";
            };

            $rootScope.hideee = function() {
                var dropd = document.getElementById("image-dropdown");
                dropd.style.height = "20px";
                dropd.style.overflow = "hidden";
            };

            $rootScope.myfuunc = function(imgParent) {
                $rootScope.hideee();
                var mainDIVV = document.getElementById("image-dropdown");
                imgParent.parentNode.removeChild(imgParent);
                mainDIVV.insertBefore(imgParent, mainDIVV.childNodes[0]);
            };

        }
    ]);
/*.run(['$rootScope', '$location', '$http', '$localStorage', '$state', 
    function($rootScope, $location, $http, $localStorage, $state) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
            // if (fromState.name != 'worker') {
            //     ngTableParamsService.set('', '', '', '', '');
            // }
            // if (toState.data) {
            //     if (!$localStorage.token && toState.data.isAuthenticate) {
            //         event.preventDefault();
            //         $state.go('dashboard');
            //     }
            // }
        });

    }
])
.directive("owlCarousel", function() {
    return {
        restrict: 'E',
        transclude: false,
        link: function (scope) {
            scope.initCarousel = function(element) {
              // provide any default options you want
                var defaultOptions = {};
                var customOptions = scope.$eval($(element).attr('data-options'));
                // combine the two options objects
                for(var key in customOptions) {
                    defaultOptions[key] = customOptions[key];
                }
                // init carousel
                //$(element).owlCarousel(defaultOptions);
                
                var curOwl = $(element).data('owlCarousel');
                if (!angular.isDefined(curOwl)) {
                    $(element).owlCarousel(defaultOptions);
                }
                scope.cnt++;
            };
        }
    };
})
.directive('owlCarouselItem', [function() {
    return {
        restrict: 'A',
        transclude: false,
        link: function(scope, element) {
          // wait for the last item in the ng-repeat then call init
            if(scope.$last) {
                scope.initCarousel(element.parent());
            }
        }
    };
}])

.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
})
.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);*/
