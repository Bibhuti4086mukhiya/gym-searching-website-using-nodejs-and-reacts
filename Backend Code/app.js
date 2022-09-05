const express = require("express")

const app = express();

// now product-image is publicly acceesible
app.use(express.static(__dirname+'/images'));///here product-image is floder nmae

const cors= require("cors");
app.use(cors());



app.use(express.json());

app.use(express.urlencoded({extended:true}));
require("./database/db");

const adminRoute= require("./routes/adminRoute");
app.use(adminRoute);


const gymSearchRoute = require('./routes/gymsearchRoute');
app.use(gymSearchRoute);

const productRoute = require('./routes/productRoute');
app.use(productRoute);

const vlogRoute = require('./routes/vlogRoute');
app.use(vlogRoute);

app.listen("90");



