import React, { useState, useEffect } from "react";
import Axios from "axios";
export default function CompletedEnrollments({ BASE_URL, userid, startDate, endDate }) {
    const [completedenrollments, setCompletedEnrollments] = useState(0);  
    let endDateEnrollment=endDate; 
      if(startDate !== null){ 
         if(endDate === null){ 
            endDateEnrollment=new Date().toISOString()
         }
      }  
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/user/completeEnrollmentUser?userId=${userid}`)
            .then((response) => {
                const enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                    return enrollment.createdAt >= startDate && enrollment.createdAt <= endDateEnrollment;
                });
                setCompletedEnrollments(enrollmentsInDateRange.length);
            })
            .catch((err) => {});
    }, [startDate, endDateEnrollment]);
    return <h1 className="text-center">{completedenrollments}</h1>;
}
