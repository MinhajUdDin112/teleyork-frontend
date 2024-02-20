import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { ToastContainer,  } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL=process.env.REACT_APP_BASE_URL
const CreateDepartment = () => {
  const navigate = useNavigate(); 
  //let toast = useRef(null);

  const loginRes = localStorage.getItem('userData');
  const parseLoginRes = JSON.parse(loginRes);

  const validationSchema = Yup.object().shape({
    department: Yup.string().required('This field is required.'),
    status: Yup.boolean().required('Please select the status.'),
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      department: '',
      status: true, // Set the initial value to false (inactive)
    },
    onSubmit: async (values) => {  
      try {
        const response = await Axios.post(`${BASE_URL}/api/deparments/addDeparment`, {
          department: values.department,
          status: values.status, // true for active, false for inactive
          company: parseLoginRes?.company,
        });
        if (response?.status === 200 || response?.status === 201) {
          navigate('/manage-department');
        }
      } catch (error) {
       
        toast.error(error?.response?.data?.msg);
      }
    },
  });

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  return (
    <>
    <ToastContainer/>
      <div className="card">
        <h3 className="mt-1">Create Department <span className="steric">*</span></h3>
      </div>
      <div className="card">
        <form onSubmit={formik.handleSubmit}>
          <div className="p-fluid p-formgrid grid mb-3">
            <div className="p-field col-12">
              <label className="Label__Text">Department Name</label>
              <InputText id="department" value={formik.values.department} onChange={formik.handleChange} className="mt-2" />
              {getFormErrorMessage('department')}
            </div>
            <div className="p-field col-12">
              <label className="Label__Text mb-2">Status</label>
              <div className="flex flex-wrap mt-2 ">
                <div className="mr-3 flex alignitem-center">
                  <RadioButton
                    inputId="statusActive"
                    name="status"
                    value={true}
                    onChange={() => formik.setFieldValue('status', true)}
                    checked={formik.values.status === true}
                  />
                  <label htmlFor="statusActive" className='ml-2'>Active</label>
                </div>
                <div className="mr-3 flex alignitem-center ">
                  <RadioButton
                    inputId="statusInactive"
                    name="status"
                    value={false}
                    onChange={() => formik.setFieldValue('status', false)}
                    checked={formik.values.status === false}
                  />
                  <label htmlFor="statusInactive" className='ml-2'>Inactive</label>
                </div>
              </div>
              {getFormErrorMessage('status')}
            </div>
          </div>
          <div className="mt-3">
            <Button label="Submit" iconPos="right"  type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateDepartment;
