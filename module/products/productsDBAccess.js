var log4js      = require('log4js')
var logger      = log4js.getLogger('PRODUCT MODULE')
var Products    = require('../../model/productsModel')

logger.level='debug'

var ProductDB = function() {}

ProductDB.prototype.addProduct = function(productData, callback) {
    var responseMessage 

    Products.findOne({productName: productData.productName}, function(error, docs) {
        if(!error && docs) {
            responseMessage = {code:'01', message: 'This product already exists, try to update it instead.'}

            callback(responseMessage)
        } else {
            logger.debug('THE PRODUCTS, WE NEED TO ADD: ' + productData)

            var products = new Products({
                productName  : productData.productName,
                productPrice : productData.productPrice
            })

            products.save(function(saveErr, saveDocs) {
                if(!saveErr && saveDocs) {
                    responseMessage = {code:'00', message: 'success', data: saveDocs}

                    callback(responseMessage)
                } else {
                    responseMessage = {code:'01', message: 'Unnable to save the product. Please contact support.'}

                    callback(responseMessage)
                }
            })
        }
    })
}

ProductDB.prototype.getAllProducts = function(callback) {
    var responseMessage

    Products.find(function(error, docs) {
        if(!error && docs) {
            responseMessage = {code: '00', message: 'success', data: docs}

            callback(responseMessage)
        } else {
            responseMessage = {code: '01', message: 'Was not able to find the products. Please try again.'}

            callback(responseMessage)
        }
    })
}

ProductDB.prototype.removeProduct = function(productName, callback) {
    var responseMessage

    Products.remove({productName: productName}, function(err, docs) {
        if(!err && docs) {
            responseMessage = {code: '00', message: 'success'}

            callback(responseMessage)
        }  else {
            responseMessage = {code: '01', message: 'Unable to remove item: ' + productName}

            callback(responseMessage)
        }
    })
}

module.exports = new ProductDB()