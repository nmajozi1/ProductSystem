var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var ProductSchema = new Schema({
    productName  : {type:String, required:false, default:''},
    productPrice : {type:Number, required:false, default:0}
})

module.exports = mongoose.model('products', ProductSchema)