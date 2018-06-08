var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var UserSchema = new Schema({
    name    : {type:String, required:false, default:''},
    surname : {type:String, required:false, default:''},
    email   : {type:String, required:false, default:''},
    password: {type:String, required:false, default:''},
    credit  : {type:Number, required:false, default:0}
})

module.exports = mongoose.model('users', UserSchema)