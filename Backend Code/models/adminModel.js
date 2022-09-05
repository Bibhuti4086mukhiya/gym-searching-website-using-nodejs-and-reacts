const mongoose = require("mongoose");

const AdminSchema = new mongoose.model("Admin",{

    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String

    },address:{
        type:String
    },
    phone:{
        type:String
    }

});

module.exports = AdminSchema;