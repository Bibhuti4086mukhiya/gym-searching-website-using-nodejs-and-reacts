const express = require("express");
const router= new express.Router();
const Vlog = require('../models/vlogModel')
const auth = require("../auth/auth");
const { route } = require("./gymsearchRoute");
const upload = require("../uploads/upload");



// vlog adding...

router.post('/vlog/add',auth.verifyCustomer,upload.single('pro_image'),function(req, res, next) {

    const cusId = req.CustomerInfo._id;
    const vtit = req.body.vtit;
    const vdes = req.body.vdes;
    const vimage = req.file.filename;
    
  
  
    const data  = new Vlog({
        vtit:vtit,
        vdes:vdes,
        vimage:vimage,
        cusId:cusId
    })
  
    data.save()
    .then(function(){
      res.json({msg:"ok",success:true})
          
      })
    });

  router.post("/upload/vlog",upload.single('ab_cd'),function(req,res){
      // console.log(req.file);
  if(File.file==undefined){
      return res.json({
          message:"only jpg / png allow"
      })
  }
  })


  router.get("/vlog/myvlog",auth.verifyCustomer,function (req,res) {

    Vlog.find()
    .then(function(result){
        res.json(result)
    })
    .catch(function () {
        res.json({msg:"something went wrong!"});
    })
    
});

router.get("/vlog/single/:pid",auth.verifyCustomer,function (req,res) {
    const pid= req.params.pid;
    Vlog.findOne({_id:pid})
    .then(function(result){
        res.json(result)
    })
    .catch(function () {
        res.json({msg:"something went wrong!"});
    })
    
});

router.put("/vlog/update",auth.verifyCustomer,upload.single('pro_image'),function (req,res) {
    
    console.log(req.file.filename)
    const pid =req.body.pid;
    const vtit =req.body.vtit;
    const vdes =req.body.vdes;
    const vimage=req.file.filename;
   
    // console.log(id)
    Vlog.updateOne({_id : pid},
        {vtit:vtit,vdes:vdes,vimage:vimage})
    .then(function(){
        res.json({msg:"update!"})
    })
    .catch(function(){
        res.json({msg:"FAIL TO UPDATE KEEP TRYING!"})
    });
});


router.get("/vlog/readmore/:pid",auth.verifyCustomer,function (req,res) {
    const pid= req.params.pid;
    Vlog.findById(pid)
    .populate('Comments.postedBy','username')
    .then(function(result){
        console.log(result)
        res.json(result)
    })
    .catch(function () {
        res.json({msg:"something went wrong!"});
    })
    
});


router.post("/comment", auth.verifyCustomer, (req, res) => {
    const comment = { Text: req.body.commentText, postedBy: req.CustomerInfo._id };
    Vlog.findByIdAndUpdate(req.body.blogId, {
      $push: { Comments: comment },
    })
      .then((docs) => {
        console.log("posted comment");
        res.json({ success: true, commentcount: docs.Comments.length });
      })
      .catch((e) => {
        res.json({ message: e, success: false });
      });
  });

  router.get("/allvlog",function(req,res){

    Vlog.find()
    .then((allvlog)=>{
        res.json({allvlog})
    })
    .catch(function(){
        res.json({msg:"not found "})
    })
});

router.delete("/delete/vlog/:id",auth.verifyCustomer,function(req,res){
    // const id = req.AdminInfo._id;\
    const pid = req.params.id;
  //   console.log(myid)
    Vlog.findByIdAndDelete(pid).then().catch();
  });

    
  module.exports = router;