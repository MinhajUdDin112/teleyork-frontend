import React from 'react'
import CustomInputField from '../../../components/custom_input_field'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';

export default function ServiceAvailablityPage() {


    const history=useHistory();




    const validationSchema = Yup.object().shape({
        // zip: Yup.number().required("Zip is required."),
     
      });
      const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
          zip: "",


        },
    
        onSubmit: async (data) => {
            history.push("/enrollment")
    
        },
      });

  return (
    <div className='flex flex-column justify-content-center' >
<div className='grid justify-content-center align-content-center my-5'>

<div className='card col-4 '>
<form onSubmit={formik.handleSubmit}>
    <h6>
        Please enter zip code to check service availablity
    </h6>
  
    <CustomInputField required={true} label="zip" type='number' min={0} className={"col-12 p-fluid"}  formik={formik} iden="zip"  />

           
            <Button label='Submit' type='submit' className='col-12' />


</form>
        </div>
</div>
    </div>
  )
}
