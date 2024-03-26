import React, { useState } from "react";
import PersonalInfo from "../PersonalInfo_com/PersonalInfo";
import Address from "../PersonalInfo_com/Address";

export default function Personal_info_page({ setActiveIndex, enrollment_id, _id, csr }) {
    const [currentComponent, setCurrentComponent] = useState(1);

    const handleNext = () => {
        if (currentComponent < 2) {
            setCurrentComponent((prev) => {
                return prev + 1;
            });
        } else {
            setActiveIndex(1);
        }
    };

    const handleBack = () => {
        if (currentComponent <= 2) {
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
            render = <PersonalInfo handleNext={handleNext} handleBack={handleBack} enrollment_id={enrollment_id} _id={_id} csr={csr} />;
            break;
        case 2:
            render = <Address handleNext={handleNext} handleBack={handleBack} enrollment_id={enrollment_id} _id={_id} csr={csr} />;
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
