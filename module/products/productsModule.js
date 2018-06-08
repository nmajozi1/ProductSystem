var log4js          = require('log4js')
var userDBAccess    = require('./productsDBAccess')
var logger          = log4js.getLogger('PRODUCTS MODULE')
var productDB       = require('./productsDBAccess')

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

module.exports = new Products()