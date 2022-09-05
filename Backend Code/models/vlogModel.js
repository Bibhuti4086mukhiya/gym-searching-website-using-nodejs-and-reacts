const mongoose = require("mongoose");

const Vlogschema = new mongoose.Schema({

    vtit:{
        type:String
    },
    vdes:{
        type:String
    },
    vimage:{
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
    }
});

module.exports = mongoose.model("Vlog",Vlogschema);