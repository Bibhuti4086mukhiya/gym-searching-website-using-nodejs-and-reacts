const express = require("express");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const CustomerSchema = require("../models/customerModel");

const auth = require("../auth/auth");

const AdminSchema = require("../models/adminModel");

const upload = require("../uploads/upload");



const router = new express.Router();



router.post("/customer/register",function(req,res){
    const username = req.body.username;
    CustomerSchema.findOne({username:"ram"}).then(function(custmerData){
        if (custmerData!= null){
            res.json({message:"username already exists!"})
            return;
        }
        //now it means we are ready for registerationconst
        const password = req.body.password
        bcryptjs.hash(password,10,function(e,hashed_pw){
            // const address = req.body.address;
            const email = req.body.email;
            const phone = req.body.phone;
            const cdata = new CustomerSchema({
                username:username,
                password:hashed_pw,
                email:email,
                phone:phone,
                // address:address   
            })
            cdata.save().then(function(){
                res.json({message:"Resgister Success!" ,success:true})
            })
            .catch(function(e){
                res.json
            })

        })
    })
});


// login route for customer 
router.post("/customer/login",function(req,res){
    const username = req.body.username;
    //selct* from customer where username = "admin"
    CustomerSchema.findOne({username:username})
    .then(function(customerData){
        // console.log(customerData);
        if (customerData==null){
            return res.json({message:"invalid in node js", success:false})
        }
        //need to check password
        const password = req.body.password;
        bcryptjs.compare(password,customerData.password,function(e,result){
            //true = correct pw false = incorrect pw
            if (result===false){
                return res.json({message:"Invalid", success:false})
            }
            //ticket generate = jsonwebtoken 
            const token =  jwt.sign({cusId:customerData._id},"anysecretkey")
            res.json({token:token, message:"success",username:username, success:true,'userid':customerData._id})
        })
    });
})

router.delete("/customer/delete",auth.verifyCustomer,function(req,res){
    res.json({'msg':req.CustomerInfo});
})

//profile update 

router.put("/customer/profile/update",auth.verifyCustomer,function(req,res){

//    console.log(req.CustomerInfo._id);
    const id= req.CustomerInfo._id;
    const phone = req.body.phone;
    const address =req.body.address;
    CustomerSchema.updateOne({_id:id},{phone:phone,address:address})
    .then(function(){
        res.json({msg:"update!"})
    })
    .catch(function(){
        res.json({msg:"try again!"})
    })
})

// customer delete by customer themselves
router.delete("/delete/by/customer/",auth.verifyCustomer,function(req,res){

    const id= req.CustomerInfo._id;
    CustomerSchema.findOneAndDelete(id)
    .then(function(){
        res.json({msg:"delete successfully"})
    })
    .catch(function(){
        res.json({msg:"not delete "})
    })
});

router.get("/alluser",function(req,res){
    CustomerSchema.find()
    .then((alluser)=>{
        res.json({alluser})
    })
    .catch(function(){
        res.json({msg:"not found"})
    })
});


//customer delete by admin
router.delete("/delete/by/admin/",auth.verifyAdmin,function(req,res){
    // const id = req.AdminInfo._id;
    const cid = req.body.id;
    AdminSchema.deleteOne({_id:cid})
    .then(function(){
        res.json({msg:"delete successfully"})
    })
    .catch(function(){
        res.json({msg:"not delete"})
    })
})

router.post('/upload',upload.single('img'),function(req,res){
    // console.log(req.file);
    if(File.file==undefined){
            return res.json({
                message:"only jpg / png allow"
            })
        }
})
module.exports = router;