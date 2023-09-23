import React, { useState } from "react";
import PersonalInfo from '../PersonalInfo_com/PersonalInfo'
import Address from "../PersonalInfo_com/Address";
import Question1 from "../PersonalInfo_com/Question1";
import Question2 from "../PersonalInfo_com/Question2";
import Question3 from "../PersonalInfo_com/Question3";
import { useSelector } from 'react-redux';

export default function PersonalInfoPage({ setActiveIndex, _id, enrollmentId }) {

    const [currentComponent, setCurrentComponent] = useState(2);



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
            render = <PersonalInfo handleNext={handleNext} handleBack={handleBack} id={_id} enrollmentId={enrollmentId} />;
            break;
        case 2:
            render = <Address handleNext={handleNext} handleBack={handleBack} id={_id} enrollmentId={enrollmentId} />;
            break;
        case 3:
            render = <Question1 handleNext={handleNext} handleBack={handleBack} id={_id} enrollmentId={enrollmentId} />;
            break;
        case 4:
            render = <Question2 handleNext={handleNext} handleBack={handleBack} id={_id} />;
            break;
        case 5:
            render = <Question3 handleNext={handleNext} handleBack={handleBack} id={_id} />;
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
