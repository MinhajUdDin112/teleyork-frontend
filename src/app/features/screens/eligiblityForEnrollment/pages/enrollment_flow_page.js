import React, { useRef, useState } from "react";
import { Steps } from "primereact/steps";
import PersonalInfoPage from "./personal_info_page";
import Eligibility from "./eligibility";
import plan from "./plan";
import Preview from "./preview";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

export default function EnrollmentFlowPage() {

    const [activeIndex, setActiveIndex] = useState(0);
    const toast = useRef(null);

    //fetchinh _id from response of zip code
    const id = useSelector((state) => {
        return state.zip;
    })
    const _id = id?.serviceAvailability?.data?._id;


    //fetchinh enrollment id  from response of zip code

    const enrollment_Id = id?.serviceAvailability?.data?.enrollmentId;


    const items = [
        {
            label: "Personal Info",
            command: (event) => {
                setActiveIndex(0);
            },
        },
        {
            label: "Eligiblity",
            command: (event) => {
                setActiveIndex(1);
            },
        },
        {
            label: "Plan",
            command: (event) => {
                setActiveIndex(2);
            },
        },
        {
            label: "Preview",
            command: (event) => {
                setActiveIndex(3);
            },
        },
    ];
    let pages = [

        PersonalInfoPage({ setActiveIndex: setActiveIndex, _id: _id, enrollmentId: enrollment_Id }),
        Eligibility({ setActiveIndex: setActiveIndex, _id: _id, enrollmentId: enrollment_Id }),
        plan({ setActiveIndex: setActiveIndex, _id: _id, enrollmentId: enrollment_Id }),
        Preview({ setActiveIndex: setActiveIndex, _id: _id, enrollmentId: enrollment_Id })
    ];
    return (
        <div className="steps-demo">
            <div className="card">
                <Steps model={items} activeIndex={activeIndex} />
            </div>

            <div>{pages[activeIndex]}</div>
        </div>
    );
}
