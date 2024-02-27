import React from "react";  
import { useFormik } from "formik"; 
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
export default function AddDropDownFields({dropdownfield}){   
    
    const validationSchema = Yup.object().shape({ 
    label:Yup.string().required("Label Is Required") , 
    value:Yup.string().required("Value Is Required")
    });
    const formik = useFormik({
        initialValues: {
            label: "",
            value:""
            
        },
        validationSchema,
        onSubmit: (values) => {    
            dropdownfield.push(formik.values)
        },
    });
    return(  
        <form onSubmit={formik.handleSubmit}> 
                    <div className="flex flex-row flex-wrap justify-content-around">
        <div className="mt-2 field-width">
            <label className="block">Field Label</label>
            <InputText placeholder="label" name="label" className="mt-1 w-full" onChange={formik.handleChange} value={formik.values.label} />
            {formik.errors.label && formik.touched.label && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.label}
                            </div>
                        )}
        </div>
        <div className="mt-2 field-width">
            <label className="block">Field Value</label>
            <InputText placeholder="Field Value" name="value" className="mt-1 w-full" onChange={formik.handleChange} value={formik.values.value} />
            {formik.errors.value && formik.touched.value && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.value}
                            </div>
                        )}
        </div>    
         <Button className="field-width" type="submit" label="Add DropDown Field" /> 
         </div> 
          </form>
    )
}