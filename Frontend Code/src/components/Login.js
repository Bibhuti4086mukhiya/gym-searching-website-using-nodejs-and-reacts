import { useState } from "react";
import axios, { Axios } from "axios";
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");
  
  const customerLogin = (e) => {
    e.preventDefault(); // stop the default behaviour is refresh
    const cusData = {
      username,
      password,
    };
    axios.post("http://localhost:9090/customer/login", cusData)
    .then(result=>{
      if (result.data.token){
        localStorage.clear();
        if (result.data.username === 'admin') {
          // alert(result.data.username)
          localStorage.setItem('tok', result.data.token);
          localStorage.setItem('username', result.data.username);
          localStorage.setItem('admin', true);
          toast.success('Login Success as admin !!!!')
          window.location.replace('/admin')
        }

        else{
         
          localStorage.setItem('tok', result.data.token);
          localStorage.setItem('username', result.data.username);
          toast.success('Login Success as user !!!!')
          window.location.replace('/home')

        }
         
      }
      else{
        ///invalid 
        // setMessage("Failed To login! try again");
        toast.error('Invalid credentials!')

      }

    }).catch(e=>{
      console.log(e)
    });
  };

  return (
    <div>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-6 bg-white m-3 p-3 rounded-1 shadow px-5">
            <div className="form-block">
              <div className="text-center mb-5">
                <h3>
                  <strong>Login To Good Life</strong>
                 <hr/>
                  {/* <p>{message}</p> */}
                </h3>
              </div>
              
              <form action="#" className="p-3" method="post">
               
                <div className="form-group first">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Name"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group last mb-3 mt-3">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Your Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-5 mt-4 p-1 rounded bg-light border">
                  
                  <label className="control control--checkbox mb-3 mb-sm-0">
                    <span className="caption">Remember me</span>
                    <input type="checkbox" className="mx-3" checked="" />
                    <div className="control__indicator"></div>
                  </label>
                 
                  <span className="ml-auto float-end">
                    <a href="#" className="forgot-pass text-decoration-none" >
                      Forgot Password
                    </a>
                  </span>
                 
                 
                </div>
               <div className="text-center">
               <input
                  type="submit"
                  value="Log In"
                  className="btn btn-block btn-primary px-5"
                  onClick={customerLogin}
                />
               </div>
              </form>
          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
