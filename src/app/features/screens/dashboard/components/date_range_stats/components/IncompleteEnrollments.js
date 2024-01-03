import React, { useState,useEffect } from "react";  
import Axios from "axios";
export default function IncompleteEnrollments({BASE_URL,userid,startDate,endDate}){   
    const [incompleteenrollments,setIncompleteEnrollments]=useState(0)   
    useEffect(()=>{   
        Axios.get(`${BASE_URL}/api/user/inCompleteEnrollmentUser?userId=${userid}`).then(response=>{ 
            const enrollmentsInDateRange = response.data.data.filter(enrollment => {
   
                return enrollment.createdAt >= startDate && enrollment.createdAt <= endDate;
              });     
setIncompleteEnrollments(enrollmentsInDateRange.length) 
        }).catch(err=>{ 

        })

    },[startDate,endDate])   
    return ( 
        <h1 className="text-center"> {incompleteenrollments}</h1>
    )
}