import React, { useRef, useState } from "react";
import { Steps } from "primereact/steps";
import PersonalInfoPage from "./personal_info_page";
import Eligibility from "./eligibility";
import plan from "./plan";
import Preview from "./preview";
export default function EnrollmentFlowPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const toast = useRef(null);
  
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
                setActiveIndex(1);            },
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
        PersonalInfoPage({setActiveIndex:setActiveIndex}),
        Eligibility({setActiveIndex:setActiveIndex}),
        plan({setActiveIndex:setActiveIndex}),
        Preview()
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
