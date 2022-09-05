const jwt=require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const User=require('../models/User');
exports.signup=(req,res,next)=>{

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
           if(hash){
            const user=new User(
                {
                    email:req.body.email,
                    password:hash
        
                }
            )

            user.save().then(()=>res.status(201).json({message:"Utlisateur crée!"}))
            .catch(error=>res.status(400).json({error}));
            }
            if(err){
                res.status(500).json({error})  
            }
        });
    });


}

exports.login=(req,res,next)=>{
User.findOne({email:req.body.email})
.then(user=>{
    if (user===null){res.status(401).json({message:"Paire identfiant/mot de passe incorrect"})}

    else{
        bcrypt.compare(req.body.password,user.password, function(err1, res1) {
            // res === true
            if(res1===true)
            res.status(200).json(
                {
                    userId:user._id,
                    token:jwt.sign(
                        {userId:user._id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn:"24h"}
                    )
                }
            )
   
            else{  res.status(401).json({message:"Paire identfiant/mot de passe incorrect"});}
        });

    }
 
})
.catch(error=>res.status(500).json({error}))

}