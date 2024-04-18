import React from "react";      
import { Card } from "primereact/card"; 
import { Dropdown } from 'primereact/dropdown';  
import { FileUpload } from 'primereact/fileupload';
import {Button} from "primereact/button"
import {useFormik} from "formik"
import { InputTextarea } from "primereact/inputtextarea";
import Change_Esn_Status_And_Agent_Name_report from "./change_esn_status_and_agent_name_report";
export default function ChangeESNSIMStatus({setActiveComponent}){      
    function handleESN_SIM_submit(){ 
    }
    const formik = useFormik({
        initialValues: {
            status: "",
            esn: "",
            masteragent:"",
            retailer:"", 
            employee:"",
            distributor:""
        },
    });
    return (     <Card>
         <Button className="card"  
             
             label="Back"
             style={{background:"royalblue", position: "absolute", padding:"15px",paddingTop:"10px",paddingBottom:"10px",marginLeft: "25px", fontSize: "16px", marginTop: "5px" }}
             onClick={() => {
                 setActiveComponent("");
             }}
         />
    <div className="flex justify-content-around flex-wrap">          
   <h4  className="card" style={{width:"100%",marginTop:"90px"}}>Change ESN Status & Agent Name</h4>
    <div className="card" style={{ width: "28em", marginBottom: "20px",marginTop:"33px" }}>
         <h6>  Type - 1 </h6>      
         <h6>Status</h6>   
         <div className=" flex justify-content-center">
            <Dropdown value={formik.values.status} name="status" onChange={formik.handleChange} options=  {[
        { name: 'Removed' },
        { name: 'Bad' },
        { name: 'Free'},
        { name: 'Lost/Stolen'},
        { name: 'Used'},    
        { name: 'Fraud'}, 

    ]} optionLabel="name" 
                placeholder="Select" className="w-full md:w-100%" />
        </div>      
        <h6>ESIN/SIM</h6>     
        <div>   
        <InputTextarea type="text" value={formik.values.esn} onChange={formik.handleChange} name="esn" className="w-full md:w-100%"  placeholder="ESN"/>
                 <p>Please Enter ESN/SIM By New Line , Use Standard ESN Format <br/>Ex: 98700000 or 2684354601010480000000000 </p>
                  </div>    
                  <form style={{ marginTop: "45px" }} onSubmit={(e)=>{  
                    e.preventDefault()
                  }}>
            <div className="grid p-fluid" style={{ justifyContent: "space-around" }}>
                <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "10rem" }}>
                    <p className="m-0">Master Agent:</p>
                    <Dropdown value={formik.values.masteragent} name="masteragent" onChange={formik.handleChange} options="" optionLabel="name" 
                placeholder="--Select--" className="w-full md:w-100%" />
                </div>
                <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "10rem" }}>
                    <p className="m-0">Distributer:</p>  
                    <Dropdown value={formik.values.distributor} name="distributor" onChange={formik.handleChange} options="" optionLabel="name" 
                placeholder="--Select--" className="w-full md:w-100%" />
                 </div>        
                 <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "10rem" }}>
                    <p className="m-0">Retailer:</p>  
                    <Dropdown value={formik.values.retailer} name="retailer" onChange={formik.handleChange} options="" optionLabel="name" 
                placeholder="--Select--" className="w-full md:w-100%" />
                 </div>         
                 <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "10rem" }}>
                    <p className="m-0">Employee:</p>  
                    <Dropdown value={formik.values.employee} name="employee" onChange={formik.handleChange} options="" optionLabel="name" 
                placeholder="--Select--" className="w-full md:w-100%" />
                 </div>    
                 
            </div>   
            

            <Button onClick={handleESN_SIM_submit} label="Submit" style={{ marginTop: "15px", marginLeft: "50%", transform: "translate(-50%)" }} />
        </form>     
    </div>     
    <div className="card p-5 border-round" style={{ width: "28em", marginBottom: "20px" }}>
    <h6>  Type - 2 </h6>       
    <div className="flex justify-content-left" style={{marginTop:"42px"}}>
        
            <FileUpload mode="basic" name="Choose " url="" accept="image/*" maxFileSize={1000000}  />
        </div>      
        <h6>Note:</h6>     
          <div>   
            <ul>     
                <li> ESN/SIM Status will be changed to USED for Active User Only
                    </li>  
                    <li> 
                        ESN must exist in the system(you cannot reassign ESN,change ESN status, which have never been uploaded)
                        </li>   
                        <li> 
                        Agent ID: when you enter Agent ID, system will assign/reassign ESN/SIM to that Agent ID  </li>  
                        <li> 
                            Status: ESN/SIM Status will be changed.For example: Free, Removed, Used, Lost, Fraud or Bad
                       </li>  
                        <li> System will process both agent id or status when value is enter in both the field or you can leave one field blank..
                  </li> 
                        
                </ul>     
                 <h6 style={{marginTop:"33px"}}><strong>Header :</strong> ESN/SIM, Agent ID , <strong>Status (Download Sample File)</strong></h6>
            </div>
       </div>   
    </div>       
    <Change_Esn_Status_And_Agent_Name_report/>
    </Card>
    )
}