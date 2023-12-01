import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from 'axios';
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const EbillModal = ({ ebillModal, setEbillModal }) => {  
    const BASE_URL=process.env.REACT_APP_BASE_URL
    const [selectedCity1, setSelectedCity1] = useState(null);
    const [isButtonLoading, setisButtonLoading] = useState(false)

    const validationSchema = Yup.object().shape({
        eBill: Yup.string().required("Please Select E-Bill"),  
         
    });
    
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: { 
            eBill:"",    
           
        },
        onSubmit: async (values,actions) => {
          setisButtonLoading(true);
            const dataToSend = {  ...values };
        
            // try {
            //     const response = await Axios.post(`${BASE_URL}/api/user/activateByPwg`, dataToSend);
            //     if (response?.status === 201 || response?.status === 200) {
            //         toast.success("Successfully Run");
            //         setisButtonLoading(false);
            //         actions.resetForm();
            //     }
            // } catch (error) {
            //   toast.error(error?.response?.data?.msg);
            //   setisButtonLoading(false);
            // }
        },
    });
    

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
};

    const cities = [
        { name: "Email", code: "NY" },
        { name: "Printout", code: "RM" },
        { name: "SMS", code: "LDN" },
        { name: "Both Email and SMS", code: "RM" },
    ];
  
    const renderFooter = () => {
        return (
            <div className="flex justify-content-between m-3">      
                <Button label="Close" onClick={() => setEbillModal(false)} />
                <Button label="Submit" onClick={() => setEbillModal(false)} />
            </div>
        );
    };
    return (
        <div>
            <Dialog header="Ebill Setting" headerStyle={{ borderBottom: "1px solid #c5c5c5", paddingLeft: "35px" }} closable={false} visible={ebillModal} footer={renderFooter()} style={{ width: "50vw" }}>
                <div className="m-3">
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">CustomerID</p>
                        <p className="col-8 m-0 p-1"><h5>119350</h5></p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Name</p>
                        <p className="col-8 m-0 p-1"><h5>Customer 1</h5></p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Address</p>
                        <p className="col-8 m-0 p-1"><h6>Islamabad Pakistan</h6></p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">MDN</p>
                        <p className="col-8 m-0 p-1"><h5>65376418</h5></p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">E-Bill</p>
                        <p className="col-8 m-0 p-1">
                        <Dropdown placeholder="Select" id="eBill" value={formik.values.eBill} options={cities} onChange={formik.handleChange} optionLabel="name" optionValue="" className="h-3rem w-7 align-items-center " filter filterBy="name" />
                        </p>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default EbillModal;
