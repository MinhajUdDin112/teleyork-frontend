import React, { useRef, useState } from "react";
import { Steps } from "primereact/steps";
import PersonalInfoPage from "./personal_info_page";
import Eligibility from "./eligibility";
import plan from "./plan";
import Preview from "./preview";
import { useSelector } from "react-redux";
export default function EnrollmentFlowPage() {

    const [activeIndex, setActiveIndex] = useState(0);

    const zipCode = useSelector((state)=>state.zip)
    const enrollment_id = zipCode?.serviceAvailability?.data?.enrollmentId;
   const _id = zipCode?.serviceAvailability?.data?._id;

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

        PersonalInfoPage({ setActiveIndex: setActiveIndex,enrollment_id:enrollment_id,_id:_id }),
        Eligibility({ setActiveIndex: setActiveIndex,enrollment_id:enrollment_id,_id:_id}),
        plan({ setActiveIndex: setActiveIndex ,enrollment_id:enrollment_id,_id:_id}),
        Preview({ setActiveIndex: setActiveIndex,enrollment_id:enrollment_id,_id:_id })
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
