// use the path of your model
const Customer = require('../models/customerModel');
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
describe('Register Schema test anything', () => {
// the code below is for insert testing
 it('Register testing anything', () => {
 const customer = {
 'username': 'bibhuti',
 'password': 'nepal',
 'address':'kathmandu',
 
 };
 return Customer.create(customer)
 .then((pro_ret) => {
 expect(pro_ret.username).toEqual('bibhuti');
 expect(pro_ret.password).toEqual('nepal');
 });
 });

   })