import React, { useState, useEffect } from "react";
import Axios from "axios"; 
import { DateTime } from "luxon";
export default function CompletedEnrollments({ role,BASE_URL, userid, startDate, endDate }) {
    const [completedenrollments, setCompletedEnrollments] = useState(0);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/user/completeEnrollmentUser?userId=${userid}`)
            .then((response) => {
                if(response.data.data !== undefined){
                    let endDateEnrollment = endDate;
                    if (startDate !== null) {
                        if (endDate === null) {
                            const currentDateTime = DateTime.local();
                            let etDateTime = currentDateTime.setZone("America/New_York", {
                                keepLocalTime: false,
                            });
                            etDateTime = etDateTime.set({
                                hour: 23,
                                minute: 59,
                                second: 0,
                            });   
                            
                            endDateEnrollment = etDateTime.toFormat("d LLL yyyy, hh:mm a");    
                        }
                    }
                   
                    let enrollmentsInCurrentShift; 
                    if(role !== "TEAM LEAD"){
                    enrollmentsInCurrentShift= response.data.data.filter((enrollment) => {   
                        return  DateTime.fromFormat(enrollment.activatedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.activatedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <=endDateEnrollment
               
                   
                    }); 
                        
                          } 
                          else{  
                            enrollmentsInCurrentShift= response.data.data.filter((enrollment) => { 
                                return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <=endDateEnrollment
               
                  
                    }); 
                          }
                  
                          setCompletedEnrollments(enrollmentsInCurrentShift.length); 
                } 
                else{ 
                    setCompletedEnrollments(0)
                }
            })
            .catch((err) => { 
                
                setCompletedEnrollments(0)
            });
    }, [startDate, endDate, userid]);
    return <h2 className="text-center">{completedenrollments}</h2>;
}
