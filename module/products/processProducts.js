var ProcessProducts = function() {}

ProcessProducts.prototype.purchase = function(productData, userData, callback) {
    var responseMessage

    if(productData && userData) {
        if(userData.credit >= productData.productPrice) {
            userData.credit = userData.credit - productData.productPrice

            userData.save(function(err, docs) {
                if(!err && docs) {
                    responseMessage = {code: '00', message: 'success', data:docs}

                    callback(responseMessage)
                } else {
                    responseMessage = {code: '01', message: 'failed to save data. Please contact support.'}        

                    callback(responseMessage)
                }
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

module.exports = new ProcessProducts()