const bcrypt = require("bcrypt");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/techie');


var SellerRegistration = require('./model/sellerregistration');
var BuyerRegistration = require('./model/buyerregistration');
var SellerProductAdd = require('./model/sellerproductadd');





//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Seller Add the Product
//filter by product



//get all

app.get('/addproduct', function(request, response) {

    SellerProductAdd.find({},function(err, reg) {
        if (err) {
            response.status(500).send({error: "Could not fetch products"});
        } else {
            response.send(reg);
        }
    });
});


//get by user
app.get('/addproduct/:sellerid',  function(request, response) {

    SellerProductAdd.find({"sellerId":request.params.sellerid},function(err, reg) {
        if (err) {
            response.status(500).send({error: "Could not fetch products"});
        } else {
            response.send(reg);
        }
    });
});
///
//delete by id
app.put('/addproduct/:productId', function(request, response) {

    SellerProductAdd.remove({"productid":request.params.productId},function(err, reg) {
        if (err) {
            response.status(500).send({error: "Could not fetch products"});
        } else {
            response.send(reg);
        }
    });
});

///
app.get('/addproduct/:productcategory', function(request, response) {

     SellerProductAdd.findOne({"productcategory":request.params.productcategory
                              },async function(err, reg) {
        if (err) {
            response.status(500).send({error: "Could not fetch products"});
        } else {
            await response.send(reg);
        }
    });
});

//post
app.post('/addproduct', function(request, response) {
    var reg=new SellerProductAdd();
    reg.productcategory=request.body.productcategory;
    reg.productid=request.body.productid;
    reg.productname=request.body.productname;
    reg.description=request.body.description;
    reg.productimageurl=request.body.productimageurl;
    reg.productprice=request.body.productprice;
    reg.sellerId=request.body.sellerId;
    reg.quantity=request.body.quantity;

reg.save(function(err, savedProduct) {
   if (err) {
       response.status(500).send({error:"Could not save product"});
   } else {
       response.send(savedProduct);
   }
});
});


// BuyerRegistration

//post

app.post('/buyerRegi', function(request, response) {
    var reg=new BuyerRegistration();
    reg.firstname=request.body.firstname;
    reg.lastname=request.body.lastname;
    reg.email=request.body.email;
    reg.phonenumber=request.body.phonenumber;
    reg.pincode=request.body.pincode;
    reg.password=request.body.password;
    reg.address=request.body.address;
    reg.state=request.body.state;
 

reg.save(function(err, savedProduct) {
   if (err) {
       response.status(500).send({error:"Could not save product"});
   } else {
       response.send(savedProduct);
   }
});
});

//get all
app.get('/buyerRegi', function(request, response) {

    BuyerRegistration.find({},function(err, reg) {
        if (err) {
            response.status(500).send({error: "Could not fetch products"});
        } else {
            response.send(reg);
        }
    });
});

//get by emailid
app.get('/buyerRegi/:email', function(request, response) {

    BuyerRegistration.find({"email":request.params.email},function(err, reg) {
        if (err) {
            response.status(500).send({error: "Could not fetch products"});
        } else {
            response.send(reg);
        }
    });
});


 //put by ID
 app.put('/buyerRegi/:id', function(request, response) {
    BuyerRegistration.updateOne({"_id": request.params.id},
        {$set:{"firstname":request.body.firstname,
                 "lastname":request.body.lastname,
                 "email":request.body.email,
                 "phonenumber":request.body.phonenumber,
                 "pincode":request.body.pincode,
                 "password":request.body.password,
                 "address":request.body.address,
                 "state":request.body.state
}}, function(err, reg) {
        if (err) {
            response.status(500).send({error:"Could not add item to wishlist"});
        } else {
           
            response.send(request.body);
        }
    })
 });


 //delete by Id
 app.delete('/buyerRegi/:email', function(request, response) {

    BuyerRegistration.remove({"email":request.params.email},function(err, reg) {
        if (err) {
            response.status(500).send({error: "Could not fetch products"});
        } else {
            response.send(reg);
        }
    });
});


/* 
Seller Registration 
Seller login
Seller Profile Update
Seller Profile Delete
 */

//post
app.post('/sellerRegi', function(request, response) {
        var reg=new SellerRegistration();
        reg.firstname=request.body.firstname;
        reg.lastname=request.body.lastname;
        reg.email=request.body.email;
        reg.phonenumber=request.body.phonenumber;
        reg.pincode=request.body.pincode;
        reg.password=request.body.password;
        reg.address=request.body.address;
        reg.state=request.body.state;
     
   
    reg.save(function(err, savedProduct) {
       if (err) {
           response.status(500).send({error:"Could not save product"});
       } else {
           response.send(savedProduct);
       }
    });
});

//get all
app.get('/sellerRegi', function(request, response) {

    SellerRegistration.find({},function(err, reg) {
        if (err) {
            response.status(500).send({error: "Could not fetch products"});
        } else {
            response.send(reg);
        }
    });
});

//get by emailid
app.get('/sellerRegi/:email', function(request, response) {

    SellerRegistration.find({"email":request.params.email},function(err, reg) {
        if (err) {
            response.status(500).send({error: "Could not fetch products"});
        } else {
            response.send(reg);
        }
    });
});

//put
app.put('/sellerRegi', function(request, response) {
    SellerRegistration.updateOne({"_id": request.body._id},
        {$set:{"firstname":request.body.firstname,
                 "lastname":request.body.lastname,
                 "email":request.body.email,
                 "phonenumber":request.body.phonenumber,
                 "pincode":request.body.pincode,
                 "password":request.body.password,
                 "address":request.body.address,
                 "state":request.body.state


}}, function(err, reg) {
        if (err) {
            response.status(500).send({error:"Could not add item to wishlist"});
        } else {
           
            response.send(request.body);
        }
    })
 });

///another way//

// app.put('/sellerRegi', function(request, response) {
//     SellerRegistration.findOne({email: request.body.email}, function(err, reg) {
//         if (err) {
//             response.status(500).send({error:"Could not add item to wishlist"});
//         } else {
//             SellerRegistration.update({},function(err,reg){
//                 if (err) {
//                     response.status(500).send({error:"Could not add item to wishlist"});
//                 } else {
//                     response.send("Successfully added to wishlist");
//                 }
//             })
           
//         }
//     })
//  });


 //put by ID
 app.put('/sellerRegi/:id', function(request, response) {
    SellerRegistration.updateOne({"_id": request.params.id},
        {$set:{"firstname":request.body.firstname,
                 "lastname":request.body.lastname,
                 "email":request.body.email,
                 "phonenumber":request.body.phonenumber,
                 "pincode":request.body.pincode,
                 "password":request.body.password,
                 "address":request.body.address,
                 "state":request.body.state


}}, function(err, reg) {
        if (err) {
            response.status(500).send({error:"Could not add item to wishlist"});
        } else {
           
            response.send(request.body);
        }
    })
 });


 //delete by Id
 app.delete('/sellerRegi/:email', function(request, response) {

    SellerRegistration.remove({"email":request.params.email},function(err, reg) {
        if (err) {
            response.status(500).send({error: "Could not fetch products"});
        } else {
            response.send(reg);
        }
    });
});



app.listen(3005, function() {
    console.log("Techie API running on port 3005...");
});
