import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import BASE_URL from "../../../../config";
import { ToastContainer, toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";

const Eligibility = () => {
    const [acpProgram,setAcpProgram] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isButtonLoading, setIsButtonLoading] = useState(false)
    const {id}=useParams()
    const eligId = "64e0b1ab35a9428007da351c"
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1)
       
    };
    const formik = useFormik({
        initialValues:{
            program:"",
        },
        validate:(data)=>{
            let errors={}
            if(!data?.program){
                errors.program="Select Program"
            }
            return errors;
        },
        onSubmit: async (values) => {
            const newData = {
                userId: id,
                ...values,
            };
            setIsLoading(true);
            try {
                const res = await axios.post(`${BASE_URL}/api/enrollment/selectProgram`,newData);
                
                // Check if the POST request was successful
                if (res.status === 200 || res.status === 201) {
                    // Save the response data in local storage
                    localStorage.setItem('selectProgram', JSON.stringify(res.data));
                    
                    // Navigate to the next page
                    navigate(`/selfenrollment/nationalverifier/${id}`);
                    setIsLoading(false);
                }
            } catch (error) {
                 toast.error(error?.response?.data?.msg);
                setIsLoading(false);
            }
        }
        
    })
    useEffect(()=>{
        const selectProgram  = JSON.parse(localStorage.getItem('selectProgram'))
        if(selectProgram){
            formik.setFieldValue('program',selectProgram?.data?.acpProgram)
           
        }
    },[])
    //get all ACP programs
    const getAcpPrograms =async ()=>{
        const res = await axios.get(`${BASE_URL}/api/web/acpPrograms/all?serviceProvider=${eligId}`);
        setAcpProgram(res?.data.data)
    }
    useEffect(()=>{
        getAcpPrograms()
    },[])

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error mb-3">{formik.errors[name]}</small>;
    };
    
    return (
        <>
        <ToastContainer/>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh", // Changed height to minHeight
                }}
            >
                <div className="col-7">
                    <div className="card flex p-8">
                        <div className="col-6">
                            <p className="text-2xl font-bold">Eligibility</p>
                            <p className="mt-0 text-xl">Eligibility can be determined by your participation in a government program or your income. If you are eligible for a government program, you may qualify for a discount on your ACP service.<br></br>If you are not eligible for a government program, you may still qualify for a discount based on your income.<br></br>Additionally, you might qualify for ACP through another person, such as a parent or guardian, who is known as the Benefit Qualifying Person (BQP) for your ACP service..</p>
                           
                        </div>
                        <div className="col-6">
                            <form onSubmit ={formik.handleSubmit}>
                            <p className="text-xl font-bold">Are you participating in one of these government programs?</p>
                            <div className="flex flex-column">
                                <div className="mt-3">
                                    <Dropdown id="program" value={formik.values.program} options={acpProgram} onChange={formik.handleChange} optionLabel="name" optionValue="_id"  placeholder="Select ACP Program" className="w-full" />
                                    {getFormErrorMessage("program")}
                                </div>
                                
                                <Button label="Next" icon={isLoading ? <ProgressSpinner strokeWidth="6" style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} /> : null} type='submit' className='mt-5'  disabled={isLoading}/>
                                <Button label="Back" className="mt-3" onClick={handleBack} />
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Eligibility;
