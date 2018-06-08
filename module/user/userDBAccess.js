var mongoose    = require('mongoose')
var Users       = require('../../model/userModel')
var log4js      = require('log4js')
var logger      = log4js.getLogger('User DB Access')

logger.level    = 'debug'

var UserDBAccess = function(){}

UserDBAccess.prototype.addUser = function(userData, callback){
    Users.findOne({email: userData.email}, function(error, docs){
        if(!error && docs){
            callback({code:'01', message:'User already exists.', data:error})
        }else{
            var users = new Users({
                name    : userData.name,
                surname : userData.surname,
                email   : userData.email,
                password: userData.password
            })

            users.save(function(saveErr, saveDocs){
                if(!saveErr && saveDocs){
                    logger.info('success')
                    callback({code:'00', message:'success', data:saveDocs})
                } else {
                    logger.info('fail')
                    callback({code:'01', message:'Users failed to save.', data:error})
                }
            })
        }
    })
}

UserDBAccess.prototype.getAllUsers = function(callback){
    Users.find(function(error, docs){
        if(!error && docs){
            callback({code:'00', message:'success', data:docs})
        }else{
            callback({code:'01', message:'Users not found.', data:error})
        }
    })
}

UserDBAccess.prototype.getSingleUser = function(userData, callback){
    findSingleUser(userData, function(resp){
        callback(resp)
    })
}

UserDBAccess.prototype.updateUser = function(userData, callback) {

}

UserDBAccess.prototype.deleteUser = function(userData, callback) {

}

var findSingleUser = function(userData, callback){
    console.log('**** | ' + JSON.stringify(userData))
    Users.findOne({email: userData.email}, function(error, docs){
        if(!error, docs){
            callback({code:'00', message:'success', data:docs})
        }else{
            callback({code:'01', message:'User not found.', data:error})
        }
    })
}

module.exports = new UserDBAccess()