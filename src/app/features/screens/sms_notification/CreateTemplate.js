import React, { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "primereact/editor";
import { useEffect } from "react";
import { Toast } from "primereact/toast"; 
import { useLocation } from "react-router-dom";
import { addTemplateAction } from "../../../store/notification/NotificationAction";
import { ProgressSpinner } from "primereact/progressspinner";
const CreateTemplate = () => {   
    const location = useLocation();
    const currentPath = location?.pathname        
    const dispatch = useDispatch();    
    const [firstTimeLoading,setFirstTimeLoading]=useState(true)  
    const [templateText, setTemplateText] = useState("");  
   
    const [subjectText, setSubjectText] = useState("");
    
    const { addTemplateLoading,addTemplate,addTemplateError } = useSelector((state) => state.notification);
    const loginResponse = useSelector((state) => state.login);

    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    
    const loginData = loginResponse.loginData;
    const companyId = loginData?.company;

    const type = [
        { label: "SMS", value: 0 },
        { label: "Email", value: 1 },
        { label: "Both", value: 2 },
    ];

    

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Template Name is required"),
        type: Yup.string().required("Template Type is required"),
    });
   
    const formik = useFormik({
        initialValues: {
            name: "",
            type: "",
            notification_subject: "",
        },
        validationSchema,

        onSubmit: (values, actions) => {
            const name = templateText.match(/(?<=[^\$]\$\$)\w+/g) || [];
            const subject = subjectText.match(/(?<=\$\$)\w+/g) || [];
            
            const keySequence = ["templateId", ...name, ...subject];
            values.type === 0 ? keySequence.push("phone") : values.type === 1 ? keySequence.push("email") : keySequence.push("phone", "email");
            const createdBy = parseLoginRes?._id;
            const dataToSend = {
                ...values,
                createdBy,
                company: parseLoginRes?.company,
                template: templateText,
                // template: templateText.replace(/<[^>]*>|((?<= ) )/g, (match, group1) => {
                //     if (group1) {
                //       return '&nbsp';
                //     } else {
                //       return match;
                //     }}),
                keySequence: [...keySequence],
            };  
            
          
            dispatch(addTemplateAction(dataToSend));     
            setFirstTimeLoading(prev=>!prev)
            actions.resetForm();
            setTemplateText("");
            setSubjectText("");
        },
    });
    const toast = useRef(null);
       
    const showSuccesss = () => {
        toast.current.show({ severity: "success", summary: "Info", detail: "Template Added" });
    };  
    const showError=()=>{ 
        toast.current.show({ severity: "error", summary: "Info", detail: "Template Added" });
    
    }
    useEffect(()=>{    
          if(!firstTimeLoading){   
        if(addTemplateError === null){ 
           
        } 
        else{ 
            showError()
        }  
    }
    },[addTemplateError]) 
    useEffect(()=>{   
        if(!firstTimeLoading){
        if(addTemplate === null){ 
           
        } 
        else{ 
            showSuccesss()   
            
        }    
    }  
    
        
    },[addTemplate])  
    const actionBasedChecks = () => {

        const loginPerms = localStorage.getItem("permissions")
        const parsedLoginPerms = JSON.parse(loginPerms)
    
        const isCreate = parsedLoginPerms.some((node) =>
          node?.subModule.some((subNode) =>
            subNode?.route === currentPath && subNode?.actions.some((action) =>
              action?.name === "create"
            )
          )
        );
        setIsCreate(isCreate)
    
        const isManage = parsedLoginPerms.some((node) =>
          node?.subModule.some((subNode) =>
            subNode?.route === currentPath && subNode?.actions.some((action) =>
              action?.name === "manage"
            )
          )
        );
        setIsManage(isManage)
    
      }; 
      const [isManage,setIsManage]=useState(null)  
      const [isCreate,setIsCreate]=useState(null) 
    
     useEffect(()=>{ 
       actionBasedChecks()
     },[])
    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Create Template</h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Toast ref={toast} />
                <div className="card mx-5">
                    <div className="flex flex-wrap justify-content-around">
                        <div className="mr-3">
                            <p className="m-0">Template Name:</p>
                            <InputText type="text" name="name" value={formik.values.name} onChange={formik.handleChange} className="text-sm mb-2 w-25rem"  placeholder="Enter Template Name" keyfilter={/^[a-zA-Z0-9-_]*$/} />
                            {formik.touched.name && formik.errors.name ? <div className="steric">{formik.errors.name}</div> : null}
                        </div>
                        <div>
                            <p className="m-0">Template Type:</p>
                            <Dropdown name="type" options={type} value={formik.values.type} style={{padding:"2px"}} onChange={formik.handleChange} className="p-inputtext-sm mb-2 w-25rem " placeholder="Select Template Type" />
                            {formik.touched.type && formik.errors.type ? <div className="steric">{formik.errors.type}</div> : null}
                        </div>
                        <div>
                            <p className="ml-2 mb-2">
                               <span className="steric"> please note Instructions to add variable in notifications:</span> <br />
                                in the subject and in Email body prefix $$ with the variable name,
                                 for example, $$CustomerFirstName,also don't add space in the  variable name.
                            </p>
                        </div>

                        {formik.values.type === 1 || formik.values.type === 2 ? (
                            <div className="ml-3">
                                <p className="m-0">Add Subject:</p>
                                <InputText
                                    type="text"
                                    name="notification_subject"
                                    value={formik.values.notification_subject}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        setSubjectText(e.target.value);
                                    }}
                                    className="text-sm mb-2 w-25rem"
                                    placeholder="Add Subject"
                                />
                            </div>
                        ) : null}
                    </div>
                    <div className="mt-2">
                        <p className="m-0">Template Body: </p>
                        <Editor style={{ height: "320px" }} value={templateText} onTextChange={(e) => {
                          
                            setTemplateText(e.htmlValue)}} />
                    </div>
                    {addTemplateLoading ? (
                        <ProgressSpinner style={{ width: "40px", height: "40px", marginLeft: "1050px", marginTop: "10px", color: "blue" }} strokeWidth="4" animationDuration=".5s" />
                    ) : (
                        <div className="flex justify-content-end m-3">
                            <Button label="Add Template" disabled={!isCreate} type="submit" />
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateTemplate;