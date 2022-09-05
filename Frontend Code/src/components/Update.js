import { useParams } from "react-router-dom" ;
import { useEffect, useState } from "react";
import { EditorState, convertToRaw,ContentState,
  convertFromHTML, } from "draft-js";
import toast from 'react-hot-toast';

import TextEditor from "./TextEditor"; //above made file
import draftToHtml from "draftjs-to-html";
import axios from "axios";
 
const Update = () => {
  const { pid } = useParams();
  const [prodata, setProdata] = useState([]);
  const [pname, setPname] = useState('');
  const [pdes, setPdes] = useState('');
  const [pprice, setPprice] = useState('');
  const [pquantity, setPquantity] = useState('');
  const [pimage, setPimage] = useState('');
  const [dimage, setDimage] =useState('');
  
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setPdes(draftToHtml(convertToRaw(editorState.getCurrentContent()))); //update your contentField state here
  };



  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("tok")
    },
  };

  const onPimageChange = (event) => {

    if (event.target.files && event.target.files[0]) {

        setDimage(URL.createObjectURL(event.target.files[0]));

        setPimage(event.target.files[0]);

    }

   }

  useEffect(() => {
    axios
      .get("http://localhost:9090/product/single/"+pid, config)
      .then(result => {
        console.log(result.data);
        setProdata(result.data);
        setPname(result.data.pname);
        setPdes(result.data.pdes);
        setPprice(result.data.pprice);
        setPquantity(result.data.pquantity);
        setPimage(result.data.pimage)
        setDimage("http://localhost:9090/"+result.data.pimage)
       
        const blocksFromHTML = convertFromHTML(result.data.pdes);
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(state));



      })
      .catch();
  }, []);

  const updateProduct = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tok")
      },
    };
    // const pdata = {
    //   pid,
    //   pname,
    //   pdes,
    //   pprice,pquantity
    // };

    const pdata = new FormData();
        pdata.append('pid', pid);
        pdata.append('pname', pname);
        pdata.append('pprice', pprice);
        pdata.append('pquantity', pquantity);
        pdata.append('pdes', pdes);
        pdata.append('pro_image', pimage);
      


    axios
      .put("http://localhost:9090/product/update", pdata, config)
      .then(result => {
        console.log(result.data);
        // alert("updated",pdata)
        toast.success('Updated successfully !')

      })
      .catch();
  };

  return (
    <div className="col-md-6  mx-auto bg-body rounded p-3 my-3 shadow">
                    <h2 className="custom-heading-h2 text-center p-4">UPDATE PRODUCT</h2>
                   <hr/>
                    {/* <p>{message}</p> */}
                    <form className="p-4">
                        <div className="form-group">
                            <label>Product Name</label>
                            <input type="text" className="form-control"
                            value={pname}
                            onChange={(e)=>setPname(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Product Price</label>
                            <input type="text" className="form-control"
                            value={pprice}
                            onChange={(e)=>setPprice(e.target.value)}
                            />
                        </div>

                        <div className="form-group border my-2">
            <label>Desciption</label>
            <textarea
              type="text"
              className="form-control"
              hidden
              value={pdes}
              onChange={(e) => setPdes(e.target.value)}
            />
            <div className="editor">
              <TextEditor
                onEditorStateChange={onEditorStateChange}
                editorState={editorState}
               
              />
            </div>
          </div>

                        <div className="form-group">
                            <label>Product Quantity</label>
                            
                            <input type="text" className="form-control"
                            value={pquantity}
                            onChange={(e)=>setPquantity(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                          <label>Product Image</label>
                          <img src={dimage} className="img-fluid" alt="pp" />
                          <input type="file" 
                         
                          className="form-control"
                          onChange={onPimageChange} accept='image/*'
                          name="pro-image"
                          />
                      </div>

                        <div className="text-center">
                        <input type="submit" value="Save" className="btn btn-dark rounded-1 shadow mt-4" 
                        onClick={updateProduct}
                        />
                        </div>
                    </form>
                </div>
  );
};

export default Update;
