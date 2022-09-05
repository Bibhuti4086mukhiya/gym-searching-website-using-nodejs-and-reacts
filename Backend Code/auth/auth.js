const jwt = require("jsonwebtoken");
const Customerschema = require("../models/customerModel");

const AdminSchema = require("../models/adminModel");
module.exports.verifyCustomer = function(req,res,next){

    try{
    const token =  req.headers.authorization.split(" ")[1];
    //console.log(token)
    const data = jwt.verify(token, "anysecretkey");
    // console.log(data.cusId);
    Customerschema.findOne({_id:data.cusId})
    .then(function(result)
    {
        // console.log(result);
        req.CustomerInfo = result;
        next();
    })
    .catch(function(e){
        res.json({error:e})
    })
    } 
    catch(e){
        res.json({error:"invalid access! keep trying"})
    }
};
module.exports.verifyAdmin = function(req,res,next){

    try{
    const token =  req.headers.authorization.split(" ")[1];
    //console.log(token)
    const data = jwt.verify(token, "anysecretkey");
    // console.log(data.cusId);
    AdminSchema.findOne({_id:data.adminId})
    .then(function(result)
    {
        // console.log(result);
        req.AdminInfo = result;
        next();
    })
    .catch(function(e){
        res.json({error:e})
    })
    } 
    catch(e){
        res.json({error:"invalid access"})
    }
};

