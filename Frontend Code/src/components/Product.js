import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const Product = () => {
  const [prodata, setProdata] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("tok"),
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:9090/product/myproduct/", config)
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
      .delete("http://localhost:9090/delete/product/" + pid, config)
      .then()
      .catch();
  };

  return (
    <div className="container">
      <div className="row">
        <div className=" col-lg-12 bg-white h2 p-2 my-2 text-center shadow-sm fw-bold  text-dark fs-1">
         <Link className="text-decoration-none text-danger" to="/addproduct"> <FontAwesomeIcon className="text-primary" icon={faCirclePlus} /> Add Products</Link>
         
        </div>
        
      </div>
      <div className="row bg-light">
        {prodata.map((singleData) => {
          return (
            <div className="col-lg-3 col-md-6 col-sm-12 shadow-sm p-3 mb-3 bg-body rounded">
              <div class="card">
                <img
                  class="card-img-top"
                  src={"http://localhost:9090/" + singleData.pimage}
                />
                <div class="card-body">
                  <h5 class="card-title fw-bold">{singleData.pname}</h5>

                  <div className="row my-2">
                    <Link
                      class="btn btn-primary fs-5"
                      to={"/single/" + singleData._id}
                    >
                      Details
                    </Link>
                    <Link
                      class="btn btn-danger mt-2 fs-5"
                      to={"/single/" + singleData._id}
                    >
                      Buy Now
                    </Link>
                    <button
                      class="btn btn-success mt-2 fs-5"
                      onClick={() => deleteProduct(singleData._id)}
                    >
                      Delete
                    </button>

                    <Link
                      class="btn btn-warning mt-2 fs-5"
                      to={"/updateproduct/" + singleData._id}
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
};

export default Product;
