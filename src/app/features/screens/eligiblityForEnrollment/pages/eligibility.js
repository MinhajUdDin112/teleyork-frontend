import React, { useState } from "react";
import Agree from "../Eligibilty_com/Agree";
import Select from "../Eligibilty_com/Select";

const Eligibility = ({ setActiveIndex, enrollment_id, _id, csr }) => {
    const [currentComponent, setCurrentComponent] = useState(1);

    const zipRes = localStorage.getItem("zipData");


    const handleNext = () => {
        if(zipRes){
            if (currentComponent < 2) {
                setCurrentComponent((prev) => {
                    return prev + 1;
                });
            } else {
                setActiveIndex(2);
            }
        }
        else{
                setActiveIndex(2);
        }
      
    };

    const handleBack = () => {
        if(zipRes){
            if (currentComponent >= 2) {
                setCurrentComponent((prev) => {
                    return prev - 1;
                });
            } else {
                setActiveIndex(0);
            }
        }else{
                setActiveIndex(0);
        }
       
    };

    let render;
   
  switch (currentComponent) {
    case 1:
      render = zipRes ? (
        <Select
          handleNext={handleNext}
          handleBack={handleBack}
          enrollment_id={enrollment_id}
          _id={_id}
          csr={csr}
        />
      ) : (
        <Select
          handleNext={handleNext}
          handleBack={handleBack}
          enrollment_id={enrollment_id}
          _id={_id}
          csr={csr}
        />
      );
      break;
    case 2:
      render = zipRes ? (
        <Agree
          handleNext={handleNext}
          handleBack={handleBack}
          enrollment_id={enrollment_id}
          _id={_id}
          csr={csr}
        />
      ) : null;
      break;
    default:
      render = null;
  }
    return (
        <>
            <div className="card">
                <br></br>
                {render}
            </div>
        </>
    );
};

export default Eligibility;
