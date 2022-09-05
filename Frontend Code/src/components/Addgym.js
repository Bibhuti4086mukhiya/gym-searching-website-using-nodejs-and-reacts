import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import TextEditor from "./TextEditor"; //above made file
import draftToHtml from "draftjs-to-html";

const Addgym = () => {
  const [gymname, setGymname] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState('');
  const [description, setDescription] = useState("");
  const [gimage, setGimage] = useState("");

  // const [tdes, setVdes] = useState(''); //your contentField
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDescription(draftToHtml(convertToRaw(editorState.getCurrentContent()))); //update your contentField state here
  };

  

  const addgym = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tok"),
      },
    };

    // const pdata1212 = {
    //    gymname,location,price
    // }

    const pdata = new FormData();

    pdata.append("gymname", gymname);
    pdata.append("location", location);
    pdata.append("pro_image", gimage);
    pdata.append("description", description);
    pdata.append("price", price);

    axios
      .post("http://localhost:9090/gymsearch/add", pdata, config)
      .then((result12) => {
        if (result12.data.success) {
          // setMessage("Gym Added succsessfullly!!");
          toast.success("Add Gym Successfully");
        } else{
          toast.error("Something went wrong");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="col-md-6 mx-auto bg-body rounded p-3 my-3 shadow">
        <h2 className="custom-heading-h2 text-center">ADD GYM</h2>
        <hr />
        <p>{message}</p>
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
            />{" "}
            <div className="editor">
              <TextEditor
                onEditorStateChange={onEditorStateChange}
                editorState={editorState}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Gym Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => {
                setGimage(e.target.files[0]);
              }}
            />
          </div>

          <div className="text-center">
            <input
              type="submit"
              value="Add Gym"
              className="btn btn-success rounded-1 shadow mt-4"
              onClick={addgym}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Addgym;
