//Importing libraries
const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const Gym = require("../models/gymsearchModel");
const upload = require("../uploads/upload");

// adding gyms
// router.post("/gymsearch/add", auth.verifyCustomer,upload.single('pro_image'),function(req,res){
//     const gymname = req.body.gymname;

//         //now it means we are ready for registerationconst

//         // bcryptjs.hash(password,10,function(e,hashed_pw){
//         const description = req.body.description;
//         const cusId = req.CustomerInfo._id;
//         const location = req.body.location;
//         const price = req.body.price;
//         const gimage = req.file.filename;
//         const cdata = new Gym({
//                 gymname:gymname,
//                 location:location,
//                 price:price,
//                 description:description,
//                 gimage:gimage,
//                 cusId:cusId
//             })
//         cdata.save().then(function(){
//             res.json({message:"Added Successfully!",success:true})
//         })
//         .catch(function(e){
//             res.json({e})
//         })

//         // })
//     })
// ;

router.post(
  "/gym/add",

  upload.single("thumbnail"),
  function (req, res) {
    // console.log(camera);
    const gymname = req.body.gymname;
    //now it means we are ready for registerationconst
    // bcryptjs.hash(password,10,function(e,hashed_pw){
    const description = req.body.description;

    const location = req.body.location;
    const phone = req.body.phone;
    const price = req.body.price;
    const gimage = req.file.filename;
    const cdata = new Gym({
      gymname: gymname,
      location: location,
      price: price,
      description: description,
      phone: phone,
      gimage: gimage,
    });
    cdata
      .save()
      .then(function () {
        res.json({ message: "Added Successfully!", success: true });
      })
      .catch(function (e) {
        res.json({ e });
      });
  }
);

// router.post("/gym/applied", auth.verifyCustomer, function (req, res) {
//   const username = req.body.username;
//   //now it means we are ready for registerationconst
//   // bcryptjs.hash(password,10,function(e,hashed_pw){

//   const cusId = req.CustomerInfo._id;
//   const location = req.body.location;
//   const phone = req.body.phone;
//   const price = req.body.price;
//   // const gimage = req.file.filename;
//   const cdata = new Gym({
//     gymname: gymname,
//     location: location,

//     phone: phone,
//     cusId: cusId,
//   });
//   cdata
//     .save()
//     .then(function () {
//       res.json({ message: "Successfully Applied", success: true });
//     })
//     .catch(function (e) {
//       res.json({ e });
//     });
// });

router.get("/gym/mygym", function (req, res) {
  const { q } = req.query;
  console.log(q);

  const search = (data) => {
    return data.filter((item) => item["location"].toLowerCase().includes(q));
  };

  Gym.find()
    .then(function (result) {
      console.log(result);
      q ? res.json(search(result)) : res.json(result);
    })
    .catch(function (err) {
      res.json({ message: err });
    });
});

router.get("/gym/single/:pid", auth.verifyCustomer, function (req, res) {
  const pid = req.params.pid;
  Gym.findOne({ _id: pid })
    .then(function (result) {
      res.json(result);
    })
    .catch(function () {
      res.json({ msg: "something went wrong!" });
    });
});

router.put("/gym/updatepost", upload.single("thumbnail"), function (req, res) {
  // console.log('')
  const pid = req.body.pid;
  const gymname = req.body.gymname;
  const location = req.body.location;
  const price = req.body.price;
  const description = req.body.description;
  const phone = req.body.phone;
  const gimage = req.file.filename;

  console.log(req.body);
  Gym.findOneAndUpdate(
    { _id: pid },
    {
      gymname: gymname,
      location: location,
      price: price,
      description: description,
      phone: phone,
      gimage: gimage,
    }
  )
    .then(function (D) {
      console.log(D);
      res.json({ msg: "update!", success: true });
    })
    .catch(function (e) {
      console.log(e);
      res.json({ msg: e, success: false });
    });
});

router.delete("/delete/gym/:id", auth.verifyCustomer, function (req, res) {
  // const id = req.AdminInfo._id;\

  const pid = req.params.id;
  //   console.log(myid)
  Gym.findByIdAndDelete(pid, function (err, docs) {
    if (!err) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

router.get("/allgym", function (req, res) {
  console.log("hitted");
  Gym.find()
    .then((allgym) => {
      res.json({ allgym });
    })
    .catch(function () {
      res.json({ msg: "not found " });
    });
});

router.post("/gym/join", auth.verifyCustomer, function (req, res) {
  console.log("kkkkk");
  const gymname = req.body.gymname;
  const user = req.CustomerInfo._id;

  Gym.findByIdAndUpdate(gymname, {
    $push: { joineduser: user },
  })
    .then((docs) => {
      console.log("joined gym");
      res.json({ success: true });
    })
    .catch((e) => {
      res.json({ message: e, success: false });
    });
});
router.post("/gym/left", auth.verifyCustomer, function (req, res) {
  console.log("kkkkk");
  const gymname = req.body.gymname;
  const user = req.CustomerInfo._id;

  Gym.findByIdAndUpdate(gymname, {
    $pull: { joineduser: user },
  })
    .then((docs) => {
      console.log("left gym");
      res.json({ success: true });
    })
    .catch((e) => {
      res.json({ message: e, success: false });
    });
});

router.post("/comment", auth.verifyCustomer, (req, res) => {
  const comment = {
    Text: req.body.commentText,
    postedBy: req.CustomerInfo._id,
  };
  Gym.findByIdAndUpdate(req.body.gymId, {
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

router.get("/search/:query", (req, res) => {
  console.log("Hitted");
  gquery = req.params.query;
  const regex = new RegExp(escapeRegex(gquery), "gi");

  Gym.find(
    { $or: [{ gymname: regex }, { location: regex }, { description: regex }] },

    (err, docs) => {
      res.json({ data: docs, success: true });
    }
  );
});

// for search and Prevention for DDos Attack

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
