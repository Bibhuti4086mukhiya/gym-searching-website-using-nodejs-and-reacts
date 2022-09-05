// use the path of your model
const Product = require('../models/productModel');
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
describe('Product Schema test anything', () => {
// the code below is for insert testing
 it('Add product testing anything', () => {
 const product = {
 'pname': 'Protein shake',
 'pdes': 'These protein shake recipes take your protein powder to the next level with the addition of healthy, delicious ingredients to help you reach your fitness goals!',
 'pquantity':'10',
 'pprice': '20000'
 };
 return Product.create(product)
 .then((pro_ret) => {
 expect(pro_ret.pname).toEqual('Protein shake');
 });
 });
// the code below is for delete testing
//  it('to test the delete product is working or not', async () => {
//  const status = await Product.deleteMany();
// });
// it('to test the update', async () => {
//     return Product.findOneAndUpdate({_id :Object('5d20c71c0da2982d681e4bf0')}, 
//    {$set : {pname:'ram'}})
//    });
   })