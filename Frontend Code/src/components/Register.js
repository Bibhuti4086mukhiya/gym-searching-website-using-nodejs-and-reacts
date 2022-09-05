import { useState } from "react";
import axios, { Axios } from "axios";
import toast from 'react-hot-toast';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const customerRegister = (e) => {
    e.preventDefault(); // stop the default behaviour is refresh
    const cusData = {
      username,
      email,
      password,
      phone,
      address,
    };
    if(!username || !password || !email){
      toast.error("plaese fill the form")
    }else{
      axios
      .post("http://localhost:9090/custmer/register", cusData)
      .then((result) => {
        if (result.data.success) {
          
          toast.success('Registered successfully !')
        } else {
          //not register
          // setMessage("Failed To Register! try again");
          toast.error('Something went wrong !!')
        }
      })
      .catch();

    }
  
    
  };
  return (
    <div>
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-6 bg-white rounded-1 shadow m-4 p-4">
            <div class="form-block">
              <div class="text-center">
                <h3 className="">
                  <strong className="fw-bold fs-2">Welcome To Good Life</strong>
                  <hr/>
                </h3>
                <p> {message}</p>
              </div>
              <form action="#" className="p-5" method="post">
                <div class="form-group first">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Your Name"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div class="form-group last mb-3 mt-3">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Your Password"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="form-group last mb-3 mt-3">
                  <label for="">Phone</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Your Phone"
                    id=""
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div class="form-group last mb-3 mt-3">
                  <label for="address">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Your Address"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div class="form-group last mb-3 mt-3">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Your Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="text-center">
                  <input
                    value="Register"
                    class="btn btn-block btn-outline-primary "
                    onClick={customerRegister}
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

export default Register;
