import React, { useState, useEffect } from "react";
import Axios from "axios";
export default function CompletedEnrollments({ BASE_URL, userid, startDate, endDate }) {
    const [completedenrollments, setCompletedEnrollments] = useState(0);
    let endDateEnrollment = endDate;
    if (startDate !== null) {
        if (endDate === null) {
            endDateEnrollment = new Date().toISOString();
        }
    }
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/user/completeEnrollmentUser?userId=${userid}`)
            .then((response) => {
                if (response.data.data !== undefined) {
                    const enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                        return enrollment.activateddAt >= startDate && enrollment.activateddAt <= endDateEnrollment;
                    });
                    setCompletedEnrollments(enrollmentsInDateRange.length);
                } else {
                    setCompletedEnrollments(0);
                }
            })
            .catch((err) => {});
    }, [startDate, endDate]);
    return <h1 className="text-center">{completedenrollments}</h1>;
}
