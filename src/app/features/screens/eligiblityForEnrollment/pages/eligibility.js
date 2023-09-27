import React, { useState } from "react";
import Agree from "../Eligibilty_com/Agree";
import Select from "../Eligibilty_com/Select";

const Eligibility = ({ setActiveIndex, enrollment_id, _id }) => {

    const [currentComponent, setCurrentComponent] = useState(1);

    const handleNext = () => {
        if (currentComponent < 2) {
            setCurrentComponent((prev) => {
                return prev + 1;
            });
        } else {
            setActiveIndex(2);
        }
    };

    const handleBack = () => {
        if (currentComponent >= 2) {
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
            render = <Select handleNext={handleNext} handleBack={handleBack}  enrollment_id={enrollment_id} _id={_id} />;
            break;
        case 2:
            render = <Agree handleNext={handleNext} handleBack={handleBack}  enrollment_id={enrollment_id} _id={_id} />;
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
