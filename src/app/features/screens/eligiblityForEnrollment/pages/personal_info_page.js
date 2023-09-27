import React, { useState } from "react";
import PersonalInfo from '../PersonalInfo_com/PersonalInfo'
import Address from "../PersonalInfo_com/Address";
import Question1 from "../PersonalInfo_com/Question1";


export default function PersonalInfoPage({ setActiveIndex ,enrollment_id ,_id }) {

    const [currentComponent, setCurrentComponent] = useState(1);
   


    const handleNext = () => {
        if (currentComponent < 3) {
            setCurrentComponent((prev) => {
                return prev + 1;
            });
        }
        else {
            setActiveIndex(1);
        }
    };

    const handleBack = () => {
        if (currentComponent <= 3) {
            setCurrentComponent((prev) => {
                return prev - 1;
            });
        } else {
            setActiveIndex(0);
        }

    };
    let render;
    switch (currentComponent) {
        case 1:
            render = <PersonalInfo handleNext={handleNext} handleBack={handleBack} enrollment_id={enrollment_id} _id={_id} />;
            break;
        case 2:
            render = <Address handleNext={handleNext} handleBack={handleBack}  enrollment_id={enrollment_id} _id={_id}  />;
            break;
        case 3:
            render = <Question1 handleNext={handleNext} handleBack={handleBack} enrollment_id={enrollment_id} _id={_id}  />;
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
