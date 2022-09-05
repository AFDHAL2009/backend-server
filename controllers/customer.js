const jwt=require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const Customer=require('../models/Customer');
exports.signup=(req,res,next)=>{

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
           if(hash){
            const customer=new Customer(
                {
                    name:req.body.name,
                    lastName:req.body.lastName,
                    old:req.body.old,
                    email:req.body.email,
                    password:hash,
                    confirmPassword:hash,
                    phone:req.body.phone,
                    carRegisterNumber:req.body.carRegisterNumber,
                    carBrand:req.body.carBrand,
                    carModel:req.body.carModel,
                    carColor:req.body.carColor,
                    carRental:req.body.carRental
        
                }
            )

            customer.save().then(()=>res.status(201).json({message:"Customer created successfully!"}))
            .catch(error=>res.status(400).json({error}));
            }
            if(err){
                res.status(500).json({error})  
            }
        });
    });

}

exports.login=(req,res,next)=>{
Customer.findOne({email:req.body.email})
.then(customer=>{
    if (customer===null){res.status(401).json({message:"Email or password is wrong!"})}

    else{
        bcrypt.compare(req.body.password,customer.password, function(err1, res1) {
            // res === true
            if(res1===true)
            res.status(200).json(
                {
                    customerId:customer._id,
                    token:jwt.sign(
                        {customerId:customer._id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn:"24h"}
                    )
                }
            )
   
            else{  res.status(401).json({message:"Email or password is wrong!"});}
        });

    }

})
.catch(error=>res.status(500).json({error}))

}