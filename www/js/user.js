(function(){
    var app = angular.module('user', ['ui.router', 'ng-iscroll', 'data']);
    app.service( 'user', [ '$rootScope','settings', 'userData', '$http', function( $rootScope, settings, userData , $http) {
        var service = {
            name:"",
            email:"",
            pass:"",
            uuid:"",
            appName: settings.settings.appName,
            appId: settings.settings.appId,
            loggedIn:false,
            loggingIn:false,
            userData:userData,
            saveUser: function(user){
                var data = (user) ? user: {email: service.email, pass: service.pass, name: service.name, userData: service.userData.data};
                localStorage.setItem('user', JSON.stringify(data));
            },
            loadUser:function(){
                var user = JSON.parse(localStorage.getItem('user'));
                if (user){
                    service.email = user.email;
                    service.pass = user.pass;
                    service.name = user.name;
                    service.userData.data = user.userData;
                    service.loggedIn = false;
                    service.login(service.email, service.pass, function(){
                        service.loggedIn = true;
                        $rootScope.$broadcast('loggedIn');
                    },
                    function(){

                    });
                }
            },
            login:function(email, pass, success, fail){
                if (email != "" && pass != "" && !service.loggingIn){
                    service.loggingIn = true;
                    $.ajax({
                        type: "POST",
                        url: settings.settings.loginPage.loginURL,
                        data: $.param({email: email, p : pass, appId: service.appId, appName: service.appName}),
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function(response){
                            console.log(response);
                            if (response.message === "ok") {
                                //TODO GET NAME OUT OF RETURN AND ADD IT INTO SAVE USER LOGIN
                                service.email = email;
                                service.pass = pass;
                                service.name = 'test';
                                service.loggedIn = false;
                                service.saveUser();
                                service.userData.sync();
                                success(response);
                            } else {
                                if (fail){
                                    fail(response);
                                }
                            }
                        },
                        error:function(e){
                            if (fail){
                                fail();
                            }
                            if (e.responseJSON){
                                //errorMessage = e.responseJSON.message;
                            }else{
                                //errorMessage = 'Error Connecting with Server. Please Try Again';
                            }
                        },
                        complete: function(){
                            service.loggingIn = false;
                            /*if (errorMessage){
                                app.showErrorMessage(errorMessage);
                            }else{
                                app.showSuccessMessage(successMessage);
                            }*/
                        }
                    });
                }
                else{
                    if(fail){
                        fail({message:'Please Enter an Email & a Password'});
                    }
                }
            },
            register:function(user, success, fail){
                if (user.email != "" && user.p != "" && user.name != ""&& user.uuid != ""){
                    user.appName = settings.settings.appName;
                    user.appId = settings.settings.appId;
                    $http({
                        method  : 'POST',
                        url     : settings.settings.loginPage.registerURL,
                        data    : $.param(user),  // pass in data as strings
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                    }).success(function(data) {
                        console.log(data);
                        if (data.message === "AccountCreated") {
                            //TODO GET NAME OUT OF RETURN AND ADD IT INTO SAVE USER LOGIN
                            service.email = user.email;
                            service.pass = user.p;
                            service.name =  user.name;
                            service.uuid =  user.uuid;
                            service.saveUser();
                            service.login(service.email, service.pass,
                                function(){
                                    success();
                                },
                                function(){
                                    fail();
                                }
                            );
                        } else {
                            if (fail){
                                fail(data);
                            }
                        }
                    }).error(function(data){
                        if (fail){
                            fail(data);
                        }
                    });
                }
                else{
                    if(fail){
                        fail({message:'Please Enter an Email & a Password'});
                    }
                }
            },
            logout: function(){
                service.name = "";
                service.email = "";
                service.pass = "";
                service.uuid = "";
                localStorage.removeItem('user');
                service.loggedIn = false;
                $rootScope.$state.go('start');
            }

        };
        service.loadUser();
        $rootScope.$on('saveUser', function(){service.saveUser()});
        return service;
    }]);
})();