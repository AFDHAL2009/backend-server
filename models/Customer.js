const mongoose = require('mongoose');
const uniqueValidator=require('mongoose-unique-validator')
const customerSchema=mongoose.Schema(
    {

      name:{type:String,required:true},
      lastName:{type:String,required:true},
      old:{type:Number,required:true},
      email: { type: String, unique: true, index:true, required: true },
      password:{type:String, required:true},
      confirmPassword:{type:String, required:true},
      phone:{type:Number,required:true},
      carRegisterNumber:{type:Number,required:true},
      carBrand:{type:String,required:true},
      carModel:{type:String,required:true},
      carColor:{type:String,required:true},
      carRental:{type:Boolean,required:true}
      

    }
);
customerSchema.plugin(uniqueValidator);

module.exports=mongoose.model('Customer',customerSchema);
  

  