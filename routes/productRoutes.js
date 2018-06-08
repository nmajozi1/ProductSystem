var express     = require('express')
var log4js      = require('log4js')
var productMod  = require('../module/products/productsModule')
var logger      = log4js.getLogger('PRODUCT ROUTES')

logger.level    = 'debug'

var router = express.Router()

// ============== PRODUCT ROUTES

router.get('/getAllProducts', function(req, res) {
    productMod.getAllProducts(function(response) {
        res.send(response)
    })
})

router.post('/addProducts/:ToDo', function(req, res) {
    var productData = JSON.parse(req.params.ToDo)

    logger.info(productData)

    productMod.addProduct(productData, function(response) {
        res.send(response)
    })
})

router.post('/removeProduct/:ToDo', function(req, res) {
    var productName = req.params.ToDo

    productMod.removeProduct(productName, function(response) {
        res.send(response)
    })
})

module.exports = router