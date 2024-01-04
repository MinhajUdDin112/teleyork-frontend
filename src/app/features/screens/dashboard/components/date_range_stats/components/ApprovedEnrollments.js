import React, { useState, useEffect } from "react";
import Axios from "axios";
export default function ApprovedEnrollments({ BASE_URL, userid, startDate, endDate }) {  
    let endDateEnrollment=endDate; 
      if(startDate !== null){ 
         if(endDate === null){ 
            endDateEnrollment=new Date().toISOString()
         }
      }  
    const [approvedenrollments, setApprovedEnrollments] = useState(0);     

    useEffect(() => {
        Axios.get(`${BASE_URL}/api/user/approvedEnrollmentList?userId=${userid}`)
            .then((response) => {
                const enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                    return enrollment.approvedAt >= startDate && enrollment.approvedAt <= endDateEnrollment;
                });
                setApprovedEnrollments(enrollmentsInDateRange.length);
            })
            .catch((err) => {});
    }, [startDate, endDateEnrollment]);
    return <h1 className="text-center">{approvedenrollments}</h1>;
}
