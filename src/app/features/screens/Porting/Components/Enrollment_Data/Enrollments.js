import React, { useState } from "react"; 
import PrepaidAllEnrollments from "./all_enrollments.js/all_enrollment";
import { Dropdown } from "primereact/dropdown";
export default function EnrollmentsData({setShowAllEnrollments,setCurrentSelected}){  
     const [enrollmentType,setEnrollmentType]=useState("Prepaid")
     return(                
         <div>  
               <label className="mt-2 mb-4  block w-full " >Enrollment Type :</label>
             <Dropdown value={enrollmentType}  options={[{label:"Prepaid",value:"Prepaid"},{label:"Postpaid",value:"Postpaid"}]}  onChange={(e)=>{ 
                 setEnrollmentType(e.value)
             }}/>
    
         <PrepaidAllEnrollments  setCurrentSelected={setCurrentSelected} enrollmentType={enrollmentType} setShowAllEnrollments={setShowAllEnrollments}/> 
          </div>
     )
}