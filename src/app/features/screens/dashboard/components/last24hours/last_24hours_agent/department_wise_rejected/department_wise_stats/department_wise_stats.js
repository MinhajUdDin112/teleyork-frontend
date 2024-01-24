import React,{useEffect,useState} from "react"    
import Axios from "axios" 
import { DateTime } from "luxon"
export default function DepartmentWiseAgentRejectedInLast24({role,roleId,BASE_URL}){   
     const [qaRejected,setQaRejected]=useState(0) 
      const [provisioningRejected,setProvisioningRejected]=useState(0)
    useEffect(()=>{ 
      Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${roleId}`)
      .then((response) => {
          const currentDateTime = DateTime.local() 
          .setZone("America/New_York", {
              keepLocalTime: false,
          })
          .set({
              hour: 0,
              minute: 0,
              second: 0,
          })
          .toFormat("d LLL yyyy, hh:mm a"); 
          let startCountFrom=DateTime.fromFormat(currentDateTime, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds();
         
          if (response.data.data !== undefined) {
              let qaRejectedEnrollment; 
              let provisioningRejectedEnrollments; 
              if(role === "CSR" || role === "TEAM LEAD"){
                  qaRejectedEnrollment= response.data.data.filter((enrollment) => {   
                      return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom && enrollment.rejectedBy.department.name === "QA"
                
                  });   
                  provisioningRejectedEnrollments= response.data.data.filter((enrollment) => {   
                     return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom && enrollment.rejectedBy.department.name === "PROVISIONING"
               
                 }); 
                      
                        } 
                        else{  /*
                          enrollmentsInCurrentShift= response.data.data.filter((enrollment) => { 
                              return DateTime.fromFormat(enrollment.rejectedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom
                  
                  }); */
                        }
                     setQaRejected(qaRejectedEnrollment.length)  
                     setProvisioningRejected(provisioningRejectedEnrollments.length)
          }
      })
      .catch((err) => {});
    },[roleId])
    return ( 
        <div className="flex flex-wrap justify-content-around flex-row">  
        <div className=" card info">    
           <h2 className="w-full text-center">{qaRejected}</h2>
            <p className="w-full text-center"> 
             Qa
            </p>
         </div> 
         <div className="card info">   
         <h2 className="w-full text-center">{provisioningRejected}</h2>
            <p className="w-full text-center"> 
             Provisioning
            </p>
         </div>
 </div>
    )
}