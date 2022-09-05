const express = require("express");

const router= new express.Router();

const Product = require('../models/productModel')
const auth = require("../auth/auth");
const { route, patch, options } = require("./gymsearchRoute");

const upload = require("../uploads/upload");
 
// inserting product

router.post('/product/add',auth.verifyCustomer,upload.single('pro_image'),function(req, res, next) {

  const cusId = req.CustomerInfo._id;
  const pname = req.body.pname;
  const pdes = req.body.pdes;
  const pprice = req.body.pprice;
  const pquantity = req.body.pquantity;
  const pimage = req.file.filename;

  const data  = new Product({
      pname:pname,
      pdes:pdes,
      pprice:pprice,
      pquantity:pquantity,
      pimage:pimage,
      cusId:cusId
  })

  data.save()
  .then(function(){
    res.json({msg:"ok",success:true})
        
    }).catch(function () {
        res.json({msg:"something went wrong!"});
    });
  });

router.post('/upload/product',upload.single('pro_image'),function(req,res){
  // console.log(req.file);
  if(File.file==undefined){
          return res.json({
              message:"only jpg / png allow"
          })
      }
})

// to show own products

router.get("/product/myproduct",auth.verifyCustomer,function (req,res) {

    Product.find()
    .then(function(result){
        res.json(result)
    })
    .catch(function () {
        res.json({msg:"something went wrong!"});
    })
    
});

///to show single products

router.get("/product/single/:pid",auth.verifyCustomer,function (req,res) {
    const pid= req.params.pid;
    Product.findOne({_id:pid})
    .then(function(result){
        res.json(result)
    })
    .catch(function () {
        res.json({msg:"something went wrong!"});
    })
    
});

// update products 
router.put("/product/update",auth.verifyCustomer,upload.single('pro_image'),function (req,res) {

    const pid =req.body.pid;
    const pname =req.body.pname;
    const pdes =req.body.pdes;
    const pprice =req.body.pprice;
    const pquantity =req.body.pquantity;
    const pimage=req.file.filename;
    
    // console.log(id)
    Product.updateOne({_id : pid},
        {pname:pname,pdes:pdes,pprice:pprice,pquantity:pquantity,pimage:pimage})
    .then(function(){
        res.json({msg:"update!"})
    })
    .catch(function(){
        res.json({msg:"FAIL TO UPDATE KEEP TRYING!"})
    });
});


// delete products 

router.delete("/delete/product/:id",auth.verifyCustomer,function(req,res){
  // const id = req.AdminInfo._id;\
  const pid = req.params.id;
//   console.log(myid)
  Product.findByIdAndDelete(pid).then().catch();
});

router.get("/allproduct",function(req,res){
    Product.find()
    .then((allproduct)=>{
        res.json({allproduct})
    })
    .catch(function(){
        res.json({msg:"not found "})
    })
});


module.exports = router;