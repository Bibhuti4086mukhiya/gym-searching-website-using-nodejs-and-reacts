import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const Vlog = () => {
  const [prodata, setProdata] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("tok"),
    },
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  useEffect(() => {
    axios
      .get("http://localhost:9090/vlog/myvlog/", config)
      .then((result) => {
        console.log(result.data);
        setProdata(result.data);
      })
      .catch((e) => {
        console.log("something went wrong");
      });
  }, [prodata]);

  const deleteProduct = (pid) => {
    // console.log(pid)
    axios
      .delete("http://localhost:9090/delete/vlog/" + pid, config)
      .then()
      .catch();
  };

  var menu;
  if (localStorage.getItem("tok")) {
    if (localStorage.getItem("admin")) {
      menu = (
        <div className="container my-3">
          <div className="row">
            <div className=" col-lg-12 bg-white h2 p-2 my-2 text-center shadow-sm fw-bold  text-dark fs-1">
              <Link className="text-decoration-none text-dark" to="/addvlog">
                {" "}
                <FontAwesomeIcon  icon={faCirclePlus} /> Add Blogs
              </Link>
            </div>
          </div>
          <div className="row bg-body ">
            {prodata.map((singleData) => {
              return (
                <div className="col-lg-3 col-md-6 col-sm-12 py-3 shadow-sm">
                  <div class="card shadow-lg">
                    <img
                      class="card-img-top border border-light"
                      src={"http://localhost:9090/" + singleData.vimage}
                    />
                    <div class="card-body">
                      <h5 class="card-title">{singleData.vtit}</h5>

                      <div className="row my-2">
                        <Link
                          class="btn btn-primary fs-5"
                          to={"/vlogreadmore/" + singleData._id}
                        >
                          {" "}
                          Read More
                        </Link>

                        {/* <Link class="btn btn-primary mt-2" to={"/single/" + singleData._id}>Buy Now</Link>*/}
                        <button
                          class="btn btn-danger fs-5 mt-2 "
                          onClick={() => deleteProduct(singleData._id)}
                        >
                          Delete
                        </button>

                        <Link
                          class="btn btn-warning fs-5 mt-2 bg-warning"
                          to={"/updatevlog/" + singleData._id}
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      var menu = (
        <div className="container">
          <div className="row">
            <div className=" col-lg-12 bg-white h2 p-2 my-2 text-center shadow-sm fw-bold  text-dark fs-1">
              <p> Blogs </p>
            </div>
          </div>
          <div className="row bg-body py-3">
            {prodata.map((singleData) => {
              return (
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="card mb-5 shadow-sm ">
                    <img
                      className="img-thumbnail"
                      src={"http://localhost:9090/" + singleData.vimage}
                    />
                    <div className="card-body">
                      <div className="card-title">
                        <h2>{singleData.vtit}</h2>
                      </div>
                      <div className="my-2">
                        <i class="fa fa-calendar">&nbsp;</i>{" "}
                        <Link className="text-decoration-none text-dark fs-5" to="">
                          {new Intl.DateTimeFormat("en-GB", {
                            month: "long",

                            day: "2-digit",

                            year: "numeric",
                          }).format(new Date(singleData.created))}
                        </Link>
                      </div>

                      <Link
                        to={"/vlogreadmore/" + singleData._id}
                        className="btn btn-outline-success  "
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  } else {
    var menu = (
      <nav class="navbar navbar-expand-lg navbar-light bg-primary">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/login">
            Good Life
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center">
              <li class="nav-item">
                <Link class="navbar-brand" to="/login">
                  Home
                </Link>
              </li>
            </ul>
            <div class="d-flex">
              <Link
                class="nav-link active text-warning"
                aria-current="page"
                to="/login"
              >
                Login
              </Link>
              <Link class="nav-link text-warning" to="/register">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <div className="container">
      <div className="row">{menu}</div>
    </div>
  );
};

export default Vlog;

// <div className="col-md-3">
//               <div class="card">
//                 <img
//                   class="card-img-top"
//                   src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
//                   alt="Card image cap"
//                 />
//                 <div class="card-body">
//                   <h5 class="card-title">{singleData.vtit}</h5>
//                   <p class="card-text">{singleData.vdes}</p>
//                   <div className="row my-2">
// <Link
//   class="btn btn-primary"
//   to={"/vlogreadmore/" + singleData._id}
// >
//   Read More
// </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
{
  /* <div className=" bg-warning">
              <div class="card card-group m-4">
                <img
                  src={"http://localhost:9090/" + singleData.vimage}
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">{singleData.vtit}</h5>

                  <Link
                    class="btn btn-primary"
                    to={"/vlogreadmore/" + singleData._id}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div> */
}
