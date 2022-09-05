import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket,faCircleUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const logout = () => {
    localStorage.clear();
    window.location.replace("/");
  };
  var menu;
  if (localStorage.getItem("tok")) {
    if (localStorage.getItem("admin")) {
      menu = (
        <nav class="navbar navbar-expand-lg navbar-light bg-dark shadow-lg ">
          <div class="container-fluid">
            <Link class="navbar-brand text-white fs-2 fw-bold" to="/admin">
              Admin Dashboard
            </Link>
          

            <button
              class="navbar-toggler "
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
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-start">
                {/* <li class="nav-item">
                  <Link class="navbar-brand text-white m-1" to="/">
                    Gym
                  </Link>
                </li>  */}
                {/* <li class="nav-item">
                  <Link class="navbar-brand text-white outline-primary" to="/addgym">
                    Add Gym
                  </Link>
                </li> */}
                {/* <li class="nav-item">
                  <Link class="navbar-brand text-white" to="/addvlog">
                    Add Blog
                  </Link>
                </li> */}
                {/* <li class="nav-item">
                  <Link class="navbar-brand text-white" to="/vlog">
                    Blog
                  </Link>
                </li> */}

                {/* <li class="nav-item">
                  <Link class="navbar-brand text-white" to="/addproduct">
                    Add Product
                  </Link>
                </li> */}
                {/* <li class="nav-item">
                  <Link class="navbar-brand text-white" to="/myproduct">
                    My products
                  </Link>
                </li> */}
              </ul>
              

              <div class="d-flex">
                
              <a className="text-white fs-5 p-1 me-2 text-decoration-none">
              <FontAwesomeIcon icon={faCircleUser} /> {localStorage.getItem("username")} 
                  </a>
                <button
                  type="button"
                  class="btn btn-warning px-4"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Logout"
                  onClick={logout}
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                </button>
              </div>
            </div>
          </div>
        </nav>
      );
    } else {
      var menu = (
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
          <div class="container-fluid ">
            <Link class="navbar-brand text-white fw-bold fs-4" to="/home">
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
                <li class="nav-item active">
                  <Link
                    class="navbar-brand  text-white border-none btn-outline-warning px-3 rounded text-uppercase "
                    to="/home"
                  >
                    Gym
                  </Link>
                </li>

                <li class="nav-item">
                  <Link
                    class="navbar-brand text-white border-none btn-outline-warning px-3 rounded text-uppercase"
                    to="/vlog"
                  >
                    Blog
                  </Link>
                </li>

                <li class="nav-item ">
                  <Link
                    class="navbar-brand text-white border-none btn-outline-warning px-3 rounded text-uppercase"
                    to="/userproduct"
                  >
                    Product
                  </Link>
                </li>
              </ul>

              <div class="d-flex">
              <a className="text-white fs-5 p-1 me-2 text-decoration-none">
              <FontAwesomeIcon icon={faCircleUser} /> {localStorage.getItem("username")} 
                  </a>
                <button
                  type="button"
                  class="btn btn-warning px-4"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Logout"
                  onClick={logout}
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                </button>
              </div>
            </div>
          </div>
        </nav>
      );
    }
  } else {
    var menu = (
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <div class="container-fluid">
          <Link class="navbar-brand text-white fw-bold" to="/login">
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
          <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center">
              <li class="nav-item">
                <Link class="navbar-brand text-white m-4" to="/">
                  Home
                </Link>
              </li>
            </ul>
            <div class="d-flex">
              <Link
                class="nav-link active text-white fs-5"
                aria-current="page"
                to="/"
              >
                Login
              </Link>
              <Link class="nav-link  text-white fs-5" to="/register">
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

export default Header;

/* <div className="container">
      <div className="row">
        <nav class="navbar navbar-dark bg-primary">
          <div class="container-fluid">{menu}</div>
        </nav>
      </div>
    </div> */

/* <div>
  <div>
    <Link class="navbar-brand" to="/login">
      Good Life
    </Link>
  </div>
  <div className="text-center">
    <Link class="navbar-brand" to="/login">
      Home
    </Link>
  </div>
  <div class="d-flex">
    <Link class="nav-link active text-warning" aria-current="page" to="/login">
      Login
    </Link>

    <Link class="nav-link text-warning" to="/register">
      Register
    </Link>
  </div>
</div>; */

// <div className="row">
//         <div className="col-2">
//           <Link class="navbar-brand" to="/">
//             Good Life
//           </Link>
//         </div>
//         <div className="col-7">
//           <Link class="navbar-brand" to="/">
//             Home
//           </Link>
//           <Link class="navbar-brand" to="/addgym">
//             Add Gym
//           </Link>
//           <Link class="navbar-brand" to="/addvlog">
//             Add Blog
//           </Link>
//           <Link class="navbar-brand" to="/vlog">
//             Blog
//           </Link>
//           <Link class="navbar-brand" to="/addproduct">
//             Add Product
//           </Link>
//           <Link class="navbar-brand" to="/myproduct">
//             My products
//           </Link>
//         </div>
//         <div className="offset-5 text-center">
//           <button type="button" class="btn btn-primary" onClick={logout}>
//             Log Out
//           </button>
//         </div>
//       </div>
