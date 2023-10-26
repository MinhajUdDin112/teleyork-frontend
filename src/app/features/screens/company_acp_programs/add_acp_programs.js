import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Axios from "axios";
import BASE_URL from "../../../../config";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
export default function AddAcpProgram() { 
    const toast = useRef(null);        
    const refForCode=useRef(null)
    const [imgfile,setimgfile]=useState(null)
    const [buttonText, setButtontext] = useState("Choose File");     
    let [imgsrc,setimgsrc]=useState(undefined)
    const [status,setStatus]=useState(true)
    let [showError, setShowError] = useState(false);
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);    
    const [inputValue, setInputValue] = useState('');
  const [codeFIeldError,setCodeFieldError]=useState(false)
    const handleInputChange = (event) => {
          if(event.target.value.length > 2 ){ 
            setCodeFieldError(true)
          } 
          else{ 
              
            if(event.target.value.length === 2){ 
                const regex = /^[A-Z][0-9]$/;
                if (!regex.test(event.target.value)) {   
                   setCodeFieldError(true)
                }
                else{ 
                     setCodeFieldError(false)
                } 
                setInputValue(event.target.value)
            
            } 
            else{ 

            setInputValue(event.target.value)     
            }
            
          }
    };
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",     
            banner:"",   
            code:"",
         active:true,
        },
        validate: (values) => {
            // Implement your validation logic here
            const errors = {};
            if (!values.name) {
                errors.name = "Name is required";
            }
            if (!values.description) {
                errors.description = "Description is required";
            }  
        
        
            return errors;
        },
    });
    function handleAddAcp(e) {
        e.preventDefault();
        let data = {
            name: formik.values.name,
            description: formik.values.description,
            serviceProvider: parseLoginRes?.compony, //Both Service Provider and CreatedBY will be same according to APi
            createdBy: parseLoginRes?._id, 
            banner:formik.values.banner,   
            code:inputValue,
            active:formik.values.active
        };     
        const regex = /^[A-Z][0-9]$/;
        if(regex.test(refForCode.value)){ 
            setCodeFieldError(false)
        }
        else{ 
            setCodeFieldError(true)
        }
        if (Object.keys(formik.errors).length === 0 && codeFIeldError === false) {   
              if (data.name !== "" && data.description !== "") {  
                   if(imgfile !== null){
                let formData=new FormData()    
            console.log(imgfile)
                formData.append("file",imgfile)
               Axios.post(`${BASE_URL}/api/web/acpPrograms/bannerUpload`,).then(()=>{  
                    Axios.post(`${BASE_URL}/api/web/acpPrograms`, formData)
                    .then((response) => { 
                        formik.values.banner=`${BASE_URL}/${imgfile.name}`
                        console.log("Data sent successfully:", response.data);
                        toast.current.show({ severity: "success", summary: "Info", detail: "Added Acp Program Successfully" });
                    })
                    .catch((error) => {
                        console.error("Error sending data:", error);
                        toast.current.show({ severity: "error", summary: "Info", detail: "Added Acp Program Failed" });
                    });
                }).catch(()=>{
                    toast.current.show({ severity: "error", summary: "Info", detail: "Added Acp Program Failed" });
                
                })  
            } 
            else{ 
                Axios.post(`${BASE_URL}/api/web/acpPrograms`, data)
                .then((response) => {
                    console.log("Data sent successfully:", response.data);
                    toast.current.show({ severity: "success", summary: "Info", detail: "Added Acp Program Successfully" });
                })
                .catch((error) => {
                    console.error("Error sending data:", error);
                    toast.current.show({ severity: "error", summary: "Info", detail: "Added Acp Program Failed" });
                });
            }
               
            } else {
                formik.errors.name = "Name is Required";
                formik.errors.description = "Description is Required";
                setShowError(true);
            }
        } else {
            setShowError(true);
        }
    }
    return (
        <form style={{ marginTop: "45px" }} onSubmit={handleAddAcp}>
            <div className="grid p-fluid" style={{ justifyContent: "space-around" }}>
                <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "23em" }}>
                    <p className="m-0">Name:</p>
                    <InputText type="text" value={formik.values.name} onChange={formik.handleChange} name="name" />
                    {showError ? (
                        <div className="error" style={{ marginTop: "22px", color: "red" }}>
                            {formik.errors.name}
                        </div>
                    ) : undefined}
                </div>
                <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "23em" }}>
                    <p className="m-0">Description:</p>
                    <InputText type="text" value={formik.values.description} onChange={formik.handleChange} name="description" />

                    {showError ? (
                        <div className="error" style={{ marginTop: "22px", color: "red" }}>
                            {formik.errors.description}
                        </div>
                    ) : undefined}
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
                     <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "23em" }}>
                    <p className="m-0">Code:</p>
                    <InputText ref={refForCode} type="text" value={inputValue} onChange={handleInputChange} name="code" />
                    {codeFIeldError ? (
                        <div className="error" style={{ marginTop: "22px", color: "red" }}>
                            "Code Must be in Format A1,E1"
                        </div>
                    ) : undefined}
                </div>   
            </div>     
            <div style={{marginLeft: "50%", transform: "translate(-50%)", marginTop: "45px", display: "flex", justifyContent: "center"}}> 
             <p  style={{position:"absolute",fontSize:"14px",marginTop:"-25px",width:"100px",marginLeft:"-51px"}} >Banner :</p>
           {imgsrc !== undefined ? <img style={{width:"150px",marginTop:"15px",height:"auto",borderRadius:"5px"}} src={imgsrc} /> :<p style={{marginTop:"15px"}}>Banner Will Show Here</p>}
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
                                  setimgsrc(reader.result)  
                                  setimgfile(create.files[0])
                            };
                        };
                        create.click();
                    }}
                />
            </div>

            <Button type="submit" label="Add" style={{ marginTop: "45px", paddingLeft: "95px", paddingRight: "95px", marginLeft: "50%", transform: "translate(-50%)" }} />
            <Toast ref={toast} />
        </form>
    );
}
