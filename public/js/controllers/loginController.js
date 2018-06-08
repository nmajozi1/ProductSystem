angular.module('appMod.controllers', [])
.controller('loginController', function($scope, $location, $http, $mdDialog) {
        $scope.header   = 'PRODUCTS SYSTEM'
        $scope.lblUsername = 'Email'
        $scope.lblPassword = 'Password'

        $scope.login = function(loginData) {
                var strLoginData = JSON.stringify(loginData)
                $http.post('/login/' + strLoginData).then(function(response) {
                        switch (response.data.code) {
                                case '00': 
                                        var strUserLoggedIn = JSON.stringify(response.data.data)
                                        console.log('loginController: ' + strUserLoggedIn)
                                        $location.path('/home/'+ strUserLoggedIn)
                                        break;
                                case '01':
                                        console.log('invalid email address.')
                                        console.log(response.data.message)
                                        var confirm = $mdDialog.confirm()
                                        .title('Invalid email address. Please try again.')
                                        .ok('Ok')

                                        $mdDialog.show(confirm).then(function() {});
                                        break;
                                case '03':
                                        var confirm = $mdDialog.confirm()
                                        .title('Incorrect password. Please try again.')
                                        .ok('Ok')
                                
                                        $mdDialog.show(confirm).then(function() {});
                                        break;
                        }
                })
        }

        $scope.register = function() {
                $location.path('/register')
        }

        $scope.forgotPassword = function() {

        }
})