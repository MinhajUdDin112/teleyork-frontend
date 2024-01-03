import React, { useState, useEffect } from "react";
import Axios from "axios";
export default function ApprovedEnrollments({ BASE_URL, userid, startDate, endDate }) {
    const [approvedenrollments, setApprovedEnrollments] = useState(0);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/user/approvedEnrollmentList?userId=${userid}`)
            .then((response) => {
                const enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                    return enrollment.createdAt >= startDate && enrollment.createdAt <= endDate;
                });
                setApprovedEnrollments(enrollmentsInDateRange.length);
            })
            .catch((err) => {});
    }, [startDate, endDate]);
    return <h1 className="text-center">{approvedenrollments}</h1>;
}
