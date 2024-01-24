import Axios from "axios";
import React, { useState, useEffect } from "react"; 
import { DateTime } from "luxon";
export default function AllEnrollments({ BASE_URL, userid, startDate, endDate }) {
    const [allEnrollments, setAllEnrollments] = useState(0);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/user/EnrollmentApprovedByUser?userId=${userid}`)
            .then((response) => { 
                if(response.data.data !== undefined){    
                    let endDateEnrollment = endDate;
                    if (startDate !== null) {
                        if (endDate === null) {
                            endDateEnrollment = DateTime.local()
                            .setZone("America/New_York", { keepLocalTime: false })
                            .set({ hour: 23, minute: 59, second: 0 })
                            .toFormat("d LLL yyyy, hh:mm a");
                        
                        endDateEnrollment = DateTime.fromFormat(endDateEnrollment, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds();
                          
                       
                        }
                    }
                   
                     const enrollmentsInCurrentShift = response.data.data.filter((enrollment) => {
                        return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <=endDateEnrollment
              
                  
                    });      
                     setAllEnrollments(enrollmentsInCurrentShift.length)  
                } 
                else{ 
                    setAllEnrollments(0)
                }
            })
            .catch((err) => { 
                setAllEnrollments(0)
            });
    }, [startDate, endDate,userid]);

    return <h2 className="text-center">{allEnrollments}</h2>;
}
