import React, { useState, useEffect } from "react";
import Axios from "axios";
import { DateTime } from "luxon";
import { setIn } from "formik";
export default function IncompleteEnrollments({ BASE_URL, userid }) {
    const [incompleteenrollments, setIncompleteEnrollments] = useState(0);
    useEffect(() => { 
        let isMounted=true
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
                     if(isMounted){
                    setIncompleteEnrollments(enrollmentsInCurrentShift.length); 
                     }
                } 
                else{ 
                    if(isMounted){ 
                        setIncompleteEnrollments(0)
                    }
                }
            })
            .catch((err) => { 
                if(isMounted){ 
                    setIncompleteEnrollments(0)
                }
            });
            return ()=>{ 
                isMounted=false
            }
    }, []);
    return <h2 className="text-center"> {incompleteenrollments}</h2>;
}
