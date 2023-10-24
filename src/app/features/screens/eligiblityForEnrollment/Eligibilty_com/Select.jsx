import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import Axios from "axios";
import BASE_URL from "../../../../../config";
import { ToastContainer, toast } from "react-toastify";

const Select = ({ handleNext, handleBack,enrollment_id, _id ,csr}) => {

    const [acpPrograms, setAcpPrograms] = useState([]);
    const [selectedAcpProgramId, setSelectedAcpProgramId] = useState(null);
    const [btnState, setBtnState] = useState(true);

    // Get user data from localStorage
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);

    
    const enrollmentUserId = _id;

    const getAcpPrograms = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/acpPrograms/all?serviceProvider=${parseLoginRes?.compony}`);
            setAcpPrograms(res?.data?.data || []);
        } catch (error) {
            console.error("Error fetching module data:", error);
        }
    };

    useEffect(() => {
        getAcpPrograms();
    }, []);

   const postData = async () => {

    const data = {
        csr: csr,
        userId: enrollmentUserId,
        program: selectedAcpProgramId
    }
    try{
        const res = await Axios.post(`${BASE_URL}/api/user/selectProgram`, data);
        if (res?.status === 200 || res?.status === 201) {
            localStorage.setItem("programmeId",JSON.stringify(res?.data))
            console.log("acp id is ",res?.data)
            handleNext();
        }
    }
    catch(error){
       toast.error(error?.response?.data?.msg)
    }
}

//get programme data from local storage 
const programedata= localStorage.getItem("programmeId");
const parseprogramedata = JSON.parse(programedata);

 //get ZipData data from local storage 
 const zipdata= localStorage.getItem("zipData");
 const parseZipData = JSON.parse(zipdata);

    const handleAcpSelection = (acpId) => {
       
        
            if (selectedAcpProgramId === acpId) {
                setSelectedAcpProgramId(null);
            } else {
                setSelectedAcpProgramId(acpId);
            }
    };


    useEffect(() => {
        if (selectedAcpProgramId) 
        {     setBtnState(false) } else { setBtnState(true)        
        }
    }, [selectedAcpProgramId]);


// useEffect(() => {
//     if(!zipdata){
//         setSelectedAcpProgramId(parseprogramedata?.acpProgram)
//     }
// }, [])
    return (
        <>
        <ToastContainer/>
            <div>
                <div className="flex flex-row justify-content-between align-items-center mb-2 sticky-buttons">
                    <Button label="Back" type="submit" onClick={handleBack} />
                       <Button
                            label="Continue"
                            type="submit"
                            onClick={postData}
                            disabled={btnState}
                        />    
                </div>
                <div>
                    <h6>Enrollment ID:{enrollment_id}</h6>
                </div>
                <br />
                <div>
                    <h2>Qualify for the Affordable Connectivity Program</h2>
                    <p>
                        Select the applicable program from below to show that you, your dependent or someone in your household qualifies for Affordable Connectivity Program. You can qualify through some government assistance program or through your income (you don't need to qualify through both){" "}
                    </p>
                    <p>Note: You can only select one from the programs listed below</p>
                </div>
            </div>
            <div>
                <div className="surface-section acp_programs">
                    <div className="flex flex-wrap">
                        { acpPrograms &&
                            acpPrograms.map((item) => {
                                return (
                                    <div className="w-full lg:w-6 xl:w-3 p-5" key={item?._id}>
                                        <Image src={item.banner} alt="Image" className="w-full" />
                                        <div className="mt-3 mb-2 font-medium text-900 text-xl">{item?.name}</div>
                                        <span className="text-700 line-height-3">{item?.description}</span>
                                        <a tabIndex="0" className="text-blue-500 font-medium flex align-items-center mt-2">
                                            <Button
                                                label={selectedAcpProgramId === item?._id ? "Deselect" : "Select"}
                                                iconPos="right"
                                                onClick={() => handleAcpSelection(item?._id)}
                                                disabled={selectedAcpProgramId !== null && selectedAcpProgramId !== item?._id}
                                            />
                                        </a>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Select;

