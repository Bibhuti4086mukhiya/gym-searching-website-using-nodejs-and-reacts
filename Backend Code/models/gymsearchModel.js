const mongoose = require("mongoose");

const GymsearchSchema = new mongoose.Schema({

    gymname:{
        type:String,
        required:true
    },
  
    location:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    phone:{
        type:Number
    },

    gimage:{
        type:String
    },

created: {
      type: Date,
      default: Date.now,
  },
  Comments: [
      {
        Text: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "customer",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    cusId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'customer'
  },


    joineduser: [
        {

            type: mongoose.Schema.Types.ObjectId,
            ref: "customer",
         
        },
      ],
});

module.exports = mongoose.model("Gym",GymsearchSchema);
