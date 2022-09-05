import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { EditorState, convertToRaw,ContentState,
  convertFromHTML, } from "draft-js";
import "draft-js/dist/Draft.css";
import TextEditor from "./TextEditor"; //above made file
import draftToHtml from "draftjs-to-html";
import toast from "react-hot-toast";


const Updategym = () => {
  const { pid } = useParams();
  const [prodata, setProdata] = useState([]);
  const [gymname, setGymname] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [gimage, setGimage] = useState("");
  const [dimage, setDimage] = useState("");

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDescription(draftToHtml(convertToRaw(editorState.getCurrentContent()))); //update your contentField state here
  };

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("tok"),
    },
  };

  const onPimageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDimage(URL.createObjectURL(event.target.files[0]));

      setGimage(event.target.files[0]);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:9090/gym/single/" + pid, config)
      .then((result) => {
        console.log(result.data);
        setProdata(result.data);
        setGymname(result.data.gymname);
        setLocation(result.data.location);
        setPrice(result.data.price);
        setDescription(result.data.description);
        setGimage(result.data.gimage);
        setDimage("http://localhost:9090/" + result.data.gimage);

        const blocksFromHTML = convertFromHTML(result.data.description);
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(state));
      })
      .catch();
  }, []);

  const updateG = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tok"),
      },
    };
    // const pdata = {
    //   pid,
    //   gymname,description,price,location
    // };

    const pdata = new FormData();

    pdata.append("pid", pid);
    pdata.append("gymname", gymname);
    pdata.append("location", location);
    pdata.append("price", price);
    pdata.append("description", description);
    pdata.append("pro_image", gimage);

    axios
      .put("http://localhost:9090/gym/update", pdata, config)
      .then((result) => {
        console.log(result.data);
        // alert("updated",pdata)
        toast.success("Updated successfully !");
      })
      .catch();
  };

  return (
    <>
      <div className="col-md-6 mx-auto bg-body rounded p-3 my-3 shadow">
        <h2 className="custom-heading-h2 text-center">UPDATE GYM</h2>
        <hr />
        {/* <p>{message}</p> */}
        <form className="p-4">
          <div className="form-group">
            <label>Name of Gym</label>
            <input
              type="text"
              className="form-control"
              value={gymname}
              onChange={(e) => setGymname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group border my-2">
            <label>Desciption</label>
            <textarea
              type="text"
              className="form-control"
              hidden
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="editor">
              <TextEditor
                onEditorStateChange={onEditorStateChange}
                editorState={editorState}
               
              />
            </div>
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <img src={dimage} className="img-fluid" alt="pp" />
            <input
              type="file"
              className="form-control"
              onChange={onPimageChange}
              accept="image/*"
              name="pro-image"
            />
          </div>

          <div className="text-center">
            <input
              type="submit"
              value="Save"
              className="btn btn-success rounded-1 shadow mt-4"
              onClick={updateG}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Updategym;
