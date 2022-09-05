import axios from "axios";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import DOMPurify from "dompurify";

const Gymdetail = () => {
  const { pid } = useParams();
  const [singledata, setSingledata] = useState([]);

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
      .get("http://localhost:9090/gym/single/" + pid, config)
      .then((result) => {
        // console.log(result.data)
        setSingledata(result.data);
      })
      .catch();
  }, []);

  return (
    <div class="container">
      <div className="row my-3">
        <div class="pro-img-details col-md-6 shadow">
          <img className="w-100 p-2" src={"http://localhost:9090/" + singledata.gimage} alt="" />
        </div>

        <div class="col-md-6 bg-body">
          <h1 class="pro-d-title fw-bold">{singledata.gymname}</h1>
          <p>
            <strong>Desciption:</strong>
            <p
              class="card-text"
              dangerouslySetInnerHTML={createMarkup(singledata.description)}
            ></p>
          </p>
          
          <p>
            <strong>Location:</strong>
            <p
              class="card-text"
            >{singledata.location}</p>
          </p>
          
          <p>
            <strong>Price:</strong>
            <p
              class="card-text"
            >{singledata.price}</p>
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default Gymdetail;

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
