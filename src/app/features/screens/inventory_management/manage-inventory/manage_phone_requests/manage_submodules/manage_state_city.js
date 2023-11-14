import React,{useEffect} from "react";
import { useFormik } from "formik";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { status } from "../assets";
import { NewYorkStates } from "../../../../../../../Utils/new_york_states";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
export default function ManageStateCity({setHideBackInventoryButton, setActivePhoneRequestComponent }) {    

    const formik = useFormik({
        initialValues: {
            status: "",
            city: "",
            state: "",
        },
    });    
    setHideBackInventoryButton(true)
     useEffect(()=>{ 
      return ()=>{ 
        setHideBackInventoryButton(false)
      }
     },[])
    return (
        <div>
            <div className="card">
                <Button
                    label="Back"
                    onClick={() => {
                        setActivePhoneRequestComponent("");
                    }}
                    style={{ padding: "10px", paddingLeft: "15px", paddingRight: "15px" }}
                />
                <p className="mt-4" style={{ fontSize: "16px" }}>
                    Add Manage Phone City State
                </p>
            </div>    
              <Card> 
                      <div className="flex flex-wrap justify-content-around">   
                      <div className="mt-4"><label style={{display:"block"}}> State</label> 
                       <Dropdown className="mt-2 w-20rem" value={formik.values.state} options={NewYorkStates} placeholder="Select in Options " onChange={(e)=>{ 
                          formik.setFieldValue("state",e.value)
                       }}/>   
                       </div>  
                       <div className="mt-4"><label style={{display:"block"}}> City</label> 
                       <InputText className="mt-2 w-20rem" value={formik.values.city}   onChange={(e)=>{ 
                          formik.setFieldValue("city",e.value)
                       }}/>   
                       </div>       
                       <div className="mt-4"><label style={{display:"block"}}> Status</label> 
                       <Dropdown className="mt-2 w-20rem" value={formik.values.status} options={status} placeholder="Select in Options " onChange={(e)=>{ 
                          formik.setFieldValue("status",e.value)
                       }}/>   
                       </div>  
                      </div>   
                      <div className=" mt-4 flex flex-wrap justify-content-center">  
                        <Button label="Submit"/> 
                        </div>   
                        <div className="mt-4" > 
                         <DataTable> 
                            <Column header="SNo#"/>   
                            <Column header="State"/>  
                            <Column header="City"/>  
                            <Column header="Status"/>  
                            <Column header="Action"/> 
                         </DataTable>
                        </div>
              </Card>
        </div>
    );
}
