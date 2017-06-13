(function() {

    'use strict';

    // Home Routes
    var app = angular.module('userRoute', []);

    // Application configuration
    app.config(['$stateProvider', '$httpProvider', '$urlRouterProvider',
        function($stateProvider, $httpProvider, $urlRouterProvider) {

            //================================================ 
            // Add an interceptor for AJAX errors
            //================================================
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
            // ************************ End ***************************

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('login', {
                    url: '/',
                    views: {
                        'header': {
                            //templateUrl: '/views/admin/header.html',
                        },
                        'content': {
                            templateUrl: '/modules/login/views/login.html',
                            controller: "loginController"
                        },
                        'footer': {
                            //templateUrl: '/views/admin/footer.html',
                        }
                    },
                    title: 'Login',
                    resolve: {
                        loadPlugin: function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/modules/login/controller/loginController.js',
                                'modules/login/services/loginService.js'
                            ]);
                        }
                    },
                    data: {
                        isAuthenticate: false
                    }
                })
                .state('dashboard', {
                    url: '/dashboard',
                    title: 'dashboard',
                    views: {
                        'header': {
                            templateUrl: '/modules/dashboard/views/header.html'
                        },
                        'content': {
                            templateUrl: '/modules/dashboard/views/dashboard.html',
                            controller: "dashboardController"
                        },
                        'footer':{
                            templateUrl: '/modules/dashboard/views/footer.html'
                        }
                    },
                    resolve: {
                        loadPlugin: function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/modules/dashboard/controller/dashboardController.js',
                                'modules/dashboard/services/dashboardService.js'
                            ]);
                        }
                    },
                    data: {
                        isAuthenticate: true
                    }
                });
        }
    ]);

    app.run(['$rootScope', '$state', '$http', '$SERVICE', '$location', '$timeout', '$window', '$PUBLICURL',
        function($rootScope, $state, $http, $SERVICE, $location, $timeout, $window, $PUBLICURL) {
            $rootScope.$on('$stateChangeStart', function(event, toState) {
                
                $rootScope.PUBLICURL = $PUBLICURL;   
                if (!$window.localStorage.token && toState.data.isAuthenticate) {
                    event.preventDefault();
                    $state.go('login');
                }

                /*TO authenticate states on state change*/
                $http.get($SERVICE + '/auth/login_check')
                    .success(function(data) {
                        if (data.code === 200) {
                            $rootScope.User=data;
                            if (!toState.data.isAuthenticate) {
                                event.preventDefault();
                                $state.go('dashboard');
                            }
                            $rootScope.userLoggedin = true;
                        } else {
                            $rootScope.userLoggedin = false;
                            event.preventDefault();
                            $state.go('login');
                            delete $window.localStorage.token;
                        }
                    });

                /*To check user permissions access level*/
                $http.get($SERVICE + '/permissions/get_user_permissions')
                    .success(function(response) {
                        if (response.code === 200) {
                           // $rootScope.permissionsArray = response.data.permissions;
                            if (response.data.permissions.indexOf(toState.name) == -1 && toState.name != '') {
                                // event.preventDefault();
                                $state.go('policies');
                            }
                        }
                    });
            });
        }
    ]);
})();