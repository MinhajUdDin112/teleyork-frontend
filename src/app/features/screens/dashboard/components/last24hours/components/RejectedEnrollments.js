import React, { useState, useEffect } from "react";
import Axios from "axios";
export default function RejectedEnrollments({ BASE_URL, userid }) {
    const [rejectedenrollments, setRejectedEnrollments] = useState(0);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${userid}`)
            .then((response) => {
                const currentTime = new Date().getTime();
                const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;
                const enrollmentsInLast24Hours = response.data.data.filter((enrollment) => {
                    const enrollmentEndTime = new Date(enrollment.rejectedAt).getTime();
                    return enrollmentEndTime >= twentyFourHoursAgo && enrollmentEndTime <= currentTime;
                });
                setRejectedEnrollments(enrollmentsInLast24Hours.length);
            })
            .catch((err) => {});
    }, []);
    return <h1 className="text-center">{rejectedenrollments}</h1>;
}
