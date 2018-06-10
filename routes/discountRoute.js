var express     = require('express')
var log4js      = require('log4js')
var discMod     = require('../module/discount/discountModule')
var logger      = log4js.getLogger('ROUTES')

logger.level    = 'debug'

var router = express.Router()

// ============== DISCOUNT ROUTES
router.post('/addDiscount/:ToDo', function(req, res) {
    var discountData = JSON.parse(req.params.ToDo)

    discMod.addDisc(discountData, function(response) {
        res.send(response)
    })
})

router.get('/getAllDiscounts', function(req, res) {
    discMod.getAll(function(response) {
        res.send(response)
    })
})

router.post('/updateDisc/:ToDo', function(req, res) {
    var discountData = JSON.parse(req.params.ToDo)

    discMod.updateDisc(function(response) {
        res.send(response)
    })
})

module.exports = router