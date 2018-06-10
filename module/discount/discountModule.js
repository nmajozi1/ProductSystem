var discDBAccess = require('./discountDBAccess')

var DiscModule = function() {}

DiscModule.prototype.addDisc = function(discData, callback) {
    discDBAccess.addDiscount(discData, function(response) {
        callback(response)
    })
}

DiscModule.prototype.getAll = function(callback) {
    discDBAccess.getAll(function(response) {
        callback(response)
    })
}

DiscModule.prototype.updateDisc = function(discData, callback) {
    discDBAccess.updateDiscount(discData, function(response) {
        callback(response)
    })
}

module.exports = new DiscModule()