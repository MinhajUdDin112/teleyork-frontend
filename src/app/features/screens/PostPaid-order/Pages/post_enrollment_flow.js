
import React, { useRef, useState } from "react";
import { Steps } from "primereact/steps";
import Personal_info_page from "./Personal_info_page";
import Eligibility from "./Eligibilty";
import Plan from "./Plan";
import Preview from "./Preview";
export default function Post_enrollment_Flow() {
    const [activeIndex, setActiveIndex] = useState(0);
    const toast = useRef(null);
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const csr = parseLoginRes?._id; 
 // Get role name  from login response     
      const roleName= parseLoginRes?.role?.role;  
      console.log(roleName)
      
    //     getting _id and enrollment id from local storage 
   
    const zipRes = localStorage.getItem("zipData");
    const parseZipRes = JSON.parse(zipRes);
    const enrollment_id = parseZipRes?.data?.enrollmentId;
    const _id = parseZipRes?.data?._id

    const basicRes = localStorage.getItem("basicData");
    const parsebasicRes = JSON.parse(basicRes);
    const enrollmentid = parsebasicRes?.data?.enrollmentId;
    const id = parsebasicRes?.data?._id
let items;
         items = [
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
                label: "Preview",
                command: (event) => {
                    toast.current.show({ severity: "info", summary: "Last Step", detail: event.item.label });
                    setActiveIndex(2);
                },
            },
            
           
        ];
    
   
  
   

    let pages;
    if (zipRes) {
        pages = [
            Personal_info_page({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id, csr: csr }),
            Eligibility({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id, csr: csr }),
            //plan({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id, csr: csr }),
            Preview({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id, csr: csr }),
        ];
    }
    else if(basicRes){
        pages = [
            Personal_info_page({ setActiveIndex: setActiveIndex, enrollment_id: enrollmentid, _id: id, csr: csr }),
            Eligibility({ setActiveIndex: setActiveIndex, enrollment_id: enrollmentid, _id: id, csr: csr }),
            //plan({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id, csr: csr }),
            Preview({ setActiveIndex: setActiveIndex, enrollment_id: enrollmentid, _id: id, csr: csr }),
        ];
    }
    
    return (
        <div className="steps-demo">
            <div className="card">
                <Steps model={items} activeIndex={activeIndex} />
            </div>

            <div>{pages[activeIndex]}</div>
        </div>
    );
}
