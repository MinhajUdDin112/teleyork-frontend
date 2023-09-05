import React from 'react'
import { Button } from 'primereact/button'
import { useFormik } from "formik";
import * as Yup from "yup";
const Question2 = ({handleNext}) => {

  const validationSchema = Yup.object().shape({
    isGetAcp: Yup.string().required("is they get ACP?"),
});

const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
        isGetAcp: "",
    },
    onSubmit: (values, actions) => {
        console.log(values);
        actions.resetForm();
        handleNext();
    },
});

const handleYesButton = (e) => {
    formik.values.isGetAcp = true;
};
const handleNoButton = (e) => {
    formik.values.isGetAcp = false;
};

  return (
  <>
   <form  onSubmit={formik.handleSubmit}>
 <div className="flex flex-row justify-content-between align-tems-center mb-2">
                    <h6 className="font-semibold">Enrollment ID:</h6>
                    <Button label="Continue" type='submit' />
                </div>
                <h3>Do they get the Affordable Connectivity Program?</h3>
                <div className="flex flex-row justify-content-between">
                    <Button icon="pi pi-check" label="Yes" type='button' className="p-button-success" onClick={(e)=>{handleYesButton(e)}} />
                    <Button icon="pi pi-times" label="No" type='button' className="p-button-danger" onClick={(e)=>{handleNoButton(e)}} />
                </div>
                </form>
  </>
  )
}

export default Question2