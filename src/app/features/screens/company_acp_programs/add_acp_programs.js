import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Axios from "axios";
import { Card } from "primereact/card";
import { useFormik } from "formik";
import { ProgressBar } from "primereact/progressbar";
import { Toast } from "primereact/toast";
export default function AddAcpProgram() { 
    const BASE_URL=process.env.REACT_APP_BASE_URL
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const [acpprograms, setacpprograms] = useState(null);
    const [arrayofcode, setArrayOfCodes] = useState([]);
    if (acpprograms === null) {
        Axios.get(`${BASE_URL}/api/web/acpPrograms/all?serviceProvider=${parseLoginRes?.compony}`) //using dummy service provider
            .then((res) => {
               
                let arr = [];
                for (let i = 0; i < Object.keys(res.data.data).length; i++) {
                    if (res.data.data[i].code !== undefined) {
                        arr.push(res.data.data[i].code);
                    }
                }
                setArrayOfCodes(arr);
               

                setacpprograms(res.data.data);
            })
            .catch((err) => {});
    }
    const toast = useRef(null);
    const refForCode = useRef(null);
    const [imgfile, setimgfile] = useState(null);
    const [imguploadprogress, setImgUploadProgress] = useState(0);
    const [displayprogress, setDisplayProgress] = useState(false);
    const [buttonText, setButtontext] = useState("Choose File");
    let [imgsrc, setimgsrc] = useState(undefined);
    const [status, setStatus] = useState(true);
    let [showError, setShowError] = useState(false);

    const [inputValue, setInputValue] = useState("");
    const [codeFIeldError, setCodeFieldError] = useState(false);
    const handleInputChange = (event) => {
        const regex = /^E\d+$/;
        if (!regex.test(event.target.value)) {
            setCodeFieldError(true);
        } else {
            setCodeFieldError(false);
        }
        setInputValue(event.target.value);
    };
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            banner: "",
            code: "",
            active: true,
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
            banner: formik.values.banner,
            code: inputValue,
            active: formik.values.active,
        };
        const regex = /^E\d+$/;
        if (Object.keys(formik.errors).length === 0 && regex.test(inputValue)) {
            if (data.name !== "" && data.description !== "") {
                
                if (arrayofcode.includes(inputValue)) {
                    toast.current.show({ severity: "error", summary: "Info", detail: "Code Already Taken" });
                } else {
                    if (imgfile !== null) {
                        let formData = new FormData();
                       
                        formData.append("banner", imgfile);
                        setDisplayProgress(true);
                        Axios.post(`${BASE_URL}/api/web/acpPrograms/bannerUpload`, formData, {
                            onUploadProgress: (progressEvent) => {
                                // Calculate the upload percentage
                                const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                setImgUploadProgress(percentage);
                              

                                // You can use this percentage to update a progress bar or display the progress
                            },
                        })
                            .then(() => {
                                setDisplayProgress(false);
                                setImgUploadProgress(0);
                                data.banner = `http://dev-api.teleyork.com/banners/${imgfile.name}`;
                                Axios.post(`${BASE_URL}/api/web/acpPrograms`, data)
                                    .then((response) => {
                                        formik.values.banner = `${BASE_URL}/${imgfile.name}`;
                                       
                                        toast.current.show({ severity: "success", summary: "Info", detail: "Added Acp Program Successfully" });
                                    })
                                    .catch((error) => {
                                      
                                        toast.current.show({ severity: "error", summary: "Info", detail: "Added Acp Program Failed" });
                                    });
                            })
                            .catch(() => {
                                setDisplayProgress(false);
                                setImgUploadProgress(0);
                                toast.current.show({ severity: "error", summary: "Info", detail: "Added Acp Program Failed" });
                            });
                    } else {
                        Axios.post(`${BASE_URL}/api/web/acpPrograms`, data)
                            .then((response) => {
                              
                                toast.current.show({ severity: "success", summary: "Info", detail: "Added Acp Program Successfully" });
                            })
                            .catch((error) => {
                              
                                toast.current.show({ severity: "error", summary: "Info", detail: "Added Acp Program Failed" });
                            });
                    }
                }
            } else {
                formik.errors.name = "Name is Required";
                formik.errors.description = "Description is Required";
                setShowError(true);
            }
        } else {    
            const regex = /^E\d+$/;
             if(regex.test(inputValue)){ 
                setCodeFieldError(false)  
             }else{
                setCodeFieldError(true)
             }
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
                            "Code Must be in Format A1,E1"
                        </div>
                    ) : undefined}
                </div>
            </div>
            <div style={{ marginLeft: "50%", transform: "translate(-50%)", marginTop: "45px", display: "flex", justifyContent: "center" }}>
                <p style={{ position: "absolute", fontSize: "14px", marginTop: "-25px", width: "100px", marginLeft: "-51px" }}>Banner :</p>
                {imgsrc !== undefined ? <img style={{ width: "150px", marginTop: "15px", height: "auto", borderRadius: "5px" }} src={imgsrc} /> : <p style={{ marginTop: "15px" }}>Banner Will Show Here</p>}
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
                            let reader = new FileReader();
                            reader.readAsDataURL(create.files[0]);
                            reader.onloadend = () => {
                                setimgsrc(reader.result);
                                setimgfile(create.files[0]);
                            };
                        };
                        create.click();
                    }}
                />
            </div>

            <Button type="submit" label="Add" style={{ marginTop: "45px", paddingLeft: "95px", paddingRight: "95px", marginLeft: "50%", transform: "translate(-50%)" }} />
            <Toast ref={toast} />
            <Card style={{ zIndex: "999", display: `${displayprogress ? "block" : "none"}`, position: "fixed", top: "100px", right: "10px", width: "25%" }}>
                <ProgressBar value={imguploadprogress}></ProgressBar>
            </Card>
        </form>
    );
}
