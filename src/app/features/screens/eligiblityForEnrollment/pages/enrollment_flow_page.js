import React, { useRef, useState } from "react";
import { Steps } from "primereact/steps";
import PersonalInfoPage from "./personal_info_page";
import Eligibility from "./eligibility";
import plan from "./plan";
import Preview from "./preview";
import { useSelector } from "react-redux";
export default function EnrollmentFlowPage() {

    const [activeIndex, setActiveIndex] = useState(0);
    const changeValue = (val) => {
        console.log("hello changevalue");
        setActiveIndex(val);
    };
    const toast = useRef(null);
   

    //     getting _id and enrollment id from local storage
    const zipRes = localStorage.getItem("zipData");
    const parseZipRes = JSON.parse(zipRes);
    const enrollment_id = parseZipRes?.data?.enrollmentId;
    const _id = parseZipRes?.data?._id



    const items = [
        {
            label: "Personal Info",
            command: (event) => {
                toast.current.show({ severity: "info", summary: "First Step", detail: event.item.label });
                setActiveIndex(0);
            },
        },
        {
            label: "Eligiblity",
            command: (event) => {
                toast.current.show({ severity: "info", summary: "Seat Selection", detail: event.item.label });
                setActiveIndex(1);
            },
        },
        {
            label: "Plan",
            command: (event) => {
                toast.current.show({ severity: "info", summary: "Pay with CC", detail: event.item.label });
                setActiveIndex(2);
            },
        },
        {
            label: "Preview",
            command: (event) => {
                toast.current.show({ severity: "info", summary: "Last Step", detail: event.item.label });
                setActiveIndex(3);
            },
        },
    ];

    let pages = [
        PersonalInfoPage({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id }),
        Eligibility({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id }),
        plan({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id }),
        Preview({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id })
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
