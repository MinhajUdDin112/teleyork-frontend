import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const BASE_URL=process.env.REACT_APP_BASE_URL
const Select = ({ handleNext, handleBack,enrollment_id, _id ,csr}) => {

    const [acpPrograms, setAcpPrograms] = useState([]);
    const [selectedAcpProgramId, setSelectedAcpProgramId] = useState(null);
    const [btnState, setBtnState] = useState(true);
    const [isBack, setIsBack] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    // Get user data from localStorage
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);

    
    const enrollmentUserId = _id;

    const getAcpPrograms = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/acpPrograms/all?serviceProvider=${parseLoginRes?.compony}`);
            setAcpPrograms(res?.data?.data || []);
        } catch (error) {
            toast.error(`Error fetching module data : + ${error?.response?.data?.msg}`);
        }
    };

    useEffect(() => {
        getAcpPrograms();
    }, []);

   const postData = async () => {
    setIsLoading(true);

    const data = {
        csr: csr,
        userId: enrollmentUserId,
        program: selectedAcpProgramId
    }
    try{
        const res = await Axios.post(`${BASE_URL}/api/user/selectProgram`, data);
        if (res?.status === 200 || res?.status === 201) {
            localStorage.setItem("programmeId",JSON.stringify(res?.data))
           
            setIsBack(isBack+1);
            handleNext();
            setIsLoading(false);
        }
    }
    catch(error){
       toast.error(error?.response?.data?.msg)
       setIsLoading(false);
    }
}

//get programme data from local storage 
const programedata= localStorage.getItem("programmeId");
const parseprogramedata = JSON.parse(programedata);

 //get ZipData data from local storage 
 const zipdata= localStorage.getItem("zipData");
 const parseZipData = JSON.parse(zipdata);

//get personal info  data from local storage 
 const basicResponse = localStorage.getItem("basicData");

 //get checkEligiblity data from local storage 
 const checkEligiblity= localStorage.getItem("checkEligiblity");
 const parseCheckEligiblity = JSON.parse(checkEligiblity);


  //get checkEligiblity data from local storage 
 useEffect(()=>{
    if(parseZipData){
        const checkEligiblity= localStorage.getItem("checkEligiblity");
        const parseCheckEligiblity = JSON.parse(checkEligiblity);
        console.log(parseCheckEligiblity)
        toast.success(parseCheckEligiblity?.data?.Message)
    }
   

 },[])

 

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


useEffect(() => {
    
    if(parseprogramedata){
        if(zipdata ){
            setSelectedAcpProgramId(parseprogramedata?.data?.acpProgram); 
           
        }
        else{
            setSelectedAcpProgramId(parseprogramedata?.data?.acpProgram?._id);    
            
        }
       
    }
}, [])

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
                            icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} 
                        />    
                </div>
                <div>
                <h5 className="font-bold">ENROLLMENT ID: {enrollment_id}</h5>
                </div>
                <br />
                <div>
                    <h2>Qualify for the Affordable Connectivity Program</h2>
                    <p>
                    Choose the relevant program from the options below to show that you, your dependent, or someone in your household qualifies for the Affordable Connectivity Program. You can qualify either through a government assistance program or based on your income; qualifying through both is not necessary. 
                    </p>
                    <p><strong>Note: You can only choose one program from the options listed below</strong></p>
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

