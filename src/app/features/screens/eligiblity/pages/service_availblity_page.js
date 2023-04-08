import React from 'react'
import CustomInputField from '../../../components/custom_input_field'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
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

      const data=[
        {
          name:{
            first:"Waseem"
          },
          age:24,
          height:"5.5",
          designation:"SE"
        },
        {
          name:{
            first:"Waseem"
          },
          age:24,
          height:"5.5",
          designation:"SE"
        },
      ];

  return (
    <div className='flex flex-column justify-content-center' >

<div>
  <DataTable value={data} showGridlines responsiveLayout="scroll">
    <Column field='name.first' header="Name of user" />
    <Column field='age' header="AGe of user" />
  </DataTable>
  <DataTable value={data} showGridlines responsiveLayout="scroll">
    <Column field='height' header="height of user" />
    <Column field='designation' header="designation of user" />
  </DataTable>
</div>

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
