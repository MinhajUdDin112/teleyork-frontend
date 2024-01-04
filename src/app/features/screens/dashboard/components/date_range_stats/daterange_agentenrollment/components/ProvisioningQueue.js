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
                        return enrollment.nladEnrollmentDate >= startDate && enrollment.nladEnrollmentDate <= endDateEnrollment;
                    });
                    setProvisioningQueueEnrollments(enrollmentsInDateRange.length);
                } else {
                    setProvisioningQueueEnrollments(0);
                }
            })
            .catch((err) => {});
    }, [startDate, endDate, userid]);
    return <h1 className="text-center">{provisioningqueueenrollments}</h1>;
}
