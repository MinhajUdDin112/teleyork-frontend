import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import BASE_URL from "../../../../config";

const Eligibility = () => {
    const [acpProgram,setAcpProgram] = useState([])
    const {id}=useParams()
    const eligId = "645a85198cd1ff499c8b99cd"
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/address");
       
    };
    const formik = useFormik({
        initialValues:{
            program:"",
        },
        onSubmit:async(values)=>{
            const newData={
                userId:id,
                ...values
            }
            const res = await axios.post(`${BASE_URL}/api/enrollment/selectProgram`,newData);
            navigate(`/nationalverifier/${id}`);
        }
    })

    //get all ACP programs
    const getAcpPrograms =async ()=>{
        const res = await axios.get(`${BASE_URL}/api/web/acpPrograms/all?serviceProvider=${eligId}`);
        setAcpProgram(res?.data.data)
    }
    useEffect(()=>{
        getAcpPrograms()
    },[])

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh", // Changed height to minHeight
                }}
            >
                <div className="col-7">
                    {/* <div className="col-12">
                        <p className="text-4xl font-semibold">IJ Wireless</p>
                    </div> */}
                    <div className="card flex p-8">
                        <div className="col-6">
                            <p className="text-2xl font-bold">Eligibility</p>
                            <p className="mt-0 text-xl">Eligibility can be determined by your participation in a government program or by your income.</p>
                            <p className="text-lg">If you are eligibile for a government program, you may be eligibile for a discount on your ACP service. If you are not eligibile for a government program you may still be eligibile for a discount based on your income.</p>
                            <p>Additionally, you might qualify for ACP through another person, such as parent or guardian, your ACP service. This person is known as the Benefit Qualifying Person (BQP).</p>
                        </div>
                        <div className="col-6">
                            <form onSubmit ={formik.handleSubmit}>
                            <p className="text-xl font-bold">Are you participating in one of these government programs?</p>
                            <div className="flex flex-column">
                                <div className="mt-3">
                                    {/* <p className="m-0">Other</p> */}
                                    <Dropdown id="program" value={formik.values.program} options={acpProgram} onChange={formik.handleChange} optionLabel="name" optionValue="_id"  placeholder="Select ACP Program" className="w-full" />
                                    {/* <Dropdown 
                                    id="program" 
                                    name="program" 
                                    options={acpProgram} 
                                    optionValue="_id" 
                                    optionLabel="name" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.program} 
                                    placeholder="Select from other eligibility programs" 
                                    className="w-12 mb-2" /> */}
                                </div>
                                
                                <Button label="Next" type="submit" className="mt-5" />
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
