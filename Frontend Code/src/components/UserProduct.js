import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserProduct = () => {
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
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className=" col-lg-12 bg-white h2 p-2 my-2 text-center shadow-sm fw-bold  text-dark fs-1">
          <p> Products </p>
        </div>
      </div>
      <div className="row bg-body">
        {prodata.map((singleData) => {
          return (
            <div className="col-lg-3 col-md-6 col-sm-12 py-3">
              <div class="">
                <img
                  class="card-img-top"
                  src={"http://localhost:9090/" + singleData.pimage}
                />
                <div class="card-body">
                  <h5 class="card-title">{singleData.pname}</h5>

                  <div className="row my-2">
                    <Link
                      class="btn btn-primary fs-5"
                      to={"/single/" + singleData._id}
                    >
                      Details
                    </Link>
                    <Link
                      class="btn btn-primary my-2 fs-5"
                      to={"/single/" + singleData._id}
                    >
                      Buy Now
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

export default UserProduct;
