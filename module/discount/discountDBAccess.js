var log4js      = require('log4js')
var logger      = log4js.getLogger('DISCOUNT DB ACCESS')
var Discounts   = require('../../model/discountModel')

logger.level='debug'

var DiscountDB = function() {}

DiscountDB.prototype.addDiscount = function(discData, callback) {
    logger.fatal('DO WE MAKE IT IN HERE?')
    var responseMessage 

    Discounts.findOne({min: discData.min, max: discData.max}, function(findErr, findDocs) {
        if(!findErr && findDocs) {
            responseMessage = {code:'01', message: 'The range requested already exists.'}

            callback(responseMessage)
        } else {
            var discounts = new Discounts({
                min: discData.min,
                max: discData.max,
                percentage: discData.percentage
            })

            discounts.save(function(err, docs) {
                if(!err && docs) {
                    responseMessage = {code:'00', message: 'success', data: docs}

                    callback(responseMessage)
                } else {
                    responseMessage = {code:'01', message: 'unnable to save discounts'}

                    callback(responseMessage)
                }
            })
        }
    })
}

DiscountDB.prototype.findSingle = function(min, callback) {
    var responseMessage 

    Discounts.findOne({min: min}, function(err, docs) {
        if(!err && docs) {
            responseMessage = {code:'00', message:'success', data: docs}

            callback(responseMessage)
        } else {
            responseMessage = {code:'01', message:'Could not find the discount range'}

            callback(responseMessage)
        }
    })
}

DiscountDB.prototype.updateDiscount = function(updateDiscData, callback) {
    var responseMessage 

    if(updateDiscData) {
        Discounts.find(function(err, docs) {
            if(!err && docs) {
                docs[0].min = updateDiscData.min
                docs[0].max = updateDiscData.max
                docs[0].percentage = updateDiscData.percentage

                docs[0].save(function(saveErr, saveDocs) {
                    if(!saveErr && saveDocs) {
                        responseMessage = {code:'00', message: 'success', data: saveDocs}

                        callback(responseMessage)
                    } else {
                        responseMessage = {code:'01', message: 'Unnable to save discount updates. '}

                        callback(responseMessage)
                    }
                })
            } else {
                responseMessage = {code:'01', message: 'Discount information was not found.'}

                callback(responseMessage)
            }
        })
    } else {
        responseMessage = {code:'01', message: 'Update information was not found.'}

        callback(responseMessage)
    }
}

DiscountDB.prototype.getAll = function(callback) {
    var responseMessage 

    Discounts.find(function(error, docs) {
        if(!error && docs) {
            responseMessage = {code:'00', message: 'success', data: docs}

            callback(responseMessage)
        } else {
            responseMessage = {code:'01', message: 'Unnable to to find the discount data.'}

            callback(responseMessage)
        }
    })
} 

module.exports = new DiscountDB()