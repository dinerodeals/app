(function(){
    var app = angular.module('loginPage', ['ui.router', 'ng-iscroll','utils', 'data']);
    app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            // route for the home page
            .state('start', {
                url: "/start",
                views: {
                    //the view for the main Page
                    '': {
                        templateUrl: 'templates/loginPage.html',
                        controller: 'StartController'
                    }
                },
                onEnter: function(){
                    console.log('Entering start state');
                }

            })
            .state('login', {
                url: "/login",
                views: {
                    //the view for the main Page
                    '': {
                        templateUrl: 'templates/partials/login.html',
                        controller: 'LoginController'
                    }
                },
                onEnter: function(){
                    console.log('Entering login state');
                }

            })
            .state('register', {
                url: "/register",
                views: {
                    //the view for the main Page
                    '': {
                        templateUrl: 'templates/partials/register.html',
                        controller: 'RegisterController'
                    }
                },
                onEnter: function(){
                    console.log('Entering register state');
                }
            });
    });
    app.controller('StartController', ['$scope', '$stateParams','settings', 'utils', 'user', function($scope, $stateParams, settings, utils, user ){
        setTimeout(function(){utils.resize();}, 50);
        $scope.autoLogin = false;
        if (user.loggedIn){
            $scope.$state.go('main');
        }else{
            if (user.email != "" && user.pass != "" && !user.loggingIn){
                $scope.autoLogin = true;
                utils.loading(true, false);
                user.login(user.email, user.pass,
                    //success
                    function(data){
                        utils.loading(false);
                        $scope.$state.go('main');
                    },
                    //fail
                    function(data){
                        utils.loading(false);
                        $scope.$apply($scope.autoLogin = false);
                    }
                );
            }
        }

        $scope.$on( 'loggedIn', function( event ) {
            $scope.$state.go('main');
        });

        utils.resize();
    }]);
    app.controller('LoginController', ['$scope', '$stateParams','settings', 'utils', '$http', 'user', function($scope, $stateParams, settings, utils, $http , user){
        setTimeout(function(){utils.resize();}, 50);
        $scope.password = '';
        $scope.email= user.email;
        $scope.p= user.pass;

        $scope.login = function(){
            utils.loading(true);
            $scope.p = hex_sha512($scope.password);
            user.login($scope.email, $scope.p,
                //success
                function(data){
                    utils.loading(false);
                    $scope.$state.go('main');
                },
                //fail
                function(data){
                    utils.loading(false);
                }
            );
            console.log('Loging into ' + settings.settings.loginPage.loginURL);

        };



        utils.resize();
    }]);
    app.controller('RegisterController', ['$scope', '$stateParams','settings', 'utils', 'user', function($scope, $stateParams, settings, utils , user){
        setTimeout(function(){utils.resize();}, 50);
        $scope.name = user.name;
        $scope.email= user.email;
        $scope.password = '';
        $scope.confPassword = '';
        $scope.p= user.pass;
        $scope.uuid = '';

        $scope.register = function(){
            utils.loading(true);
            $scope.p = hex_sha512($scope.password);
            $scope.uuid = Math.uuid();
            user.register({name:$scope.name, email:$scope.email, p:$scope.p,uuid:$scope.uuid},
                //success
                function(data){
                    utils.loading(false);
                    $scope.$state.go('main');
                },
                //fail
                function(data){
                    utils.loading(false);
                }
            );
            console.log('Loging into ' + settings.settings.loginPage.loginURL);

        };
        utils.resize();
    }]);
})();