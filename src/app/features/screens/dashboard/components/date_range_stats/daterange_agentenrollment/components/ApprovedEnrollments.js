import React, { useState, useEffect } from "react";
import Axios from "axios";
export default function ApprovedEnrollments({ BASE_URL, userid, startDate, endDate }) {
    let endDateEnrollment = endDate;
    if (startDate !== null) {
        if (endDate === null) {
            endDateEnrollment = new Date().toISOString();
        }
    }
    const [approvedenrollments, setApprovedEnrollments] = useState(0);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/user/approvedEnrollmentList?userId=${userid}`)
            .then((response) => { 
                 if(response.data.data !== undefined){
                const enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                    return enrollment.approvedAt >= startDate && enrollment.approvedAt <= endDateEnrollment;
                });
                setApprovedEnrollments(enrollmentsInDateRange.length); 
            }  
            else{ 
                setApprovedEnrollments(0)
            }
            })
            .catch((err) => {});
    }, [startDate, endDate, userid]);
    return <h1 className="text-center">{approvedenrollments}</h1>;
}
