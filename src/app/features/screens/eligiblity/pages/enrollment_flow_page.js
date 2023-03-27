import React, { useRef, useState } from "react";
import { Steps } from "primereact/steps";
import PersonalInfoPage from "./personal_info_page";
import Eligibility from "./eligibility";
import plan from "./plan";
import Preview from "./preview";
export default function EnrollmentFlowPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const changeValue = (val) => {
        console.log("hello changevalue");
        setActiveIndex(val);
    };
    const toast = useRef(null);
    const items = [
        {
            label: "Personal Info",
            command: (event) => {
                toast.current.show({ severity: "info", summary: "First Step", detail: event.item.label });
            },
        },
        {
            label: "Eligiblity",
            command: (event) => {
                toast.current.show({ severity: "info", summary: "Seat Selection", detail: event.item.label });
            },
        },
        {
            label: "Plan",
            command: (event) => {
                toast.current.show({ severity: "info", summary: "Pay with CC", detail: event.item.label });
            },
        },
        {
            label: "Preview",
            command: (event) => {
                toast.current.show({ severity: "info", summary: "Last Step", detail: event.item.label });
            },
        },
    ];
    let pages = [
        PersonalInfoPage(),
        Eligibility(),
        plan(),
        Preview()
    ];
    return (
        <div className="steps-demo">
            <div className="card">
                <Steps model={items} activeIndex={activeIndex} />
            </div>
            <div>
                <PersonalInfoPage changeValue={changeValue} />
            </div>
            <div>{pages[activeIndex]}</div>
        </div>
    );
}
