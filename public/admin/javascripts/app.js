"use strict";

angular.module("Authentication", []);
angular.module("Home", []);
angular.module("communicationModule", []);
angular.module("Users", []);
angular.module("Units", []);


var iotiedApp = angular.module('iotiedApp', ['ui.router', 'ngRoute', 'ngStorage', 'ngTable', 'ngResource',
        'Authentication', 'Home', 'communicationModule', 'Users', 'Units', 'ui.bootstrap',
        'angularFileUpload','ngMessages'
    ])
    .factory("CommonService", ["$http", "$resource", "$rootScope", function($http, $resource, $rootScope) {

        var user = {};
        var getUser = function() {
            return user;
        };
        var setUser = function(userData) {
            user = '';
            user = userData;
        };
        return {
            getUser: getUser,
            setUser: setUser
        }
    }])
    .config(['$routeProvider', '$httpProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', function(
        $routeProvider, $httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

        $httpProvider.interceptors.push(function($q, $location, $localStorage) {
            return {
                request: function(config) {
                    config.headers = config.headers || {};
                    // config.headers['Authorization'] = 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==';
                    config.headers['authorization'] = 'admin_bearer ' + $localStorage.token;
                    config.headers['client-type'] = 'browser'; // this is used to detect the request is from the browser
                    return config;
                },
                response: function(response) {
                    if (response.data.code == 402) {
                        delete $localStorage.token;
                        // handle the case where the user is not authenticated
                        $location.path('/login');
                    }
                    return response || $q.when(response);
                }
            };
        });

        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, $state, CommonService) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/api/loggedin').success(function(response) {
                // Authenticated
                var user = response.user;
                if (response.status == 'OK') {
                    $rootScope.userLoggedIn = true;
                    // this will set the user in the session to the application model
                    CommonService.setUser(user);
                    $state.go('dashboard');
                }
                // // Not Authenticated
                else {
                    $rootScope.userLoggedIn = false;
                    $timeout(function() {
                        deferred.resolve();
                    }, 0);
                }
            }).error(function(error) {
                $rootScope.userLoggedIn = false;
                $timeout(function() {
                    deferred.resolve();
                }, 0);
            });
            return deferred.promise;
        };


        var checkLoggedout = function() {
            return ['$q', '$timeout', '$http', '$location', '$rootScope', '$state', 'CommonService',
                function($q, $timeout, $http, $location, $rootScope, $state, CommonService) {
                    // Initialize a new promise 

                    var deferred = $q.defer();
                    // Make an AJAX call to check if the user is logged in
                    $http.get('/api/loggedin').success(function(response) {
                        // Authenticated
                        if (response.status == 'OK') {
                            $rootScope.userLoggedIn = true;
                            var user = response.user;
                            CommonService.setUser(user);
                            // $state.go('effort');
                            $timeout(deferred.resolve, 0);
                        }
                        // Not Authenticated
                        else {
                            $rootScope.userLoggedIn = false;
                            $timeout(function() {
                                deferred.resolve();
                            }, 0);
                            $state.go('login');
                        }
                    }).error(function(error) {
                        $rootScope.userLoggedIn = false;
                        $timeout(function() {
                            deferred.resolve();
                        }, 0);
                        $state.go('login');
                    });
                    return deferred.promise;
                }
            ];
        };

        $urlRouterProvider.otherwise('/dashboard');
        $stateProvider
        // // HOME STATES AND NESTED VIEWS ========================================
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('login', {
                url: '/login',
                views: {
                    'content': {
                        templateUrl: '/modules/authentication/views/login.html',
                        controller: "loginController"
                    }
                },
                data: {
                    isAuthenticate: false
                },
                resolve: {
                    loggedin: checkLoggedin,
                    // loadPlugin: function($ocLazyLoad) {
                    //     return $ocLazyLoad.load([
                    //         '/admin/modules/auth/controllers/loginController.js',
                    //         '/admin/modules/auth/services/authService.js'
                    //     ]);
                    // }
                }
            })
            .state('verifying_link', {
                url: '/verifying-link',
                views: {
                    'content': {
                        templateUrl: '/modules/home/views/verifying_link.html',
                        controller: "homeController"
                    }
                },
                data: {},
                resolve: {}
            })
            .state('forgot_password', {
                url: '/forgot-password',
                views: {
                    'content': {
                        templateUrl: '/modules/authentication/views/forgot-password.html',
                        controller: "loginController"
                    }
                },
                data: {},
                resolve: {
                    loggedin: checkLoggedin,
                }
            })
            .state('dashboard', {
                url: '/dashboard',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/home/views/home.html',
                        controller: "homeController"
                    },
                    'footer': {
                        templateUrl: '/modules/home/views/footer.html'
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('services', {
                url: '/services',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/service/views/service_list.html',
                        controller: "serviceController"
                    },
                    'footer': {
                        templateUrl: '/modules/home/views/footer.html'
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('service_add', {
                url: '/service/add',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/service/views/add_service.html',
                        controller: "serviceController"
                    },
                    'footer': {
                        templateUrl: '/modules/home/views/footer.html'
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('service_edit', {
                url: '/service/edit/:id',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/service/views/add_service.html',
                        controller: "serviceController"
                    },
                    'footer': {
                        templateUrl: '/modules/home/views/footer.html'
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('service_view', {
                url: '/service/view/:id',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        //templateUrl: '/modules/service/views/serviceView.html',
                        templateUrl: '/modules/service/views/view_service.html',
                        controller: "serviceController"
                    },
                    'footer': {
                        templateUrl: '/modules/home/views/footer.html'
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('units', {
                url: '/units',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/units/views/list_unit.html',
                        controller: "unitController"
                    },
                    'footer': {
                        templateUrl: '/modules/home/views/footer.html'
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('unit_add', {
                url: '/unit/add',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/units/views/add_unit.html',
                        controller: "unitController"
                    },
                    'footer': {
                        templateUrl: '/modules/home/views/footer.html'
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('unit_edit', {
                url: '/unit/edit/:id',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/units/views/add_unit.html',
                        controller: "unitController"
                    },
                    'footer': {
                        templateUrl: '/modules/home/views/footer.html'
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('rawmaterials', {
                url: '/rawmaterials',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/rawmaterial/views/list_rawmaterial.html',
                        controller: "rawMaterialController"
                    },
                    'footer': {
                        templateUrl: '/modules/home/views/footer.html'
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('rawmaterial_add', {
                url: '/rawmaterial/add',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/rawmaterial/views/add_rawmaterial.html',
                        controller: "rawMaterialController"
                    },
                    'footer': {
                        templateUrl: '/modules/home/views/footer.html'
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('rawmaterial_edit', {
                url: '/rawmaterial/edit/:id',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/rawmaterial/views/add_rawmaterial.html',
                        controller: "rawMaterialController"
                    },
                    'footer': {
                        templateUrl: '/modules/home/views/footer.html'
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('uploads', {
                url: '/uploads',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/uploads/views/uploadImage.html',
                        controller: "uploadController"
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })

        .state('users', {
                url: '/users',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/users/views/listuser.html',
                        controller: "userController"
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('users_add', {
                url: '/users/add',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/users/views/adduser.html',
                        controller: "userController"
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('users_edit', {
                url: '/user-edit/:id',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/users/views/adduser.html',
                        controller: "userController"
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('institute', {
                url: '/institute',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/schools/views/listschool.html',
                        controller: "schoolController"
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('institute_add', {
                url: '/institute/add',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/schools/views/addschool.html',
                        controller: "schoolController"
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('institute_edit', {
                url: '/institute-edit/:id',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/schools/views/addschool.html',
                        controller: "schoolController"
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('profile', {
                url: '/profile',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/users/views/profile.html',
                        controller: "userController"
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('products', {
                url: '/products',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/products/views/listProduct.html',
                        controller: "productController"
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })
            .state('orders', {
                url: '/orders',
                views: {
                    'header': {
                        templateUrl: '/modules/home/views/header.html'
                    },
                    'leftBar': {
                        templateUrl: '/modules/home/views/leftBar.html'
                    },
                    'content': {
                        templateUrl: '/modules/orders/views/listOrder.html',
                        controller: "orderController"
                    }
                },
                data: {
                    isAuthenticate: true
                },
                resolve: {
                    loggedin: checkLoggedout()
                }
            })

        //to remove the # from the URL
        //$locationProvider.html5Mode({enabled : true, requireBase : false});
    }])

.run(['$rootScope', '$location', '$http', '$localStorage', '$state', 'ngTableParamsService',
        function($rootScope, $location, $http, $localStorage, $state, ngTableParamsService) {

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
                $rootScope.currentState = toState.name;
                if (fromState.name != 'worker') {
                    ngTableParamsService.set('', '', '', '', '');
                }
                if (toState.data) {
                    if (!$localStorage.token && toState.data.isAuthenticate) {
                        event.preventDefault();
                        $state.go('login');
                    }
                }
            });

        }
    ])
    .filter('capitalize', function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    })
    .directive("owlCarousel", function() {
        return {
            restrict: 'E',
            transclude: false,
            link: function(scope) {
                scope.initCarousel = function(element) {
                    // provide any default options you want
                    var defaultOptions = {};
                    var customOptions = scope.$eval($(element).attr('data-options'));
                    // combine the two options objects
                    for (var key in customOptions) {
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
                if (scope.$last) {
                    scope.initCarousel(element.parent());
                }
            }
        };
    }])
    .filter('trustAsResourceUrl', ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
    }]);