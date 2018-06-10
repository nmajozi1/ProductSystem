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
                $rootScope.userInfo = response.data.data
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

      // ~~~~~~~~~~~~~~~~~~~~~~~ TOP UP ACCOUNT.

      $scope.topUp = function(credit) {
        var confirm = $mdDialog.confirm()
        .title('Would you like to top up your account?')
        .cancel('Cancel')
        .ok('Yes')

        $mdDialog.show(confirm).then(function() {
            $mdDialog.show({
                controller: topUpController,
                templateUrl: 'pages/topUpDialogue.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        }, function() {});
      }

      function topUpController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
    
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
    
        $scope.answer = function(answer, topUpAmount) {
          $mdDialog.hide(answer);

          var userData = {email: jsonLoginData.email, topUpAmount: topUpAmount}
          var strTopUpData = JSON.stringify(userData)

          console.log('Top Up Data: ' + strTopUpData)

          $http.post('/topUp/' + strTopUpData).then(function(response) {
              if(response.data.code == '00') {
                  $rootScope.refresh()
              } else {
                  console.log('Fail of epic proprtions.')
              }
          })
        };
      }

      // ~~~~~~~~~~~~~~~~~~~~~~~ PURCHASE THE PRODUCT.
      $scope.purchaseProduct = function(prodName) {
        var confirm = $mdDialog.confirm()
        .title('Would you like to purchase product: ' + prodName)
        .cancel('Cancel')
        .ok('Yes')

        $mdDialog.show(confirm).then(function() {
            var purchaseData = {productName: prodName, email: jsonLoginData.email}
            var strPurchData = JSON.stringify(purchaseData)

            console.log(strPurchData)

            $http.post('/purchaseProduct/' + strPurchData).then(function(response) {
                if(response.data.code == '00') {
                    var confirm = $mdDialog.alert()
                    .title(response.data.message)
                    .ok('Ok')

                    $mdDialog.show(confirm).then(function() {
                        $rootScope.refresh()
                    }, function() {});
                } else {
                    // console.log('There is a problem: ' + response.data.message)
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

      // ~~~~~~~~~~~~~~~~~~~~~~~ TRANSACTION HISTORY.
      $scope.showTransaction = function() {
        $mdDialog.show({
            controller: transactionHistoryController,
            templateUrl: 'pages/transHistoryDialog.html',
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

      function transactionHistoryController($scope, $mdDialog) {
        $scope.transHistory = $rootScope.userInfo.transaction
        $scope.balance = $rootScope.userInfo.credit

        $scope.hide = function() {
            $mdDialog.hide();
        };
    
        $scope.answer = function(answer, topUpAmount) {
          $mdDialog.hide(answer);
        };
      }

      // ~~~~~~~~~~~~~~~~~~~~~~~ DISCOUNT INFORMATION.
      $scope.addDiscount = function(discountData) {
        // var discData = {min: 50, max: 100, percentage: 0}
        // var strDiscData = JSON.stringify(discData)

        $mdDialog.show({
            controller: addDiscountController,
            templateUrl: 'pages/addDiscount.html',
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

      function addDiscountController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
    
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    
        $scope.answer = function(answer, discountData) {
          $mdDialog.hide(answer);
          
          var strDiscData = JSON.stringify(discountData)

          $http.post('/addDiscount/' + strDiscData).then(function(response) {
              if(response.data.code == '00') {
                    // $rootScope.refresh()
                    console.log('ADD DISCOUNT DATA:')
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

      $scope.showDiscount = function() {
        $http.get('/getAllDiscounts').then(function(response) {
            if(response.data.code == '00') {
                $mdDialog.show({
                    controller: discountController,
                    templateUrl: 'pages/discountDialog.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });

                function discountController($scope, $mdDialog) {
                    $scope.discounts = response.data.data
                    // $scope.balance = $rootScope.userInfo.credit
            
                    $scope.hide = function() {
                        $mdDialog.hide();
                    };
                
                    $scope.answer = function(answer, topUpAmount) {
                      $mdDialog.hide(answer);
                    };
                  }
            } else {
                var confirm = $mdDialog.alert()
                .title(response.data.message)
                .ok('Ok')

                $mdDialog.show(confirm).then(function() {
                // console.log(' THIS IS THE CORRECT PART OF THE OK BUTTON: ')
                }, function() {});
        }
        })
      }
})