const mongoose = require("mongoose");

const Productschema = new mongoose.Schema({

    pname:{
        type:String
    
    },
    cusId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customer'

    },pquantity:{
        type:Number
    },
    pprice:{
        type:Number
    },pdes:{
        type:String
    },pimage:{
        type:String
    }


});


module.exports = mongoose.model("Product",Productschema);