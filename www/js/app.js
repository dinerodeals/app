(function(){
    var app = angular.module('app',[
        'ui.router',
        'ng-iscroll',
        'mainPage',
        'ionic'
        //'data',
        //'utils',
        //'user'
    ]);
    app.run(function($rootScope,$state,$stateParams){
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        //$(window).resize(function(){ });
        setTimeout(function(){

        }, 50);

    });
    app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', function($httpProvider, $stateProvider, $urlRouterProvider, $sceDelegateProvider ){
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://www.nickbolles.com/**', 'http://localhost:63342/**', 'http://localhost:8080/**', 'http://localhost:8080/gpabot/userdata']);
        //$locationProvider.html5Mode(true);
        //for any unmatched url redirect to /
        $urlRouterProvider.otherwise("/");
    }]);
    app.directive('headerShrink', function($document) {
        var fadeAmt;

        var shrink = function(header, content, amt, max) {
            amt = Math.min(max, amt);
            fadeAmt = 1 - amt / max;
            ionic.requestAnimationFrame(function() {
                header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
                for(var i = 0, j = header.children.length; i < j; i++) {
                    header.children[i].style.opacity = fadeAmt;
                }
            });
        };

        return {
            restrict: 'A',
            link: function($scope, $element, $attr) {
                var starty = $scope.$eval($attr.headerShrink) || 0;
                var shrinkAmt;

                var header = $document[0].body.querySelector('.bar-header');
                var headerHeight = header.offsetHeight;

                $element.bind('scroll', function(e) {
                    if(e.detail.scrollTop > starty) {
                        // Start shrinking
                        shrinkAmt = headerHeight - Math.max(0, (starty + headerHeight) - e.detail.scrollTop);
                        shrink(header, $element[0], shrinkAmt, headerHeight);
                    } else {
                        shrink(header, $element[0], 0, headerHeight);
                    }
                });
            }
        }
    });
    app.directive('dealItemClicked', [ function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs, $state) {
                element.bind("tap", function (e) {
                    console.log('tap');
                    console.log(e.currentTarget);
                    var id = e.currentTarget.dataset.id;
                    $scope.$state.go('deal', {dealId:id});

                });
            }
        };
    }]);
})();


