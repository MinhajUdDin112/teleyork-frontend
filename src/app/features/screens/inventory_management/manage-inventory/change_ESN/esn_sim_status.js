import React from "react";      
import { Card } from "primereact/card"; 
import { Dropdown } from 'primereact/dropdown';   
import { InputText } from "primereact/inputtext";
import { FileUpload } from 'primereact/fileupload';
import {Button} from "primereact/button"
import {useFormik} from "formik"
export default function ChangeESNSIMStatus({setActiveComponent}){      
    function handleESN_SIM_submit(){ 
        console.log("form will submit here")
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
    return (     <>
        <Button label="Back" style={{position:"absolute",marginLeft:"25px",fontSize:"21px" ,marginTop:"25px"}} onClick={()=>{setActiveComponent("")}}/>
    
    <div className="card flex justify-content-around flex-wrap">          
   <h4 className="card" style={{width:"100%",marginTop:"90px"}}>Change ESN Status & Agent Name</h4>
    <Card className="p-5 border-round" style={{ width: "28em", marginBottom: "20px", boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",marginTop:"33px" }}>
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
        <InputText type="text" value={formik.values.esn} onChange={formik.handleChange} name="esn" className="w-full md:w-100%"  placeholder="ESN"/>
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
    </Card>     
    <Card className="p-5 border-round" style={{ width: "28em", marginBottom: "20px", boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",marginTop:"33px" }}>
    <h6>  Type - 3 </h6>       
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
                 <h6 style={{marginTop:"33px"}}><strong>Header :</strong> ESN/SIM, Agent ID , Status (Download Sample File)</h6>
            </div>
       </Card>   
    </div>    
    </>
    )
}