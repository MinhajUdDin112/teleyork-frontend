import React,{useState} from "react";
import { useFormik } from "formik";   
import { NewYorkStates } from "../../../../../../../../../Utils/new_york_states";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { company, usergrouptype,status} from "../../../assets";
import { Button } from "primereact/button";
export default function AddAgentDetail({AgentName}){   
    const [pictureoptionyes,setPictureOptionYes]=useState(false)  
    const [pictureoptionno,setPictureOptionNo]=useState(true)  
    const [otpoptionyes,setOtpOptionYes]=useState(false)  
    const [otpoptionno,setOtpOptionNo]=useState(true) 
    const [topupaccessoptionyes,setTopUpAccessOptionYes]=useState(false)  
    const [topupaccessoptionno,setTopUpAccessOptionNo]=useState(true)
    const [billpayaccessoptionyes,setBillPayAccessOptionYes]=useState(false)   
    const [billpayaccessoptionno,setBillPayAccessOptionNo]=useState(true)   
    
    const formik = useFormik({
        initialValues: {
            grouptype:'',   
            lastname:"", 
            firstname:"",
            company: "",       
            password:"",
            phonenumber:"", 
            email:"",   
            address:"", 
            address2:"", 
            city:"", 
            state:"", 
            zip:"",
            pictureoption:"no", 
            otp:"no", 
            status:"", 
            intakecommissiontype:"", 
            intakecommissionamount:"",
            topupaccess:"no", 
            billpayaccess:"no"
    
        },
    });
        return (
            <>
                <div>
                       <h5 className="card">Add {AgentName.charAt(0).toUpperCase() + AgentName.slice(1)} Detail</h5>
                    <div className="flex flex-wrap mb-3 justify-content-around ">
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                User Group Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.grouptype} options={usergrouptype} onChange={(e) => formik.setFieldValue("grouptype", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>   
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Last Name <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.lastname} name="lastname" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>   
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                First Name <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.setTrackingNum} name="firstname" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Company Name <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.company} options={company} onChange={(e) => formik.setFieldValue("company", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>   
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Password <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.password} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>  
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Phone Number 
                            </p>
                            <InputText type="text" value={formik.values.phonenumber} name="phonenumber" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>  
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Email Address <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.email} name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Address <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.address} name="address" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>   
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Address2 <span style={{ color: "red" }}></span>
                            </p>
                            <InputText type="text" value={formik.values.address2} name="address2" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div> 
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                zip <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.zip} name="zip" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>  
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                City <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.city} name="city" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div> 
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                State <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.state} options={NewYorkStates} onChange={(e) => formik.setFieldValue("grouptype", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div> 
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0 w-20rem">
                                Take a Picture Option 
                            </p>
                              <div className="flex flex-wrap justify-content-between"> 
                               <div><RadioButton checked={pictureoptionyes} onChange={()=>{ 
                                     if(pictureoptionyes === true){ 

                                     } 
                                     else{   

                                        setPictureOptionNo(prev=>!prev)  
                                        setPictureOptionYes(prev=>!prev)
                                        formik.values.pictureoption="yes" 
                                    }
                               }}/>       <label> Yes</label></div> 
                               <div>
                               <RadioButton     checked={pictureoptionno} onChange={()=>{ 
                                      setPictureOptionNo(prev=>!prev)  
                                      setPictureOptionYes(prev=>!prev)
                                      formik.values.pictureoption="no" 
                            }}/>      <label> No</label>  
                            </div>
                              </div>
                          </div>    
                          <div className="mr-3 mb-3 mt-3">
                            <p className="m-0 w-20rem">
                                OTP 
                            </p>
                              <div className="flex flex-wrap justify-content-between"> 
                               <div><RadioButton checked={otpoptionyes} onChange={()=>{ 
                                   setOtpOptionNo(prev=>!prev)  
                                   setOtpOptionYes(prev=>!prev)
                                   formik.values.otp="yes" 
                               }}/>   
                                  <label> Yes</label> 
                                  </div>  
                                  <div>
                               <RadioButton checked={otpoptionno} onChange={()=>{ 
                                    setOtpOptionNo(prev=>!prev)  
                                    setOtpOptionYes(prev=>!prev)
                                    formik.values.otp="no" 
                               }}/> 
                                  <label>No</label> 
                                  </div>
                              </div>
                          </div>   
                          <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Status 
                            </p>
                            <Dropdown value={formik.values.status} options={status} onChange={(e) => formik.setFieldValue("status", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>         
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0 w-20rem">
                                IntakeCommission Setup
                            </p>
                              <div className="flex flex-wrap justify-content-between w-20rem"> 
                                <div className="w-9rem"> <p>Commision Type<span style={{ color: "red" }}>*</span></p> </div>
                                <InputText className="w-9rem" type="text" value={formik.values.intakecommissiontype} name="intakecommissiontype" onChange={formik.handleChange} onBlur={formik.handleBlur}  />
                        
                                

                              </div> 
                              <div className="flex flex-wrap justify-content-between w-20rem mt-2"> 
                                <div className="w-9rem"> <p>Commision Amount</p>  </div> 
                                <InputText className="w-9rem"  type="text" value={formik.values.intakecommissionamount} name="intakecommissionamount" onChange={formik.handleChange} onBlur={formik.handleBlur}  />
                        </div>
                          </div>       
                          <div className="mr-3 mb-3 mt-3">
                            <p className="m-0 w-20rem">
                                Topup Commission Setup:
                            </p>
                              <div className="flex flex-wrap justify-content-between"> 
                                   <div> 
                                    <p> Topup Access <span style={{ color: "red" }}>*</span></p>
                                   </div>
                                   <div>
                                 <RadioButton   checked={topupaccessoptionyes} onChange={()=>{ 
                                    setTopUpAccessOptionNo(prev=>!prev)  
                                    setTopUpAccessOptionYes(prev=>!prev)
                                    formik.values.topupaccess="yes" 
                               }}/>   
                                  <label> Yes</label>
                               <  RadioButton  
                                checked={topupaccessoptionno} onChange={()=>{ 
                                    setTopUpAccessOptionYes(prev=>!prev)  
                                    setTopUpAccessOptionNo(prev=>!prev)
                                    formik.values.topupaccess="no" 
                               }}/>   
                                  <label>No</label>
                               </div>
                              </div>
                          </div>   
                          <div className="mr-3 mb-3 mt-3">
                            <p className="m-0 w-20rem">
                                Bill Pay Commission Setup:
                            </p>
                              <div className="flex flex-wrap justify-content-between"> 
                                   <div> 
                                    <p> Bill Pay Access <span style={{ color: "red" }}>*</span></p>
                                   </div>
                                   <div>
                                 <RadioButton   checked={billpayaccessoptionyes} onChange={()=>{ 
                                    setBillPayAccessOptionYes(prev=>!prev)  
                                    setBillPayAccessOptionNo(prev=>!prev)
                                    formik.values.billpayaccess="yes" 
                               }}/>    
                               <label> Yes</label>
                               <  RadioButton checked={billpayaccessoptionno} onChange={()=>{ 
                                    setBillPayAccessOptionYes(prev=>!prev)  
                                    setBillPayAccessOptionNo(prev=>!prev)
                                    formik.values.billpayaccess="no" 
                               }}/> <label> No</label>
                               </div>
                              </div>
                          </div> 
                    </div> 
                    <div className="flex flex-wrap justify-content-center align-item-center">
                    <Button label="submit" className="mt-4"/> 
                    </div>
                </div>
            </>
        );
}