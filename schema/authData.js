const mongoose = require("mongoose");
const authData = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    token:{type:String},
    following:[{
        name:String,
        __id:String
    }],
    follwers:[{
        name:String,
        __id:String
    }],

    posts:[{
      description: { type: String },
      postTypr:{type:String},
      imgLink:{type:Array},
      id:{type:Number,unique:true},
      likes:{type:Number,default:0}
    }]
    
  },
  {
    collection: "Login",
  }
);

module.exports = mongoose.model("authData", authData);
