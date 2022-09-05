import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBook,
  faDumbbell,
  faCartArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
// import {  } from '@fortawesome/free-brands-svg-icons';

const Admin = () => {
  const [user, setUser] = useState("");

  const [countuser, setcountuser] = useState(0);
  const [countgym, setcountgym] = useState(0);
  const [countproduct, setcountproduct] = useState(0);
  const [countblog, setcountblog] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:9090/alluser").then((result) => {
      setcountuser(result.data.alluser.length);
      setUser(result.data.alluser);
      console.log(result.data.alluser);

    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:9090/allgym").then((result) => {
      setcountgym(result.data.allgym.length);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:9090/allvlog").then((result) => {
      setcountblog(result.data.allvlog.length);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:9090/allproduct").then((result) => {
      setcountproduct(result.data.allproduct.length);
    });
  }, []);
  return (
    <div className="container">
      <div className="row my-2">
        <div className=" col-lg-12 bg-white h2 p-1 my-1 text-center shadow   text-primary fs-1">
          <p> Admin Dashboard</p>
        </div>
        <div class="container bg-body p-4">
          <div class="row g-2 text-center ">
            <div class="col-6">
              <Link className="text-decoration-none " to="/alluser">
                <div class="p-3 border bg-danger h2 rounded shadow-sm  text-white fw-bold">
                  <div>
                    <FontAwesomeIcon icon={faUser} /> User
                    <p className="py-2">Total User : {countuser}</p>
                  </div>
                </div>
              </Link>
            </div>
            <div class="col-6">
              <Link className="text-decoration-none fw-bold" to="/vlog">
                <div class="p-3 border bg-success h2 rounded  shadow-sm text-white fw-bold">
                  <div>
                    <FontAwesomeIcon icon={faBook} /> Blog
                    <p className="py-2">Total Blog : {countblog}</p>
                  </div>
                </div>
              </Link>
            </div>
            <div class="col-6">
              <Link className="text-decoration-none fw-bold" to="/home">
                <div class="p-3 border bg-warning h2 rounded shadow-sm  text-white fw-bold">
                  <FontAwesomeIcon icon={faDumbbell} /> Gym
                  <p>Total Gym : {countgym}</p>
                </div>
              </Link>
            </div>
            <div class="col-6">
              <Link className="text-decoration-none fw-bold" to="/myproduct">
                <div class="p-3 border bg-primary text-white h2 rounded shadow-sm fw-bold">
                  <FontAwesomeIcon icon={faCartArrowDown} /> Product
                  <p>Total Product : {countproduct}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
