import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import DOMPurify from "dompurify";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser} from '@fortawesome/free-solid-svg-icons';

const Vlogreadmore = () => {
  const [singledata, setSingledata] = useState([]);
  const { pid } = useParams();
  const [commentText, setCommentText] = useState("");
  const [Commentcount, setCommentcount] = useState(0);
  const [comments, setComments] = useState([]);

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
    fetchedData();

    axios
      .get("http://localhost:9090/vlog/readmore/" + pid, config)
      .then((result) => {
        // console.log(result.data)
        setSingledata(result.data);
        
        
      })
      .catch()

  }, []);

  const fetchedData = () => {
    axios.get("http://localhost:9090/vlog/readmore/" + pid,config).then((result) => {
      console.log(result.data);
      console.log('WDOWOD');
      setComments(result.data.Comments);
      setCommentcount(result.data.Comments.length);
    });
  };
  
  const commentPost = (e, pid) => {
    e.preventDefault();
    if (commentText == "") {
      toast.error("write something..", { position: "top-left" });
      return;
    }
    const blogId = pid;
    console.log(blogId);
    const data = {
      blogId,
      commentText,
    };
    axios.post("http://localhost:9090/comment/", data, config).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        toast.success("Comment Posted.", { position: "top-left" });
        setCommentText("");
        // setCommentcount(res.data.commentcount + 1);
        fetchedData();
      } else {
        toast.error("Error while posting.", { position: "center" });
      }
    });
  };

  return (
    <div className="container">
      <div className="row my-2">
        <div class="col-lg-9">
          <div class="panel panel-default">
            <div class="panel-body">
              <div class="page-header">
                <hr />
                <h3 className="p-2 m-3 fw-bold bg-warning text-center">
                  {singledata.vtit}
                </h3>
                <hr />
              </div>
              <div className="text-center">
                <img
                  className="w-50 shadow my-3"
                  src={"http://localhost:9090/" + singledata.vimage}
                  alt=""
                />
              </div>
            </div>
            <p
              class="card-text"
              dangerouslySetInnerHTML={createMarkup(singledata.vdes)}
            ></p>
          </div>
          <div>
            <br />
            <hr />
            <textarea
              class="form-control"
              placeholder="write a comment..."
              rows="3"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <br />
            <button
              type="button"
              class="btn btn-info pull-right"
              onClick={(e) => commentPost(e, singledata._id)}
            >
              Post
            </button>
          </div>
          <div class="my-4">
            {comments.map((comment) => (
              <div class="d-flex flex-row p-3">
                <div class="w-100">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex flex-row align-items-center">
                      <span class="mr-2"></span>
                    </div>
                  </div>
                  <p class="fs-5 text-dark"> <FontAwesomeIcon className="mx-2" icon={faCircleUser} />{comment.postedBy.username}</p>
                  <p class="fs-6 text-dark m-2">{comment.Text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div class="col-lg-3 mt-4 text-center">
          <h3>relate news</h3>
          <div class="card bg-dark text-white">
            <img
              src="https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              class="card-img"
              alt="..."
            />
            <div class="card-img-overlay">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p class="card-text">Last updated 3 mins ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vlogreadmore;

/* <div className="container">
      <div className="row">
        <p>image section here........</p>
        <h1>{singledata.pname}</h1>
        <p>Price : {singledata.pprice}</p>
        <p>{singledata.pdes}</p>
      </div>
    </div> */
