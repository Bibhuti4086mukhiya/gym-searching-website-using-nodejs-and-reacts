import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [prodata, setProdata] = useState([]);
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState('');

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("tok"),
    },
  };

  // useEffect(() => {
    // axios
    //   .get("http://localhost:9090/gym/mygym/")
    //   .then((result) => {
    //     // console.log(result.data);
    //     setProdata(result.data);
    //   })
  //     .catch((e) => {
  //       console.log("something went wrong");
  //     });
  // }, []);

 

  useEffect(() => {
    const fetchData = async () => {
          axios
      .get(`http://localhost:9090/gym/mygym?q=${query}`)
      .then((result) => {
        console.log(result.data);
        setProdata(result.data);
      })
    };

      fetchData();
      
  if(prodata.length ===0){
    setMsg('Nodata')
  }
  }, [query],[prodata]);




  const deleteProduct=(pid)=>{
    // console.log(pid)
     axios.delete("http://localhost:9090/delete/gym/"+pid, config)
     .then()
     .catch()

     

 }
 var menu;
  if (localStorage.getItem('tok')) {
    if (localStorage.getItem('admin')) {

      menu = (
        <div className="container py-2">
          <div className="row">
        <div className=" col-lg-12 bg-white h2 p-2 my-2 text-center shadow-sm fw-bold  text-dark fs-1">
         <Link className="text-decoration-none text-dark" to="/addgym"> <FontAwesomeIcon icon={faCirclePlus} /> Add Products</Link>
         </div>
        </div>
        <div className="row bg-body p-4">
          <div className="mt-4">
            <div class="form-group pull-right">
              <input
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
                type="text"
                class="search form-control"
                placeholder="search you desitination?"
              />
            </div>
            <span class="counter pull-right"></span>
            <table class=" col-lg-4 col-md-6 col-sm-12 table table-hover table-bordered results">
              <thead>
                <tr>
               
                  <th class="col-md-5 col-xs-5">Gym Name</th>
                  <th class="col-md-4 col-xs-4">Place</th>
                  <th class="col-md-3 col-xs-3">Price</th>
                </tr>
                <tr class="warning no-result">
                  <td colspan="4">
                    <i class="fa fa-warning"></i> 
                  </td>
                </tr>
              </thead>
  
              <tbody>
                {(prodata)?(
                  <>


                
                {prodata.map((singleData) => {
                  return (
                    <tr>
                     
                       
                        <td> <Link  class="btn btn-outline-none" to={"/gymdetail/" + singleData._id}>{singleData.gymname}</Link></td>
                        <td>{singleData.location}</td>
                        <td>{singleData.price}</td>
                        <td> <button class="btn btn-primary" onClick={()=>deleteProduct(singleData._id)}>Delete</button></td>
                       <td> <Link class="btn btn-primary" to={"/updategym/"+singleData._id}>Edit</Link></td>
                       
                    </tr>
                    
                  );
                })}
                </>
                ):(
                  <h5>{msg}</h5>
                )}
              
              </tbody>
            </table>
          </div>
        </div>
      </div>
      );
    } else {
      var menu = (
        <div className="container my-2">
        <div className="row bg-body p-5">
          <div className="mt-4">
            <div class="form-group pull-right">
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                class="search form-control"
                placeholder="search you desitination?"
              />
            </div>
            <span class="counter pull-right"></span>
            <table class="table table-hover table-bordered results">
              <thead>
                <tr>
                 
                  <th class="col-md-5 col-xs-5">Gym Name</th>
                  <th class="col-md-4 col-xs-4">Place</th>
                  <th class="col-md-3 col-xs-3">Price</th>
                </tr>
                <tr class="warning no-result">
                  <td colspan="4">
                    <i class="fa fa-warning"></i> No result
                  </td>
                </tr>
              </thead>
  
              <tbody>
                {prodata.map((singleData) => {
                  return (
                    <tr>
                     
                       
                        <td> <Link  class="btn btn-outline-none" to={"/gymdetail/" + singleData._id}>{singleData.gymname}</Link></td>
                        <td>{singleData.location}</td>
                        <td>{singleData.price}</td>
                       
                       
                    </tr>
                    
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      );
    }
  // } else {
  //   var menu = (
  //   <nav class="navbar navbar-expand-lg navbar-light bg-primary">
  //     <div class="container-fluid">
  //       <Link class="navbar-brand" to="/login">
  //         Good Life
  //       </Link>
  //       <button
  //         class="navbar-toggler"
  //         type="button"
  //         data-bs-toggle="collapse"
  //         data-bs-target="#navbarSupportedContent"
  //         aria-controls="navbarSupportedContent"
  //         aria-expanded="false"
  //         aria-label="Toggle navigation"
  //       >
  //         <span class="navbar-toggler-icon"></span>
  //       </button>
  //       <div class="collapse navbar-collapse" id="navbarSupportedContent">
  //         <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center">
  //           <li class="nav-item">
  //             <Link class="navbar-brand" to="/login">
  //               Home
  //             </Link>
  //           </li>
  //         </ul>
  //         <div class="d-flex">
  //           <Link
  //             class="nav-link active text-warning"
  //             aria-current="page"
  //             to="/login"
  //           >
  //             Login
  //           </Link>
  //           <Link class="nav-link text-warning" to="/register">
  //             Register
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   </nav>
  //   )
  }
  return (
    <div className="container">
      <div className="row">{menu}</div>
    </div>
  );
};

export default Home;
