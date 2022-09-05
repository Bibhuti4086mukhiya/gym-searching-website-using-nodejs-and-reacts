import { useState } from "react";
import axios from "axios";
import { EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import TextEditor from "./TextEditor"; //above made file
import draftToHtml from "draftjs-to-html";
import toast from "react-hot-toast";


const Addproduct=()=>{
    const [pname, setPname] = useState('');
    const [pdes, setPdes] = useState('');
    const [pprice, setPprice] = useState('');
    const [pquantity, setPquantity] = useState('');  
    const [message, setMessage] = useState('');
    const [pimage, setPimage] = useState('');

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = (editorState) => {
      setEditorState(editorState);
      setPdes(draftToHtml(convertToRaw(editorState.getCurrentContent()))); //update your contentField state here
    };
    const addProduct123=(e)=>{
        e.preventDefault();
        const config= {
            headers :{
                Authorization : 'Bearer '+localStorage.getItem('tok')
            }
        }
      
        // const pdata1212 = {
        //     pname,pdes,pprice,pquantity
        // }


        const pdata = new FormData();

        pdata.append('pname', pname);
        pdata.append('pprice', pprice);
        pdata.append('pquantity', pquantity);
        pdata.append('pdes', pdes);
        pdata.append('pro_image', pimage);


        axios.post("http://localhost:9090/product/add", pdata, config)
        .then(result12=>{
            
            if(result12.data.success){
                    // setMessage("Product Added succsessfullly!!");
                    toast.success("Add product Successfully");
            }
        })
        .catch(e=>{
            console.log(e)
          });
    };
    return(
       
               
                <div className="col-md-6  mx-auto bg-body rounded p-3 my-3 shadow">
                    <h2 className="custom-heading-h2 text-center p-4">ADD PRODUCT</h2>
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
            <label>Product Desciption</label>
            <textarea
              type="text"
              className="form-control"
              hidden
              value={pdes}
              onChange={(e) => setPdes(e.target.value)}
            />{" "}
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
                          <input type="file" className="form-control"
                          onChange={e=>{setPimage(e.target.files[0])}}
                          />
                      </div>

                        <div className="text-center">
                        <input type="submit" value="Add Product" className="btn btn-dark rounded-1 shadow mt-4" 
                        onClick={addProduct123}
                        />
                        </div>
                    </form>
                </div>
              
           
    )
}

export default Addproduct;