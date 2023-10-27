import React, { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";   
import { useSelector } from "react-redux";
import { InputText } from "primereact/inputtext"; 
import BASE_URL from "../../../../config";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";  
import Axios from "axios";
import { Editor } from "primereact/editor";
import { useEffect } from "react";  
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
const EditTemplate = (probs) => {         
    let navigate=useNavigate()  
    const [stop,setstop]=useState(false)
    const [templateText, setTemplateText] = useState(probs.templatetoedit.template);  
       console.log("sampleText is ",templateText)
    const [subjectText, setSubjectText] = useState(probs.templatetoedit.notification_subject);
    const loginResponse = useSelector((state) => state.login);
    const loginData = loginResponse.loginData;
  const type = [
        { label: "SMS", value: 0 },
        { label: "Email", value: 1 },
        { label: "Both", value: 2 },
    ];

    const loginRes = localStorage.getItem("userData");
    const validationSchema = Yup.object().shape({
        type: Yup.string().required("Template Type is required"),
    });
     
    const formik = useFormik({
        initialValues: {
            type:probs.templatetoedit.type,
            notification_subject: probs.templatetoedit.notification_subject,  
            templateId:probs.templatetoedit._id
        },
        validationSchema,
        onSubmit: (values, actions) => { 
            console.log("inside template")
            const name = templateText.match(/(?<=[^\$]\$\$)\w+/g) || [];
            const subject = subjectText.match(/(?<=\$\$)\w+/g) || [];
            const keySequence = ["templateId", ...name, ...subject];
            values.type === 0 ? keySequence.push("phone") : values.type === 1 ? keySequence.push("email") : keySequence.push("phone", "email");
            const dataToSend = {
                ...values,     
                template: templateText.replace(/<[^>]*>|((?<= ) )/g, (match, group1) => {
                    if (group1) {
                      return '&nbsp';
                    } else {
                      return match;
                    }}),
                keySequence: [...keySequence],    
            };
          
                   //.replace(/<p>/g, "").replace(/<\/p>/g, "").replace(/ /g, '&nbsp;'),.      
             Axios.patch(`${BASE_URL}/api/sms/updateTemplate`, dataToSend).then(()=>{    
                toast.current.show({ severity: "success", summary: "Info", detail: "Template Updated Successfully" });
                 setTimeout(()=>{     

                    navigate("/managetemplate")  
                 },1500)
                console.log("updated successfully")
             }).catch(err=>{ 
                toast.current.show({ severity: "error", summary: "Info", detail: "Template Updated Failed" });
                 
             })
         
        },
    });

    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: "success", summary: "Info", detail: "Template Added" });
    };   
    useEffect(()=>{ 
         return ()=>{ 
            console.log("return is calling")      
            probs.setRefresh(prev=>prev+1)
            probs.setNavigateToEdit(false)
         }
    },[stop])

    return (
        <div className="card bg-pink-50">   
            <Button label="Back" onClick={()=>{navigate("/managetemplate")}}/>
            <div className="mx-5">
                <h3 className="text-xl font-bold mt-5 pb-2" >Update Template</h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Toast ref={toast} />
                <div className="card mx-5">
                    <div className="flex flex-wrap justify-content-around">
                    <div >
                            <p className="m-0 font-semibold text-md" >Template Name:</p>
                            <InputText style={{marginTop:"10px",padding:"13.2px"}} disabled  value={probs.templatetoedit.name}  className=" text-md mb-2 w-25rem"  placeholder="Enter Template Name"  />
                       </div>
                        <div>
                            <p className="m-0 font-semibold text-md" >Template Type:</p>
                            <Dropdown style={{marginTop:"10px",padding:"2px",fontSize:"14px"}}  name="type" options={type} value={formik.values.type} onChange={formik.handleChange} className="w-25rem " placeholder="Select Template Type" />
                            {formik.touched.type && formik.errors.type ? <div className="steric">{formik.errors.type}</div> : null}
                        </div>
                        <div style={{width:"75%",marginTop:"25px",marginLeft:"49%",transform:"translate(-50%)",display:"flex"}}>
                            <p className="ml-2 mb-2 text-md " style={{textAlign:"justify"}}>
                               <span className="steric"> Please note Instructions :</span> <br />
                                in the subject and in Email body prefix $$ with the variable name,
                                 for example, $$CustomerFirstName,also don't add space in the  variable name.
                            </p>
                        </div>
                        {formik.values.type === 1 || formik.values.type === 2 ? (
                            <div className="ml-3" style={{marginTop:"25px"}}>
                                <p className="m-0 font-semibold text-md" >Add Subject:</p>
                                <InputText
                                    type="text"
                                    name="notification_subject"
                                    value={formik.values.notification_subject}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        setSubjectText(e.target.value);
                                    }}
                                    className="text-md mb-2 mt-3 w-25rem font-semibold"
                                    placeholder="Add Subject"
                                />
                            </div>
                        ) : null}
                    </div>
                    <div  style={{marginTop:"25px"}}>
                        <p className="m-0 font-semibold mb:2 text-md" >Template Body: </p> 
                        <div style={{marginTop:"10px"}}>
                        <Editor style={{ height: "320px"}} value={templateText} onTextChange={(e) => setTemplateText(e.htmlValue)} />
                        </div>
                    </div>
                    
                        <div className="flex justify-content-end m-3">
                            <Button label="Update Template" type="submit" />
                        </div>
                
                </div>
            </form>
        </div>
    );
};

export default EditTemplate;