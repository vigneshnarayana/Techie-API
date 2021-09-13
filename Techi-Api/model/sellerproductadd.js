
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sellerproductadd = new Schema({
    productcategory:String,
    productid:String,
    productname:String,
    description:String,
    productimageurl:String,
    productprice:String,
    sellerId:String
    
});

module.exports = mongoose.model('SellerProductAdd', sellerproductadd);