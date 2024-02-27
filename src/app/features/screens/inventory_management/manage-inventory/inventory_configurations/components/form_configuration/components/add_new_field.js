import { InputText } from "primereact/inputtext";
import React, { useState ,useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button"; 
import { Dialog } from "primereact/dialog";
import AddDropDownFields from "./add_dropdownfield";
var dropdownfield=[]
export default function AddNewField({ objforfields }) { 
    useEffect(()=>{ 
        return ()=>{ 
            dropdownfield=[]
        }
    },[])
    const validationSchema = Yup.object().shape({});
    {
        /*required:"", */
    } 
    const [addDropDownField,setDropDownFields]=useState(false)
    const formik = useFormik({
        initialValues: {
            label: "",
            type: "",
            required:false,
            static: false,   
            apiendpoint:""
            
        },
        validationSchema,
        onSubmit: (values) => {    
             if(formik.values.type === "dropdown"){  
                 if(formik.values.static){ 
                const objtopush={ 
                    ...formik.values, 
                    fields:dropdownfield

                 }    
                 
            objforfields.push(objtopush);
                } 
                else{ 
                    const objtopush={ 
                        ...formik.values
    
                     }      
                     
            objforfields.push(objtopush);
                }  
             } 
             else{ 
                const objtopush={ 
                   label:formik.values.label, 
                   type:formik.values.type, 
                   required:formik.values.required
                } 
                objforfields.push(objtopush);  
             }
        },
    });
    const types = [
        {
            label: "String",
            value: "string",
        },
        {
            label: "Int",
            value: "int",
        },
        {
            label: "Float",
            value: "float",
        },
        {
            label: "Dropdown",
            value: "dropdown",
        },
    ];
    const dropdownfields = [
        {
            label: "Static",
            value: true,
        },
        {
            label: "Non Static",
            value: false,
        },
    ];
    const requiredType = [
        {
            label: "Required",
            value: true,
        },
        {
            label: "Not Required",
            value: false,
        },
    ];
    return ( 
         <div>
        <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-row flex-wrap justify-content-around">
                <div className="mt-2 field-width">
                    <label className="block">Label</label>
                    <InputText placeholder="label" name="label" className="mt-1 w-full" onChange={formik.handleChange} value={formik.values.label} />
                </div>
                <div className="mt-2 field-width">
                    <label className="block">Field Type</label>
                    <Dropdown placeholder="Field Type" name="type" className="mt-1 w-full" options={types} onChange={(e)=>{ 
                      dropdownfield=[] 
                      formik.setFieldValue("type",e.value)
                    }} value={formik.values.type} />
                </div>  
                <div className="mt-2 field-width">
                    <label className="block">Field Type</label>
                    <Dropdown placeholder="Field Type" name="required" className="mt-1 w-full" options={requiredType} onChange={(e)=>{ 
                      dropdownfield=[] 
                      formik.setFieldValue("required",e.value)
                    }} value={formik.values.required} />
                </div>  
                {formik.values.type === "dropdown" ? (
                    <>
                        <div className="mt-0 field-width">
                            <label className="block">DropDown Field Type    
                               {  
                               formik.values.static ? <i
                                        onClick={() => {
                                            //setAddAgentDialogVisbility((prev) => !prev);
                                            setDropDownFields((prev) => !prev);
                                        }}
                                        className="pi pi pi-plus"  
                                        style={{ marginLeft: "5px", fontSize: "14px", color: "#fff", padding: "4px", cursor: "pointer", paddingLeft: "10px", borderRadius: "5px", paddingRight: "10px", background: "#00c0ef" }}
                                    ></i>:undefined 
} 
                                    </label>
                            <Dropdown placeholder="Dropdown Field" name="static" className="mt-1 w-full" options={dropdownfields} onChange={formik.handleChange} value={formik.values.static} />
                        </div>{" "}
                    </>
                ) : undefined}        
                 { 
                 formik.values.static === false && formik.values.type === "dropdown"  ?
                 <div className="mt-2 field-width">
                    <label className="block">Api Endpoint</label>
                    <InputText placeholder="Api Endpoints" name="apiendpoint" className="mt-1 w-full" onChange={formik.handleChange} value={formik.values.apiendpoint} />
                </div> :undefined
}
                  
                {/*  <div  className="mt-2 field-width">   
           
           <label className="block">Field Requirement</label>   
                 
              <Dropdown  placeholder="Field Type" name="required" className="mt-1 w-full"  options={requiredType} onChange={formik.handleChange} value={formik.values.required}/> 
           </div>     
            */}

                <div className="field-width mt-4">
                    <Button label="Add Field" className="w-full mt-2" type="submit" />
                </div>
            </div> 
            
        </form>   
        <Dialog  visible={addDropDownField}   style={{width:"80vw"}} onHide={()=>{setDropDownFields(prev=>!prev)}} > 
               
                 
        <AddDropDownFields dropdownfield={dropdownfield}/> 
              </Dialog> 
        </div>
    );
}
