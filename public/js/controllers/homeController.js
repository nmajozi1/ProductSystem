app.controller('homeController', function($scope, $location, $timeout, $http, $routeParams,$rootScope, $mdDialog) {
    $scope.header = ' H O M E';
    $scope.logo = ' H Y B R I D ';

    $scope.productTableHeader = {
        prodName: 'Product Name',
        prodPrice: "Product Price"
    } 

    var jsonLoginData = JSON.parse($routeParams.ToDo)

    $scope.name     = jsonLoginData.name
    $scope.surname  = jsonLoginData.surname
    $scope.email    = jsonLoginData.email

    $scope.viewProducts = function(){
        
    }

    $rootScope.refresh = function () {
        $http.get('/getAllProducts').then(function(response) {
            if(response.data.code == '00') {
                console.log(response.data.data)
                $scope.productItems = response.data.data
            }  else {
                console.log(response.data.message)
            }
        })

        var userData = {email: $scope.email}
        var strUserData = JSON.stringify(userData)

        $http.post('/login/'+ strUserData).then(function(response) {
            if(response.data.code == '00') {
                console.log(response.data.data)
                $scope.credit = response.data.data.credit
            } else {
                console.log('------------------------ USERS NOT FOUND')
            }
        })
    }

    $rootScope.refresh()

    // ~~~~~~~~~~~~~~~~~~~~~~~ ADD PRODUCT.
    $scope.addProduct = function() {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'pages/dialog1.tmpl.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    }

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
    
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
    
        $scope.answer = function(answer, productData) {
          $mdDialog.hide(answer);
          var strProductData = JSON.stringify(productData)

          $http.post('/addProducts/' + strProductData).then(function(response) {
              if(response.data.code == '00') {
                    $rootScope.refresh()
              } else {
                var confirm = $mdDialog.alert()
                .title(response.data.message)
                .ok('Ok')

                $mdDialog.show(confirm).then(function() {
                // console.log(' THIS IS THE CORRECT PART OF THE OK BUTTON: ')
                }, function() {});
              }
          })
        };
      }

      // ~~~~~~~~~~~~~~~~~~~~~~~ REMOVE PRODUCT.
      $scope.removeUser = function(productName) {
        var confirm = $mdDialog.confirm()
        .title('Are you sure that you want to remove product: ' + productName)
        .cancel('Cancel')
        .ok('Ok')

        $mdDialog.show(confirm).then(function() {
            $http.post('/removeProduct/' + productName).then(function(response) {
                if(response.data.code == '00') {
                    $rootScope.refresh()
                } else {
                    var confirm = $mdDialog.alert()
                    .title(response.data.message)
                    .ok('Ok')

                    $mdDialog.show(confirm).then(function() {
                    // console.log(' THIS IS THE CORRECT PART OF THE OK BUTTON: ')
                    }, function() {});
                }
            }) 
        }, function() {});
      }
})