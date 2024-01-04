import React, { useState ,useEffect} from "react";  
import Axios from "axios";
export default function RejectedEnrollments({BASE_URL,userid,startDate,endDate}){   
     const [rejectedenrollments,setRejectedEnrollments]=useState(0)     
     let endDateEnrollment=endDate; 
      if(startDate !== null){ 
         if(endDate === null){ 
            endDateEnrollment=new Date().toISOString()
         }
      }  
     useEffect(()=>{   
        Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${userid}`).then(response=>{ 
            const enrollmentsInDateRange = response.data.data.filter(enrollment => {
   
                return enrollment.createdAt >= startDate && enrollment.createdAt <= endDateEnrollment;
              });     
setRejectedEnrollments(enrollmentsInDateRange.length)
        }).catch(err=>{ 

        })

    },[startDate,endDateEnrollment])   
    return ( 
        <h1 className="text-center">{rejectedenrollments}</h1>
    )
}