var log4js      = require('log4js')
var logger      = log4js.getLogger('PROCESS USER')
var moment      = require('moment')

logger.level    = 'debug'

var ProcessUser = function() {}

ProcessUser.prototype.topUp = function(userData, topUpAmount, callback) {
    // logger.debug('Do I make it in here?')
    var responseMessage

    if(userData) {
        if(topUpAmount && topUpAmount > 0) {
            var transactionLog = {
                transactionDate: moment().format('DD-MM-YYYY, h:mm a'), 
                transactionType: 'Top Up',
                fromAmnt: userData.credit,
                toAmnt: userData.credit + topUpAmount
            }

            userData.transaction.push(transactionLog)

            userData.credit = userData.credit + topUpAmount

            userData.save(function(error, docs) {
                if(!error && docs) {
                    responseMessage = {code: '00', message: 'success', data: 'docs'}

                    callback(responseMessage)
                } else {
                    responseMessage = {code: '05', message: 'Unnable to top up. Please contact support.'}        

                    callback(responseMessage)
                }
            })
        } else {
            responseMessage = {code: '03', message: 'Invalid top up amount.'}

            callback(responseMessage)
        }
    } else {
        responseMessage = {code: '01', message: 'No user data found to process'}

        callback(responseMessage)
    }
}

module.exports = new ProcessUser()