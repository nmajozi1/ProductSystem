var express     = require('express')
var log4js      = require('log4js')
var userMod     = require('../module/user/userModule')
var logger      = log4js.getLogger('ROUTES')

logger.level    = 'debug'

var router = express.Router()

// ============== USER ROUTES
router.post('/login/:ToDo', function(req, res){
    var userData = JSON.parse(req.params.ToDo)

    userMod.getSingleUser(userData, function(response){
        res.send(response)
    })        
})

router.post('/uiRegister/:ToDo', function(req, res) {
    userMod.addUser(JSON.parse(req.params.ToDo), function(response) {
        res.send(response)
    })
})

router.get('/getUsers', function(req, res){
    userMod.getAllUsers(function(response){
        res.send(response)
    })
})

router.post('/topUp/:ToDo', function(req, res) {
    var topUpData = JSON.parse(req.params.ToDo)

    logger.info('Top up user: ' + topUpData.email + ' by the amount of ' + topUpData.topUpAmount)
    userMod.topUp(topUpData, function(response) {
        res.send(response)
    })
})

router.post('/editUser/:ToDo', function(req, res){
    var userData = JSON.parse(req.params.ToDo)
})

router.post('/deleteUser/:ToDo', function(req, res){
    var userData = JSON.parse(req.params.ToDo)
})

module.exports = router