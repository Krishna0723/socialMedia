const mongoose = require("mongoose");
const postData = new mongoose.Schema(
  {
    description: { type: String },
    // token:{type:String},
    postTypr:{type:String},
    imgLink:{type:Array},
    id:{type:String},
    id2:{type:Number},
    likes:{type:Number,default:0}
  },
  {
    collection: "feed",
  }
);

module.exports = mongoose.model("postData", postData);
