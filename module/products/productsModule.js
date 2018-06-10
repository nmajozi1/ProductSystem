var log4js          = require('log4js')
// var userDBAccess    = require('./productsDBAccess')
var logger          = log4js.getLogger('PRODUCTS MODULE')
var productDB       = require('./productsDBAccess')
var userDB          = require('../user/userDBAccess')
var processProd     = require('./processProducts')

logger.level = 'debug'

var Products = function(){}

Products.prototype.addProduct = function(productData, callback) {
    productDB.addProduct(productData, function(response) {
        callback(response)
    })
}

Products.prototype.getAllProducts = function(callback) {
    productDB.getAllProducts(function(response) {
        callback(response)
    })
}

Products.prototype.removeProduct = function(prodName, callback) {
    productDB.removeProduct(prodName, function(response) {
        callback(response)
    })
}

Products.prototype.purchaseProduct = function(productData, callback) {
    var productDBData
    var userDBData

    productDB.getSingleProduct(productData.productName, function(response) {
        if(response.code == '00') {
            userDB.getSingleUser(productData, function(userResp) {
                if(userResp.code == '00') {
                    productDBData = response.data
                    userDBData = userResp.data

                    processProd.purchase(productDBData, userDBData, function(finalResponse) {
                        callback(finalResponse)
                    })
                } else {
                    callback(userResp)
                }
            })
        } else {
            callback(response)
        }
    })
}

module.exports = new Products()