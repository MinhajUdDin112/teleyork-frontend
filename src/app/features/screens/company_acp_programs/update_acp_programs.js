import React,{useRef,useState} from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";       
import { Toast } from 'primereact/toast';
import BASE_URL from "../../../../config"; 
import { RadioButton } from "primereact/radiobutton";
import Axios from "axios"
const UpdateProgram = ({ setShowAcps,setShowEdit, selectedProgram, setEditAcp }) => {     
    const toast = useRef(null);  
    const [status,setStatus]=useState(selectedProgram.active)
    const [buttonText,setButtontext]=useState("Choose File")       
    const [imgsrc,setimgsrc]=useState(selectedProgram.banner)  
    const loginRes = localStorage.getItem("userData");  
    const parseLoginRes = JSON.parse(loginRes);
     const formik = useFormik({
        initialValues: {
            name: selectedProgram.name,
            description: selectedProgram.description, 
            banner:selectedProgram.banner, 
            active:selectedProgram.active
        },
    });
    function handleUpdateAcp() {
        console.log(formik.values);
        let data= {
            "serviceProvider":parseLoginRes?.compony,
            "updatedBy":parseLoginRes?._id,
            "acpId":selectedProgram._id,
            "name":formik.values.name,
            "description":formik.values.description,
            "banner":formik.values.banner, 
            "active":formik.values.active
        }
        Axios.patch(`${BASE_URL}/api/web/acpPrograms`,data).then (res=>{
            console.log("submit successfully",res.data)    
            toast.current.show({ severity: 'success', summary: 'Info', detail: 'Updated Acp Program Successfully' });
    
        }).catch(err=>{   
            toast.current.show({ severity: 'error', summary: 'Info', detail: 'Updated Acp Program Failed' });
    
        }) 
        
    }
    return (
        <div>
            <Button
                label="Back"
                onClick={() => {       
                    setEditAcp(false);
                    setShowEdit(false); 
                     setShowAcps(null)
                }}
            />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                style={{ marginTop: "45px" }}
            >
                <div className="grid p-fluid" style={{ justifyContent: "space-around" }}>
                    <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "23em" }}>
                        <p className="m-0">Name:</p>
                        <InputText type="text" value={formik.values.name} onChange={formik.handleChange} name="name" />
                    </div>
                    <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "23em" }}>
                        <p className="m-0">Description:</p>
                        <InputText type="text" value={formik.values.description} onChange={formik.handleChange} name="description" />
                         
                     </div>       
                     <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "23em" }}>
                     <input style={{marginLeft:"42%",cursor:"pointer",marginTop:"33px",transform:"translate(-75%)"}} type="checkbox"  checked={status} onChange={()=>{  
                         if(status === true ){   
                            setStatus(false)
                            formik.values.active=false
                         } 
                         else{ 
                            formik.values.active=true
                            setStatus(true)
                         }
                        }}/>
                    <label style={{marginLeft:"-24px"}} htmlFor="active" className="ml-2">Status</label>
                           
                     </div>    
                </div>
            </form>      
            <div style={{marginLeft: "50%", transform: "translate(-50%)", marginTop: "45px", display: "flex", justifyContent: "center"}}> 
             <p  style={{position:"absolute",fontSize:"14px",marginTop:"-25px",width:"100px",marginLeft:"-51px"}} >Banner :</p>
           {imgsrc !== undefined ? <img style={{width:"150px",marginTop:"15px",height:"auto",borderRadius:"5px"}} src={imgsrc} /> :<p style={{marginTop:"15px"}}> Image Is Not Set</p>}
            </div>
            <div style={{ marginLeft: "50%", transform: "translate(-50%)", marginTop: "45px", display: "flex", justifyContent: "center" }}>
                <Button
                    label={buttonText}
                    onClick={(e) => {
                        console.log(e);
                        e.preventDefault();
                        console.log("button clicked");
                        let create = document.createElement("input");
                        create.type = "file";  
                        create.accept="image/*"
                        create.onchange = () => {
                            setButtontext(create.files[0].name);   

                            let reader = new FileReader();
                            reader.readAsDataURL(create.files[0]);
                            reader.onloadend = () => {  
                                 formik.values.banner=reader.result    
                                 setimgsrc(previmgsrc => reader.result)
                                 console.log(formik.values)
                            };
                        };
                        create.click();
                    }}
                />
            </div> 
            <Button onClick={handleUpdateAcp} label="Update" style={{ marginTop: "15px",paddingLeft:"35px",paddingRight:"35px", marginLeft: "50%", transform: "translate(-50%)" }} />
            <Toast ref={toast} /> 
        </div>
    );
};
export default UpdateProgram;
