(function(){
    var app = angular.module('utils', ['ui.router', 'ng-iscroll', 'data']);
    app.service( 'utils', [ '$rootScope','settings', function( $rootScope, settings ) {
        var service = {
            resize : function(){
                //console.log('Resizing app... Window is ' + $(window).height() + ' header is ' + $(".header").outerHeight() + ' content is ' + $('.content').outerHeight() + ' Detail Item is ' + $('.detailItem').outerHeight() + ' Item List Wrapper is ' + ($('.content').outerHeight()-$('.detailItem').outerHeight()))
                $('.content').css({
                    "margin-top": $(".header").outerHeight(),
                    "height":(($(window).height()-$(".header").outerHeight()))
                });
                $('.itemListWrapper').css({
                    "height": ((($(window).height()-$(".header").outerHeight())-$('.detailItem').outerHeight())-5)
                });

                //console.log('done resizing app... Window is ' + $(window).height() + ' header is ' + $(".header").outerHeight() + ' content is ' + $('.content').outerHeight() + ' Detail Item is ' + $('.detailItem').outerHeight() + ' Item List Wrapper is ' + ($('.content').outerHeight()-$('.detailItem').outerHeight()))
            },
            loading: function(state, animate){
                //var curState = function(){if(document.getElementById('loading-icon')==null){return false}else{return true}};
                var doShow = (state == undefined) ? false : true;
                var animate = (animate == undefined) ? true : animate;
                if (doShow){
                    if (state){
                        if (document.getElementById('loader-bg') == null){
                            //$('#app').on('click', "#loader-bg",function(){console.log('BACKGROUND CLICKED');service.loading(false)});
                            $('#app').append('<div id="loader-bg" class="topcoat-overlay-bg"></div><div class="ui-loader"><div class="loader"><div class="circle"></div><div class="circle"></div><div class="circle"></div><div class="circle"></div><div class="circle"></div></div></div>');//<img id="loading-icon" src="img/spinner.png" class="ui-icon-loading"/></div>

                        }
                        if (animate){
                            $('#loader-bg, .ui-loader').fadeIn();//<div id="loader-bg" class="topcoat-overlay-bg"></div><div class="ui-loader"><i class="fa fa-spinner fa-spin fa-5x"></i>
                        }else{
                            $('#loader-bg, .ui-loader').show();
                        }

                    }else{
                        if (animate){
                            $('#loader-bg, .ui-loader').fadeOut();//<div id="loader-bg" class="topcoat-overlay-bg"></div><div class="ui-loader"><i class="fa fa-spinner fa-spin fa-5x"></i>
                        }else{
                            $('#loader-bg, .ui-loader').hide();
                        }
                    }
                }
                return state;


            },
            isData:function(data){
                //test for each type of data that could be passed in
                if ( data.terms ){
                    if (data.terms.length > 0){
                        return true;
                    }else{
                        return false;
                    }
                }
                else if ( data.courses ){
                    if (data.courses.length > 0){
                        return true;
                    }else{
                        return false;
                    }
                }
                else if ( data.assigns ){
                    if (data.assigns.length > 0){
                        return true;
                    }else{
                        return false;
                    }
                }
                else if(data.assignName){
                    if (data.assignName !== ""){
                        return true
                    }else{
                        return false
                    }
                }
                else{
                    return false;
                }
            }


        };
        $('#app').on('click tap', "#loader-bg",function(){service.loading(false)});
        $('#app').append('<div id="loader-bg" class="topcoat-overlay-bg"></div><div class="ui-loader"><div class="loader"><div class="circle"></div><div class="circle"></div><div class="circle"></div><div class="circle"></div><div class="circle"></div></div></div>');//<img id="loading-icon" src="img/spinner.png" class="ui-icon-loading"/></div>

        return service;
    }]);
})();
function toStr(input) {
    if (input !== 'undefined') {
        var output;
        if (typeof input !== 'string') {
            //input is not a string, check to see if its an object, if it is stringify it
            console.log('UserData is not an object');
            if (typeof input == 'object') {
                if (app.testing) {
                    console.log('input is an object, stringifying it...');
                }
                ;
                output = JSON.stringify(input);
                return output;
            } else {
                //input is not an object, log an error and return nothing
                if (app.testing) {
                    console.log('ERROR: user data is not an object...');
                }
                ;
                return;
            }
        } else {
            return input;
        }
    }
}
function toObj(input){
    if (input != 'undefined'){
        var output;
        if (typeof input !== 'object'){
            //input is not an object, check to see if its a string, if it is parse it
            if (typeof input == 'string'){
                if (app.testing){console.log('input is a string, parsing it...');};
                output = JSON.parse(input);
                return output;
            }else{
                //input is not a string, log an error and return false
                if (app.testing){console.log('ERROR: user data is not a string...');};
                return;
            }
        }else{
            //input is allready an object, return it
            return input;
        }
    }
}
