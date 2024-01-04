import Axios from "axios";
import React, { useState, useEffect } from "react";
export default function AllEnrollments({ BASE_URL, userid, startDate, endDate }) {
    const [allEnrollments, setAllEnrollments] = useState(0);
    let endDateEnrollment = endDate;
    if (startDate !== null) {
        if (endDate === null) {
            endDateEnrollment = new Date().toISOString();
        }
    }
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/user/EnrollmentApprovedByUser?userId=${userid}`)
            .then((response) => { 
                if(response.data.data !== undefined){
                const enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                    return enrollment.createdAt >= startDate && enrollment.createdAt <= endDateEnrollment;
                });
                setAllEnrollments(enrollmentsInDateRange.length); 
            }  
            else{
             setAllEnrollments(0) 
            }
            })
            .catch((err) => {});
    }, [startDate, endDate,userid]);

    return <h1 className="text-center">{allEnrollments}</h1>;
}
