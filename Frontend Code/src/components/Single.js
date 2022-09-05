import axios from "axios";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import DOMPurify from 'dompurify';


const Single = () => {
  const [singledata, setSingledata] = useState([]);

  const { pid } = useParams();

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("tok"),
    },
  };

  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
 }

  useEffect(() => {
    axios
      .get("http://localhost:9090/product/single/" + pid, config)
      .then((result) => {
        // console.log(result.data)
        setSingledata(result.data);
      })
      .catch();
  }, []);

  return (
    <div class="container">
      <div className="row py-3">
        <div class="pro-img-details col-md-6 shadow">
          <img className="w-100" src={'http://localhost:9090/'+singledata.pimage} alt="" />
        </div>

        <div class="col-md-6 bg-body">
              <h1 class="pro-d-title fw-bold">
              {singledata.pname}
              </h1>
              <p>
                 <strong className="fs-4 fw-bold">Desciption:</strong>
                 <p  class="card-text" dangerouslySetInnerHTML={createMarkup(singledata.pdes)}></p>
              </p>
              <div class="m-bot15 fs-4 fw-bold"> <strong>Price :{singledata.pprice} </strong></div>
              <div class="form-group fs-4 fw-bold">
                  <label>Quantity</label>
                  <input type="quantiy" placeholder="1" class="form-control quantity"/>
              </div>
              <p>
                  <button class="btn btn-round btn-danger mt-4" type="button"><i class="fa fa-shopping-cart w-70"></i>   Buy Now</button>
              </p>
              </div>

      </div>
    </div>
  );
};

export default Single;

{
  /* <div className="container">
      <div className="row">
        <p>image section here........</p>
        <h1>{singledata.pname}</h1>
        <p>Price : {singledata.pprice}</p>
        <p>{singledata.pdes}</p>
      </div>
    </div> */
}
