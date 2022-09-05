import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
// import {  } from '@fortawesome/free-brands-svg-icons';

const Admin = () => {

  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9090/alluser").then((result) => {

      console.log(result.data.alluser)

      setUser(result.data.alluser);
    });
  }, []);

  return (
    <div className="container">
      <div className="row my-2">
        <div className=" col-lg-12 bg-white h2 p-1 my-1 text-center shadow   text-primary fs-1"> 
          <p>All User</p>
        </div>
       
        <table class="table table-hover table-bordered bg-body p-5 ">
          <thead>
            <tr>
              <th class="col-md-5 col-xs-5">Username</th>
              <th class="col-md-4 col-xs-4">Email</th>
              <th class="col-md-3 col-xs-3">Address</th>
              <th class="col-md-3 col-xs-3">Number</th>
            </tr>
            <tr class="warning no-result">
              <td colspan="4">
                <i class="fa fa-warning"></i> No result
              </td>
            </tr>
          </thead>

          <tbody>
                {user.map((singleData) => {
                  return (
                    <tr>
                        <td>{singleData.username}</td>
                        <td>{singleData.email}</td>
                        <td>{singleData.address}</td>
                        <td>{singleData.phone}</td>
                    </tr>
                    
                  );
                })}
              </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
