import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import Axios from "axios";
export default function CompletedEnrollments({role, BASE_URL, userid }) {
    const [completedenrollments, setCompletedEnrollments] = useState(0);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/user/completeEnrollmentUser?userId=${userid}`)
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
                    let enrollmentsInCurrentShift; 
                    if(role === "CSR" || role === "TEAM LEAD"){
                        enrollmentsInCurrentShift= response.data.data.filter((enrollment) => {   
                            return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom
              
                        }); 
                            
                              } 
                              else{  
                                enrollmentsInCurrentShift= response.data.data.filter((enrollment) => { 
                                    return DateTime.fromFormat(enrollment.activatedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom
                        
                        }); 
                              }
                  
                          setCompletedEnrollments(enrollmentsInCurrentShift.length);
                }
            })
            .catch((err) => {});
    }, []);
    return <h2 className="text-center">{completedenrollments}</h2>;
}
