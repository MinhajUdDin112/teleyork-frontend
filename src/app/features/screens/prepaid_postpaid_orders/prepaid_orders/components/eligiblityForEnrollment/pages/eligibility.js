import React, { useState } from "react";
import Agree from "../Eligibilty_com/Agree";
const Eligibility = ({ setActiveIndex, enrollment_id, _id, csr }) => {
    const handleNext = () => {  
        if(localStorage.getItem("comingforedit")){
        setActiveIndex(3); 
        }  
        else if(localStorage.getItem("comingfromincomplete")){ 
            let prepaidbasicData=JSON.parse(localStorage.getItem("prepaidbasicData"))
              if(prepaidbasicData?.data?.activeBillingConfiguration){ 
                 setActiveIndex(3)
              } 
              else{ 
               setActiveIndex(2)
              }
        }
        else{ 
            setActiveIndex(2)
        }
    };
    const handleBack = () => {
        setActiveIndex(0);
    };
    return (
        <>
            <div className="card">
                <br></br>
                <Agree handleNext={handleNext} handleBack={handleBack} enrollment_id={enrollment_id} _id={_id} csr={csr} />
            </div>
        </>
    );
};
export default Eligibility;
