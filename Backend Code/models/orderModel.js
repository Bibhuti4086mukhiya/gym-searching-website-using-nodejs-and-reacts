const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:[true, 'order belong to product']
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required:[true, 'order belong to customer']

    },address:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    paid:{
        type:Boolean,
        default:true
    }

});

module.exports = mongoose.model("Order",OrderSchema);