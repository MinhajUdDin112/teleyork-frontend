import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Axios from "axios"; 
import { DateTime } from "luxon";
import "./css/barchart_style.css";
export default function Last24EnrollmentStatChart({ role,BASE_URL, userid, permittedRoutes }) {
    const [data, setData] = useState([["Task", "Enrollments"]]);
    const options = {
        title: "Enrollments",
        bars: "vertical",
        is3D: true,
    };
    const obj = {
        rejectedenrollments: { label: "Rejected Enrollments" },
        incompleteenrollments: { label: "Incomplete Enrollments" },
        approvedEnrollments: {
            label: "Approved Enrollments",
        },
        allenrollments: {
            label: "All Enrollments",
        },
        completedenrollments: {
            label: "Completed Enrollments",
        },
        provisioningqueue: {
            label: "Provisioning Queue",
        },
    };
    if (permittedRoutes !== undefined) {
        if (!permittedRoutes.includes("/approved-enrollments")) {
            delete obj.approvedEnrollments;
        }
        if (!permittedRoutes.includes("/rejectedenrollments")) {
            delete obj.rejectedenrollments;
        }
        if (!permittedRoutes.includes("/incompleteenrollments")) {
            delete obj.incompleteenrollments;
        }
        if (!permittedRoutes.includes("/all-enrollments")) {
            delete obj.incompleteenrollments;
        } 
        if(permittedRoutes.includes("/incompleteenrollments")){ 
            if(role === "TEAM LEAD"){ 
                delete obj.incompleteenrollments
            }
        }
        if (!permittedRoutes.includes("/provisioning-queue")) {
            delete obj.provisioningqueue;
        }
        if (!permittedRoutes.includes("/completedenrollments")) {
            delete obj.completedenrollments;
        }    
        if(role === "TEAM LEAD" || role === "CSR"){ 
            obj.activeenrollments={ 
                 label:"Active Enrollments", 
             }
         } 
        
    }
    useEffect(() => {   
        setData([["Task", "Enrollments"]]);
        let isMounted = true;
        if (obj.rejectedenrollments) {
            Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${userid}`)
                .then((response) => {
                    if (response.data.data !== undefined) {
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
                                            return DateTime.fromFormat(enrollment.rejectedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom
                                
                                }); 
                                      }
                                  if (isMounted && enrollmentsInCurrentShift.length !== 0) {
                   
                          
                            setData((prevStat) => [...prevStat, ["Rejected", enrollmentsInCurrentShift.length]]);
                                  }
                        }
                    }
                })
                .catch((err) => {});
        }
        if (obj.approvedEnrollments) {
            Axios.get(`${BASE_URL}/api/user/approvedEnrollmentList?userId=${userid}`)
                .then((response) => {
                    if (response.data.data !== undefined && isMounted) {
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
                                            return DateTime.fromFormat(enrollment.approvedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom
                                
                                }); 
                                      }
                                  if (isMounted && enrollmentsInCurrentShift.length !== 0) {
                   
                          
                            setData((prevStat) => [...prevStat, ["Approved", enrollmentsInCurrentShift.length]]);
                                  }
                        }
                    }
                })
                .catch((err) => {});
        }
        if (obj.allenrollments) {
            Axios.get(`${BASE_URL}/api/user/EnrollmentApprovedByUser?userId=${userid}`)
            .then((response1) => {
                Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${userid}`)
                    .then((response2) => {
                        Axios.get(`${BASE_URL}/api/user/approvedEnrollmentList?userId=${userid}`)
                            .then((response3) => {
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
                                let data=[]
                                if(response1.data.data !== undefined){ 
                                   data.push(response1.data.data)
                                }  
                                if(response2.data.data !== undefined){ 
                                   data.push(response2.data.data)
                                }  
                                if(response3.data.data !== undefined){ 
                                   data.push(response3.data.data)
                                } 
                               
                                let arr=[]
                                for (let i = 0; i < data.length; i++) {
                                    for (let k = 0; k < data[i].length; k++) {
                                        if (DateTime.fromFormat(data[i][k].createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom) {
                                              arr.push(data[i][k])
                                        }
                                    }
                                }   
                                if(isMounted){ 
                                    setData((prevStat) => [...prevStat, ["All", arr.length]]);
                          
                                }
                            })
                            .catch((err) => { 
                              
                            });
                    })
                    .catch((err) => { 
                        
                    });
            })
            .catch((err) => {
               
            });
        }
        if (obj.incompleteenrollments) {
            Axios.get(`${BASE_URL}/api/user/inCompleteEnrollmentUser?userId=${userid}`).then((response) => {
                if (response.data.data !== undefined ) {
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
                        if (isMounted && enrollmentsInCurrentShift.length !== 0) {
                   
                        setData((prevStat) => [...prevStat, ["Incomplete", enrollmentsInCurrentShift.length]]);
                        }
                    }
                }
            });
        }
        if (obj.completedenrollments) {
            Axios.get(`${BASE_URL}/api/user/completeEnrollmentUser?userId=${userid}`).then((response) => {
                if (response.data.data !== undefined) {
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
                              if (isMounted && enrollmentsInCurrentShift.length !== 0) {
                   
                      
                        setData((prevStat) => [...prevStat, ["Completed", enrollmentsInCurrentShift.length]]);
                              }
                    }
                }
            });
        }  
        if(obj.activeenrollments){ 
            Axios.get(`${BASE_URL}/api/web/dashboard/getactivesalescsr?userId=${userid}`)
            .then((response) => {
                if (response.data.data !== undefined ) {
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
               
                        const enrollmentsInCurrentShift = response.data.data.filter((enrollment) => {
                            return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom
               
                        }); 
                        if (isMounted && enrollmentsInCurrentShift.length !== 0) {
                   
                        setData((prevStat) => [...prevStat, ["Active", enrollmentsInCurrentShift.length]]);
                        }
                }
            })
            .catch((err) => {});
        }
        if (obj.provisioningqueue) {
            Axios.get(`${BASE_URL}/api/user/provisionedEnrollmentUserList?userId=${userid}`).then((response) => {
                if (response.data.data !== undefined ) {
                    const currentDateTime = DateTime.local();
                    let etDateTime = currentDateTime.setZone("America/New_York", {
                        keepLocalTime: false,
                    });
                    etDateTime = etDateTime.set({
                        hour: 0,
                        minute: 0,
                        second: 0,
                    });
                    const startCountFrom = etDateTime.toFormat("d LLL yyyy, hh:mm a");
                    if (response.data.data !== undefined) {
                        const enrollmentsInCurrentShift = response.data.data.filter((enrollment) => {
                            return enrollment.nladEnrollmentDate >= startCountFrom;
                        }); 
                        if (isMounted && enrollmentsInCurrentShift.length !== 0) {
                   
                        setData((prevStat) => [...prevStat, ["Provisioning", enrollmentsInCurrentShift.length]]);
                        }
                    }
                }
            });
        }
        return () => {
            isMounted = false;
        };
    }, [userid]);
    return (
        <div className="flex flex-wrap justify-content-around flex-row ">
            {data.length !== 1 ? (
                <>
                    <Chart chartType="PieChart" data={data} options={options} className="flex flex-wrap justify-content-center pie-chart" />
                    {/*<Chart chartType="ColumnChart" data={data} options={options} className="flex flex-wrap justify-content-center bar-chart" />*/}
                </>
            ) : undefined}{" "}
        </div>
    );
}
