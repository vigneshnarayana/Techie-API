var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/techie');


var SellerRegistration = require('./model/sellerregistration');



//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
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
    SellerRegistration.findOne({email: request.body.email}, function(err, reg) {
        if (err) {
            response.status(500).send({error:"Could not add item to wishlist"});
        } else {
            SellerRegistration.update({},function(err,reg){
                if (err) {
                    response.status(500).send({error:"Could not add item to wishlist"});
                } else {
                    response.send("Successfully added to wishlist");
                }
            })
           
        }
    })
 });

 //put using data
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
// //put Data
// app.put('/sellerRegi/put', function(request, response) {
//     var reg=new SellerRegistration();
//     reg.firstname=request.body.firstname;
//     reg.lastname=request.body.lastname;
//     reg.email=request.body.email;
//     reg.phonenumber=request.body.phonenumber;
//     reg.pincode=request.body.pincode;
//     reg.password=request.body.password;
//     reg.address=request.body.address;
//     reg.state=request.body.state;
 

// reg.put(function(err, savedProduct) {
//    if (err) {
//        response.status(500).send({error:"Could not save product"});
//    } else {
//        response.send(savedProduct);
//    }
// });
// });


app.listen(3005, function() {
    console.log("Techie API running on port 3005...");
});
