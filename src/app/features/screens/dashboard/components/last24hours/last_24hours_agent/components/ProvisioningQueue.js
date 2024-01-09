import React, { useState, useEffect } from "react";
import Axios from "axios";
export default function ProvisioningQueue({ BASE_URL, userid }) {
    const [provisioningqueueenrollments, setProvisioningQueueEnrollments] = useState(0);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/user/provisionedEnrollmentUserList?userId=${userid}`)
            .then((response) => {
                const currentTime = new Date().getTime();
                const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;
                if (response.data.data !== undefined) {
                    const enrollmentsInLast24Hours = response.data.data.filter((enrollment) => {
                        const enrollmentEndTime = new Date(enrollment.nladEnrollmentDate).getTime();
                        return enrollmentEndTime >= twentyFourHoursAgo && enrollmentEndTime <= currentTime;
                    });
                    setProvisioningQueueEnrollments(enrollmentsInLast24Hours.length);
                } else {
                    setProvisioningQueueEnrollments(0);
                }
            })
            .catch((err) => {});
    }, [userid]);
    return <h1 className="text-center">{provisioningqueueenrollments}</h1>;
}
