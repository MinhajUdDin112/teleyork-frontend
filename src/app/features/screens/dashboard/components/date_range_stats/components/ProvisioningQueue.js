import React, { useState, useEffect } from "react";
import Axios from "axios";
export default function ProvisioningQueue({ BASE_URL, userid, startDate, endDate }) {
    let endDateEnrollment = endDate;
    if (startDate !== null) {
        if (endDate === null) {
            endDateEnrollment = new Date().toISOString();
        }
    }
    const [provisioningqueueenrollments, setProvisioningQueueEnrollments] = useState(0);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/user/provisionedEnrollmentUserList?userId=${userid}`)
            .then((response) => {
                if (response.data.data !== undefined) {
                    const enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                        return enrollment.nladenrollmentDate >= startDate && enrollment.nladenrollmentDate <= endDateEnrollment;
                    });
                    setProvisioningQueueEnrollments(enrollmentsInDateRange.length);
                }
            })
            .catch((err) => {});
    }, [startDate, endDate]);
    return <h1 className="text-center">{provisioningqueueenrollments}</h1>;
}
