import React, { useEffect } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import classNames from "classnames";
import { toast } from "react-toastify"; // Import ToastContainer and toast
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const DialogeForSwapEsn = ({ cpData, setRefersh, setIsSwapEsn }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [allesn, setAllEsn] = useState([]);
    const [ingredient, setIngredient] = useState('');

    const validationSchema = Yup.object().shape({
        newesn: Yup.string().required("This is Required"),
       // reuse: Yup.string().required("This is Required"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            newesn: "",
            reuse: ""
        },
        onSubmit: async (values, actions) => {
            const dataToSend = {
                newesn: formik.values.newesn,
                enrollmentId: cpData?._id,
                reuse: ingredient
            };
            setIsLoading(true);
            try {
                const response = await Axios.post(`${BASE_URL}/api/user/SwapESN`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    toast.success("ESN Swap Successfully");
                    setRefersh(true)
                    setTimeout(() => {
                        setIsSwapEsn(false);
                    }, 2000);
                }
            } catch (error) {
                toast.error(error?.response?.data?.error.message);
            }
            setIsLoading(false);
        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
         const getEsn = async ()=>{
          const response = await Axios.get(`${BASE_URL}/api/web/simInventory/getesnbyBillingModel?serviceProvider=${cpData?.serviceProvider}&unitType=${cpData?.selectProduct}&billingModel=${cpData?.accountType}`)
          setAllEsn(response?.data?.data)
 }
    useEffect(()=>{
        getEsn();
    },[])
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className='flex' style={{ alignItems: 'end' }}>
                    <div className='mt-4 mr-4'>
                        <label className="field_label mb-1">
                            Select ESN <span className="steric">*</span>
                        </label>
                        <Dropdown
                            id="newesn"
                            options={allesn}
                                value={formik.values.newesn}
                            optionValue="SimNumber"
                                optionLabel="SimNumber"
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("newesn") }, "input_text w-18rem")}
                        />
                        {getFormErrorMessage("newesn")}
                    </div>

                    <div className='ml-4 mb-2 mr-4'>
                        <label className="field_label mb-1">
                            Reuse <span className="steric">*</span>
                        </label>
                        <div className='flex flex-wrap gap-3 mt-3'>
                            <div className="flex align-items-center mr-2">
                                <RadioButton inputId="ingredient1" name="reuse" value="TRUE" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'TRUE'}  className={classNames({ "p-invalid": isFormFieldValid("reuse") }, "input_text")} />
                                <label htmlFor="ingredient1" className="ml-2">Yes</label>
                            </div>
                            <div className="flex align-items-center">
                                <RadioButton inputId="ingredient2" name="reuse" value="FALSE" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'FALSE'}  className={classNames({ "p-invalid": isFormFieldValid("reuse") }, "input_text")} />
                                <label htmlFor="ingredient2" className="ml-2">NO</label>
                            </div>
                            {getFormErrorMessage("reuse")}
                        </div>
                    </div>

                    <div className='mt-4 ml-5'>
                        <Button label='Swap' type='Submit' icon={isLoading === true ? "pi pi-spin pi-spinner " : ""}  disabled={isLoading}/>
                    </div>

                </div>

            </form>

        </>
    )
}

export default DialogeForSwapEsn