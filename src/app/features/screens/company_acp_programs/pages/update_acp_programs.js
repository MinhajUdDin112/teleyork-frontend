import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import { Toast } from "primereact/toast";
import Axios from "axios"; 
const BASE_URL=process.env.REACT_APP_BASE_URL
const UpdateProgram = ({ setShowAcps, arrayofcodes, setShowEdit, selectedProgram, setEditAcp }) => {
    let arr = arrayofcodes;
    let indexToRemove = arrayofcodes.indexOf(selectedProgram.code);
    if (indexToRemove !== -1) {
        arr.splice(indexToRemove, 1);
    }
    const [arrayofupdatecode, setArrayOfUpdateCodes] = useState(arr);

    const toast = useRef(null);
    const refForCode = useRef(0);
    const [imguploadprogress, setImgUploadProgress] = useState(0);
    const [displayprogress, setDisplayProgress] = useState(false);

    const [imgfile, setimgfile] = useState(null);
    function handleInputChange(event) {
      
          
                const regex = /^E\d+$/;
                if (!regex.test(event.target.value)) {
                    setCodeFieldError(true);
                } else {
                    setCodeFieldError(false);
                }
                setInputValue(event.target.value);
          
    
    }
    const [inputValue, setInputValue] = useState(selectedProgram.code);
    const [codeFIeldError, setCodeFieldError] = useState(false);
    const [status, setStatus] = useState(selectedProgram.active);
    const [buttonText, setButtontext] = useState("Choose File");
    const [imgsrc, setimgsrc] = useState(selectedProgram.banner);
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const formik = useFormik({
        initialValues: {
            name: selectedProgram.name,
            description: selectedProgram.description,
            banner: selectedProgram.banner,
            active: selectedProgram.active,
        },
    });
    function handleUpdateAcp() {
      
        let data = {
            serviceProvider: parseLoginRes?.company,
            updatedBy: parseLoginRes?._id,
            acpId: selectedProgram._id,
            name: formik.values.name,
            description: formik.values.description,
            banner: formik.values.banner,
            active: formik.values.active,
            code: inputValue,
        };
        const regex = /^E\d+$/;
           
        if (regex.test(inputValue)) {
            if (arrayofupdatecode.includes(inputValue)) {
                toast.current.show({ severity: "error", summary: "Info", detail: "Code Already Taken" });
            } else {
                if (imgfile === null) {
                    Axios.patch(`${BASE_URL}/api/web/acpPrograms`, data)
                        .then((res) => {   
                           
                            
                           
                            toast.current.show({ severity: "success", summary: "Info", detail: "Updated Acp Program Successfully" });
                        })
                        .catch((err) => {
                            toast.current.show({ severity: "error", summary: "Info", detail: "Updated Acp Program Failed" });
                        });
                } else {
                    setDisplayProgress(true);
                    let formData = new FormData();
                    formData.append("banner", imgfile);
                    Axios.post(`${BASE_URL}/api/web/acpPrograms/bannerUpload`, formData, {
                        onUploadProgress: (progressEvent) => {
                            // Calculate the upload percentage
                            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setImgUploadProgress(percentage);
                         

                            // You can use this percentage to update a progress bar or display the progress
                        },
                    })
                        .then(() => {    
                             formik.values.banner=`http://dev-api.teleyork.com/banners/${imgfile.name}`
                            setimgfile(null)
                            setDisplayProgress(false);
                            setImgUploadProgress(0);
                            data.banner = `http://dev-api.teleyork.com/banners/${imgfile.name}`;
                            Axios.patch(`${BASE_URL}/api/web/acpPrograms`, data)
                                .then((res) => {
                                  
                                    toast.current.show({ severity: "success", summary: "Info", detail: "Updated Acp Program Successfully" });
                                })
                                .catch((err) => {
                                    toast.current.show({ severity: "error", summary: "Info", detail: "Updated Acp Program Failed" });
                                });
                        })
                        .catch((err) => {
                            setDisplayProgress(false);
                            setImgUploadProgress(0);
                            toast.current.show({ severity: "error", summary: "Info", detail: "Updated Acp Program Failed" });
                        });
                }
            }
        } 
        else{ 
            setCodeFieldError(true)
        }
    }
    return (
        <div>
            <Button
                label="Back"
                onClick={() => {
                    setEditAcp(false);
                    setShowEdit(false);
                    setShowAcps(null);
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
                        <input
                            style={{ marginLeft: "42%", cursor: "pointer", marginTop: "33px", transform: "translate(-75%)" }}
                            type="checkbox"
                            checked={status}
                            onChange={() => {
                                if (status === true) {
                                    setStatus(false);
                                    formik.values.active = false;
                                } else {
                                    formik.values.active = true;
                                    setStatus(true);
                                }
                            }}
                        />
                        <label style={{ marginLeft: "-24px" }} htmlFor="active" className="ml-2">
                            Status
                        </label>
                    </div>
                    <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "23em" }}>
                        <p className="m-0">Code:</p>
                        <InputText ref={refForCode} type="text" value={inputValue} onChange={handleInputChange} name="code" />
                        {codeFIeldError ? (
                            <div className="error" style={{ marginTop: "22px", color: "red" }}>
                                "Code Must be in Format E1-E2222"
                            </div>
                        ) : undefined}
                    </div>
                </div>
            </form>
            <div style={{ marginLeft: "50%", transform: "translate(-50%)", marginTop: "45px", display: "flex", justifyContent: "center" }}>
                <p style={{ position: "absolute", fontSize: "14px", marginTop: "-25px", width: "100px", marginLeft: "-51px" }}>Banner :</p>
                {imgsrc !== undefined ? <img style={{ width: "150px", marginTop: "15px", height: "auto", borderRadius: "5px" }} src={imgsrc} /> : <p style={{ marginTop: "15px" }}> Image Is Not Set</p>}
            </div>
            <div style={{ marginLeft: "50%", transform: "translate(-50%)", marginTop: "45px", display: "flex", justifyContent: "center" }}>
                <Button
                    label={buttonText}
                    onClick={(e) => {
                      
                        e.preventDefault();
                      
                        let create = document.createElement("input");
                        create.type = "file";
                        create.accept = "image/*";
                        create.onchange = () => {
                            setButtontext(create.files[0].name);
                            setimgfile(create.files[0]);
                            let reader = new FileReader();
                            reader.readAsDataURL(create.files[0]);
                            reader.onloadend = () => {
                                formik.values.banner = reader.result;
                                setimgsrc((previmgsrc) => reader.result);
                               
                            };
                        };
                        create.click();
                    }}
                />
            </div>
            <Button onClick={handleUpdateAcp} label="Update" style={{ marginTop: "15px", paddingLeft: "35px", paddingRight: "35px", marginLeft: "50%", transform: "translate(-50%)" }} />
            <Toast ref={toast} />
            <Card style={{ zIndex: "999", display: `${displayprogress ? "block" : "none"}`, position: "fixed", top: "100px", right: "10px", width: "25%" }}>
                <ProgressBar value={imguploadprogress}></ProgressBar>
            </Card>
        </div>
    );
};
export default UpdateProgram;
