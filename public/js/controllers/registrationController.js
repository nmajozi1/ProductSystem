app.controller('regCntrl', function($scope, $location, $mdDialog, $http){
    $scope.header = 'Registration'
    
    $scope.register = function(regData) {
        if(regData.password == regData.retype) {
            let strregData = JSON.stringify(regData)
            $http.post('/uiRegister/' + strregData).then(function(response){
                console.log('CODE: ' + response.data.code)
                if(response.data.code === '00') {
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~user added successfully
                    var confirm = $mdDialog.confirm().title('Successfull registration. Please login.').ok('Ok')
            
                    $mdDialog.show(confirm).then(function() {
                        $location.path('/')
                    });
                } else if(response.data.code === '03') {
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~user already exists
                    var confirm = $mdDialog.confirm()
                    .title('Email address ' + regData.email + ' already exists')
                    .ok('Login')
                    .cancel('Register New User');
            
                    $mdDialog.show(confirm).then(function() {
                        $location.path('/')
                    }, function() {
                        $scope.reg.email = ''
                    });
                } else {
                    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~technical problem saving user
                    var confirm = $mdDialog.confirm()
                    .title('Unsuccessfull registration. Please try again later, or contact support.')
                    .ok('Ok')
            
                    $mdDialog.show(confirm).then(function() {
                        $location.path('/')
                    });
                }
            })
        } else {
            var confirm = $mdDialog.confirm().title('Password 1 must be the same password as password2.').ok('Ok')
    
            $mdDialog.show(confirm).then(function() {
                $scope.reg.password = ''
                $scope.reg.retype = ''
            });
        }
    }

    $scope.cancel = function() {
        var confirm = $mdDialog.confirm().title('Are you sure that you want to cancel your registration?').ok('Yes').cancel('No');

        $mdDialog.show(confirm).then(function() {
            $location.path('/')
        });
    }
})