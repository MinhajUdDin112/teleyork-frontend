import React, { useState } from "react";
import Agree from "../Eligibilty_com/Agree";
import Select from "../Eligibilty_com/Select";

const Eligibility = ({ setActiveIndex }) => {

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
            render = <Select handleNext={handleNext} handleBack={handleBack} />;
            break;
        case 2:
            render = <Agree handleNext={handleNext} handleBack={handleBack} />;
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
