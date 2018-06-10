var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var DiscountSchema = new Schema({
    min: {type:Number, required:false, default:''},
    max: {type:Number, required:false, default:0},
    percentage: {type:Number, required:false, default:0}
})

module.exports = mongoose.model('discount', DiscountSchema)