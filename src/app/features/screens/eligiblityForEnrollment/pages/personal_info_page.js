import React, { useState } from "react";
import PersonalInfo from "../PersonalInfo_com/PersonalInfo";
import Address from "../PersonalInfo_com/Address";



export default function PersonalInfoPage({ setActiveIndex, enrollment_id, _id }) {

    const [currentComponent, setCurrentComponent] = useState(1);

const [isBack, setIsBack] = useState(0)

    const handleNext = () => {
        if (currentComponent < 2) {
            setCurrentComponent((prev) => {
               
                return prev + 1;
            });
        }
        else {
            setActiveIndex(1);
        }
    };

    const handleBack = () => {
        if (currentComponent <= 2) {
            setCurrentComponent((prev) => {

                setIsBack(isBack+1);
                
                return prev - 1;

            });
        } else {
            setActiveIndex(0);
        }

    };
    let render;
    switch (currentComponent) {
        case 1:
            render = <PersonalInfo handleNext={handleNext} handleBack={handleBack} enrollment_id={enrollment_id} _id={_id} isBack={isBack}/>;
            break;
        case 2:
            render = <Address handleNext={handleNext} handleBack={handleBack} enrollment_id={enrollment_id} _id={_id} />;
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
}
