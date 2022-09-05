import { useState } from "react";
import axios from "axios";
import { EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import TextEditor from './TextEditor'; //above made file
import draftToHtml from "draftjs-to-html";


import toast from "react-hot-toast";

const Addblog = () => {
  const [vtit, setVtit] = useState("");
  
  const [vimage, setVimage] = useState("");
  const [message, setMessage] = useState("");

  const [vdes, setVdes] = useState(''); //your contentField
const [editorState, setEditorState] = useState(EditorState.createEmpty());
const onEditorStateChange = (editorState) => {
   setEditorState(editorState);
   setVdes(draftToHtml(convertToRaw(editorState.getCurrentContent()))); //update your contentField state here
 }

  const addVlog123 = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tok"),
      },
    };

    // const pdata1212 = {
    //     pname,pdes,pprice,pquantity
    // }

    const pdata = new FormData();

    pdata.append("vtit", vtit);
    pdata.append("vdes", vdes);
    pdata.append("pro_image", vimage);

    axios
      .post("http://localhost:9090/vlog/add", pdata, config)
      .then((result12) => {
        if (result12.data.success) {
          // setMessage("Blog Added succsessfullly!!");
          toast.success("Add Blog Successfully");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="col-md-6  mx-auto bg-body rounded p-3 my-3 shadow">
        <h2 className="custom-heading-h2 text-center">ADD BLOG</h2>
        <hr />
        {/* <p>{message}</p> */}
        <form className="p-4">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={vtit}
              onChange={(e) => setVtit(e.target.value)}
            />
          </div>

          <div className="form-group border my-2">
            <label>Desciption</label>
            <textarea
              type="text"
              className="form-control"
              hidden
              value={vdes}
              onChange={(e) => setVdes(e.target.value)}
            /> <div className="editor">
            <TextEditor onEditorStateChange={onEditorStateChange} editorState={editorState} />
        </div>
          </div>

          <div className="form-group">
            <label>Blog Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => {
                setVimage(e.target.files[0]);
              }}
            />
          </div>

          <div className="text-center">
            <input
              type="submit"
              value="Add Blog"
              className="btn btn-success rounded-1 shadow mt-4"
              onClick={addVlog123}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Addblog;
