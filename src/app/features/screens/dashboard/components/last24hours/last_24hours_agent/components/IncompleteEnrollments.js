import React, { useState, useEffect } from "react";
import Axios from "axios";
import { DateTime } from "luxon";
export default function IncompleteEnrollments({ BASE_URL, userid }) {
    const [incompleteenrollments, setIncompleteEnrollments] = useState(0);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/user/inCompleteEnrollmentUser?userId=${userid}`)
            .then((response) => {
                const currentDateTime = DateTime.local() 
                .setZone("America/New_York", {
                    keepLocalTime: false,
                })
                .set({
                    hour: 0,
                    minute: 0,
                    second: 0,
                })
                .toFormat("d LLL yyyy, hh:mm a"); 
                let startCountFrom=DateTime.fromFormat(currentDateTime, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds();
              
                if (response.data.data !== undefined) {
                    const enrollmentsInCurrentShift = response.data.data.filter((enrollment) => {
                        return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom
                  
                  
                    });
                    setIncompleteEnrollments(enrollmentsInCurrentShift.length);
                } 
            })
            .catch((err) => {});
    }, [userid]);
    return <h2 className="text-center"> {incompleteenrollments}</h2>;
}
