import React, { useState } from "react";
import PersonalInfo from '../PersonalInfo_com/PersonalInfo'
import Address from "../PersonalInfo_com/Address";
import Question1 from "../PersonalInfo_com/Question1";
import Question2 from "../PersonalInfo_com/Question2";
import Question3 from "../PersonalInfo_com/Question3";

export default function PersonalInfoPage({ setActiveIndex }) {
    const [currentComponent, setCurrentComponent] = useState(1);

    const handleNext = () => {
        if (currentComponent < 5) {
            setCurrentComponent((prev) => {
                return prev + 1;
            });
        } else {
            setActiveIndex(1); 
        }
    };
    let render;
    switch (currentComponent) {
        case 1:
            render = <PersonalInfo handleNext={handleNext} />;
            break;
        case 2:
            render = <Address handleNext={handleNext} />;
            break;
        case 3:
            render = <Question1 handleNext={handleNext} />;
            break;
        case 4:
            render = <Question2 handleNext={handleNext} />;
            break;
        case 5:
            render = <Question3 handleNext={handleNext} />;
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
