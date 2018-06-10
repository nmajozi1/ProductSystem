var moment  = require('moment')
var discountDb = require('../discount/discountDBAccess')

var ProcessProducts = function() {}

ProcessProducts.prototype.purchase = function(productData, userData, callback) {
    var responseMessage

    if(productData && userData) {
        if(userData.credit >= productData.productPrice) {
            calculateDiscount(productData.productPrice, function(discount, discAmnt) {
                console.log('Does it come back here? ' + discount + ' | ' + discAmnt)
                var transactionLog = {
                    transactionDate: moment().format('DD-MM-YYYY, h:mm a'), 
                    transactionType: 'Purchase',
                    fromAmnt: userData.credit,
                    toAmnt: userData.credit - discount
                }
    
                userData.transaction.push(transactionLog)
    
                userData.credit = userData.credit - discount
    
                userData.save(function(err, docs) {
                    if(!err && docs) {
                        responseMessage = {code: '00', message: 'Purchase successful, your discount is: ' + discAmnt, data:docs}
    
                        callback(responseMessage)
                    } else {
                        responseMessage = {code: '01', message: 'failed to save data. Please contact support.'}        
    
                        callback(responseMessage)
                    }
                })
            })
        } else {
            responseMessage = {code: '01', message: 'Insufficient funds. Please top up first.'}

            callback(responseMessage)
        }
    } else {
        responseMessage = {code: '01', message: 'Product information, or user information not found.'}

        callback(responseMessage)
    }
}

function calculateDiscount(myPrice, callback) {
    var foundRange = false

    discountDb.getAll(function(response) {
        if(response && response !== null) {
            var x = 0
            while(x < response.data.length) {
                if(myPrice >= response.data[x].min && myPrice <= response.data[x].max) {
                    foundRange = true

                    var theDiscount = (myPrice * response.data[x].percentage) 
                    var discountedPrice = myPrice - theDiscount
                    
                    return callback(discountedPrice, theDiscount)

                    break
                }
                x++
            }

            if(!foundRange) {
                callback(myPrice, 0)
            }
        } else {
            callback(myPrice, 0)
        }
    })
}

module.exports = new ProcessProducts()