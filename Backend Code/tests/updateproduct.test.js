// use the path of your model
const Product = require('../models/customerModel');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://127.0.0.1:27017/gym_application';
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useUnifiedTopology : true
 });
});
afterAll(async () => {
 await mongoose.connection.close();
});
it('to test the update', async () => {
        return Product.findOneAndUpdate({_id :Object('6211f8c38f807d5bf78cfc9a')}, 
       {$set : {pname:'musclse builder powder'}})
 
 });


