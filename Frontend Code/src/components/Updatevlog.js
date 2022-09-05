import { useParams } from "react-router-dom" ;
import { useEffect, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { EditorState, convertToRaw,ContentState,
  convertFromHTML, } from "draft-js";
import TextEditor from "./TextEditor"; //above made file
import draftToHtml from "draftjs-to-html";

const Updatevlog = () => {
  const { pid } = useParams();
  const [prodata, setProdata] = useState([]);
  const [vtit, setVtit] = useState('');
  const [vdes, setVdes] = useState('');
  const [vimage, setVimage] = useState('');
  const [dimage, setDimage] =useState('');

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setVdes(draftToHtml(convertToRaw(editorState.getCurrentContent()))); //update your contentField state here
  };


  
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("tok")
    },
  };

  const onVimageChange = (event) => {

    if (event.target.files && event.target.files[0]) {

        setDimage(URL.createObjectURL(event.target.files[0]));

        setVimage(event.target.files[0]);

    }

   }

  useEffect(() => {
    axios
      .get("http://localhost:9090/vlog/single/"+pid, config)
      .then(result => {
        console.log(result.data);
        setProdata(result.data);
        setVtit(result.data.vtit);
        setVdes(result.data.vdes);
        setVimage(result.data.vimage)
        setDimage("http://localhost:9090/"+result.data.vimage)

        const blocksFromHTML = convertFromHTML(result.data.vdes);
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(state));

      })
      .catch();
  }, []);

  const updateV = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tok")
      },
    };
    // const pdata = {
    //   pid,
    //   vtit,
    //   vdes,
    //   vimage
    
    // };

    const pdata = new FormData();
        pdata.append('pid',pid)
        pdata.append('vtit', vtit);
        pdata.append('vdes', vdes);
        pdata.append('pro_image', vimage);
        
      


    axios
      .put("http://localhost:9090/vlog/update", pdata, config)
      .then(result => {
        console.log(result.data);
        // alert("updated",pdata)
        toast.success('Updated successfully !')

      })
      .catch();
  };

  return (
    <>
      <div className="col-md-6  mx-auto bg-body rounded p-3 my-3 shadow">
        <h2 className="custom-heading-h2 text-center">UPDATE BLOG</h2>
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
<div>
          <label>Desciption</label>
            <textarea
              type="text"
              className="form-control"
              hidden
              value={vdes}
              onChange={(e) => setVdes(e.target.value)}
            />
            <div className="editor">
              <TextEditor
                onEditorStateChange={onEditorStateChange}
                editorState={editorState}
               
              />
            </div>
          </div>

          <div className="form-group">
            <label>Blog Image</label>
            <img src={dimage} className="img-fluid" alt="pp" />

            <input
              type="file"
              className="form-control"
              onChange={onVimageChange} accept='image/*'
              name="pro-image"
              // onChange={(e) => {
              //   setVimage(e.target.files[0]);
              // }}
            />
          </div>

          <div className="text-center">
            <input
              type="submit"
              value="Save"
              className="btn btn-success rounded-1 shadow mt-4"
              onClick={updateV}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Updatevlog;
