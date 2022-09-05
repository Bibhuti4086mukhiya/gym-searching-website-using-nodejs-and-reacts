const mongoose = require("mongoose");

const CustomerSchema = new mongoose.model("customer",{

    username:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    password:{
        type:String,
        required:true

    },address:{
        type:String
    },
    phone:{
        type:Number
    },
});

module.exports = CustomerSchema;