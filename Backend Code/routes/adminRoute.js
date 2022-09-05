const express = require("express");

const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

const auth = require("../auth/auth");

const AdminSchema = require("../models/adminModel");


const router = new express.Router();

router.post("/admin/register",function(req,res){
    const username = req.body.username;
    AdminSchema.findOne({username:"ram"}).then(function(adminData){
        if (adminData!= null){
            res.json({message:"username already exists!"})
            return;
        }
        //now it means we are ready for registerationconst
        const password = req.body.password
        bcryptjs.hash(password,10,function(e,hashed_pw){
            const address = req.body.address;
            const email = req.body.email;
            const phone = req.body.phone;
            const adata = new AdminSchema({
                username:username,
                password:hashed_pw,
                email:email,
                phone:phone,
                address:address
            })
            adata.save().then(function(){
                res.json({message:"Resgister Success!"})
            })
            .catch(function(e){
                res.json
            })

        })
    })
});


// login route for admin
router.post("/admin/login",function(req,res){
    const username = req.body.username;
    //selct* from admin where username = "admin"
    AdminSchema.findOne({username:username})
    .then(function(adminData){
        // console.log(customerData);
        if (adminData==null){
            return res.json({message:"invalid"})
        }
        //need to check password
        const password = req.body.password;
        bcryptjs.compare(password,adminData.password,function(e,result){
            //true = correct pw false = incorrect pw
            if (result===false){
                return res.json({message:"Invalid"})
            }
            //ticket generate = jsonwebtoken 
            const token =  jwt.sign({adminId:adminData._id},"anysecretkey")
            res.json({token:token,message:"success"})
        })
    });
})


router.delete("/admin/delete",auth.verifyAdmin,function(req,res){
    res.json({'msg':req.AdminInfo});
})

//profile update 

router.put("/admin/profile/update",auth.verifyAdmin,function(req,res){
    // console.log(req.AdminInfo._id);

    const id= req.AdminInfo._id;
    const phone = req.body.phone;
    const address =req.body.address;
    AdminSchema.updateOne({id:id},{phone:phone,address:address})
    .then(function(){
        res.json({msg:"update!"})
    })
    .catch(function(){
        res.json({msg:"try again!"})
    })
})

// admin delete by admin themselves

router.delete("/delete/by/admin/",auth.verifyAdmin,function(req,res){

    const id= req.AdminInfo._id;
    AdminSchema.findOneAndDelete(id)
    .then(function(){
        res.json({msg:"delete successfully"})
    })
    .catch(function(){
        res.json({msg:"not delete "})
    })
});


// router.post("/news/upload",upload.single('ab_cd'),function(req,res){
//     // console.log(req.file);
// if(File.file==undefined){
//     return res.json({
//         message:"only jpg / png allow"
//     })
// }
// })


module.exports = router;