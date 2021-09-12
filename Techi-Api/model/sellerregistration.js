var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sellerregistration = new Schema({
    firstname: String,
    lastname:String,
    email: String,
    phonenumber: Number,
    pincode:Number,
    password:String,
    address:String,
    state:String
    
    
});

module.exports = mongoose.model('SellerRegistration', sellerregistration);