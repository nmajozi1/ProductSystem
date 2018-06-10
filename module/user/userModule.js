var log4js          = require('log4js')
var processUser     = require('./processUser')
var userDBAccess    = require('./userDBAccess')
var logger          = log4js.getLogger('User Module')

logger.level = 'debug'

var Users = function(){}

Users.prototype.addUser = function(userData, callback){
    userDBAccess.addUser(userData, function(response){
        callback(response)
    })
}

Users.prototype.getSingleUser = function(userData, callback) {
    userDBAccess.getSingleUser(userData, function(response){
        callback(response)
    })
}

Users.prototype.getAllUsers = function(callback){
    userDBAccess.getAllUsers(function(response){
        callback(response)
    })
}

Users.prototype.topUp = function(userData, callback) {
    userDBAccess.getSingleUser(userData, function(response) {
        if(response.code == '00') {
            processUser.topUp(response.data, userData.topUpAmount, function(resp) {
                callback(resp)
            })
        } else {
            callback(response)
        }
    })
}

Users.prototype

module.exports = new Users()