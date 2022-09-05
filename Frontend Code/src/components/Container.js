
import {Route,Routes} from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Vlog from "./Vlog";
import AddProduct from './Addproducts';
import Product from './Product';
import Single from './Single';
import Vlogreadmore from './Vlogreadmore';
import Update from './Update';
import Addblog from './Addblog';
import Addgym from './Addgym';
import Gymdetail from './Gymdetail';
import Admin from './Admin';
import Updatevlog from './Updatevlog';
import Updategym from './Updategym';
import UserProduct from './UserProduct';
import Alluser from './Alluser';

const Container= ()=>{
    return(
        <Routes >
        <Route path='/home' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
         <Route path='/' element={<Login />}></Route>
         <Route path='/vlog' element={<Vlog />}></Route>
         <Route path='/addproduct' element={<AddProduct />}></Route>
         <Route path='/myproduct' element={<Product />}></Route>
         <Route path='/single/:pid' element={<Single/>} />
         <Route path='/vlogreadmore/:pid' element={<Vlogreadmore/>} />
         <Route path='/updateproduct/:pid' element={<Update/>} />
         <Route path='/addvlog' element={<Addblog/>} />
         <Route path='/addgym' element={<Addgym/>} />
         <Route path='/gymdetail/:pid' element={<Gymdetail/>} />
         <Route path='/admin' element={<Admin/>} />
         <Route path='/updatevlog/:pid' element={<Updatevlog/>} />
         <Route path='/updategym/:pid' element={<Updategym/>} />
         <Route path='/userproduct' element={<UserProduct/>} />
         <Route path='/alluser' element={<Alluser/>} />
      </Routes>
    )
  }
  
  export default Container;