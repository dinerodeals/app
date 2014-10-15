(function(){
    var app = angular.module('mainPage', ['ui.router', 'ionic']);
    app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            // route for the home page
            .state('main', {
                url: "/",

                views: {
                    //the view for the main Page
                    '': {
                        templateUrl: 'templates/mainPage.html',
                        controller: 'MainController'
                    }
                }

            });
    });

    app.controller('MainController', ['$scope', function($scope){
        $scope.doSomething = function(){
            console.log('BUTTON CLICKED');
        };
        $scope.dealClicked = function(id){
            console.log(id);
        };
        $scope.deals = [
            {
                name:"Name 1",
                description: "This is the description for the deal",
                pictures: ["http://romeapartmentsforrentlp.files.wordpress.com/2008/10/restaurant44.jpg"],
                ammount: "3.00",
                restraunt: "Bills Burgers",
                id: "1234-1234-123443-1234"

            },
            {
                name:"Name 2",
                description: "This is the description for the deal",
                pictures: ["http://ibeafoodie.files.wordpress.com/2011/12/restaurants_fine_jia_gallery1.jpg"],
                ammount: "5.00",
                restraunt: "Chinese Place",
                id: "12334-1234-1233443-1234"

            },
            {
                name:"Name 3",
                description: "This is the description for the deal",
                pictures: ["http://freetips4travel.files.wordpress.com/2012/07/best-restaurants-in-europe.jpg"],
                ammount: "2.00",
                restraunt: "Italian Restaurant",
                id: "456-3456-3456-3456-345"

            },
            {
                name:"Name 4",
                description: "This is the description for the deal",
                pictures: ["http://mandeeppuri.files.wordpress.com/2010/06/doosri_mehfil_restaurant__bar_noida_dsc_00352.jpg"],
                ammount: "5.00",
                restraunt: "Micky D's",
                id: "536-3456-345454-3456"

            }
        ]
    }]);
})();