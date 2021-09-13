var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buyerregistration = new Schema({
    firstname: String,
    lastname:String,
    email: String,
    phonenumber: Number,
    pincode:Number,
    password:String,
    address:String,
    state:String
});

module.exports = mongoose.model('BuyerRegistration', buyerregistration);