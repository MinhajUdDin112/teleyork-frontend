import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Axios from "axios";
import "./css/barchart_style.css"
export default function Last24EnrollmentStatChart({ BASE_URL, userid, permittedRoutes }) {
   
    const [data, setData] = useState([["Task", "Enrollments"]]);
    const options = {
        title: "Enrollments",
        bars: "vertical",
        is3D: true,
    };
    const obj = {
        rejectedenrollments: { label: "Rejected Enrollments"},
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
        console.log("not null");

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
        if (!permittedRoutes.includes("/provisioning-queue")) {
            delete obj.provisioningqueue;
        }
        if (!permittedRoutes.includes("/completedenrollments")) {
            delete obj.completedenrollments;
        }
    }

    useEffect(() => {
        if (obj.rejectedenrollments) {
            Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${userid}`)   
                .then((response) => {       
         const currentTime = new Date().getTime();

// Set the time for 24 hours ago
const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;

// Filter the enrollments based on the end timestamp  
if(response.data.data !== undefined){
const enrollmentsInLast24Hours = response.data.data.filter(enrollment => {
 const enrollmentEndTime = new Date(enrollment.rejectedAt).getTime();
 return enrollmentEndTime >= twentyFourHoursAgo && enrollmentEndTime <= currentTime;
});     
if(enrollmentsInLast24Hours.length !== 0){
                    setData((prevStat) => [...prevStat, ["Rejected", enrollmentsInLast24Hours.length]]);
         }  
        }
         })
                .catch((err) => {});
        }
        if (obj.approvedEnrollments) {
            Axios.get(`${BASE_URL}/api/user/approvedEnrollmentList?userId=${userid}`)
                .then((response) => {    
                  
                 
         const currentTime = new Date().getTime();

// Set the time for 24 hours ago
const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;

// Filter the enrollments based on the end timestamp 
if(response.data.data !== undefined){
const enrollmentsInLast24Hours = response.data.data.filter(enrollment => {
 const enrollmentEndTime = new Date(enrollment.approvedAt).getTime();
 return enrollmentEndTime >= twentyFourHoursAgo && enrollmentEndTime <= currentTime;
});      
if(enrollmentsInLast24Hours.length !== 0){
                    setData((prevStat) => [...prevStat, ["Approved", enrollmentsInLast24Hours.length]]);
          }  
                } 
        })
                .catch((err) => {});
        }
        if (obj.allenrollments) {
            Axios.get(`${BASE_URL}/api/user/EnrollmentApprovedByUser?userId=${userid}`)
                .then((response) => {   
         const currentTime = new Date().getTime();
const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000; 
if(response.data.data !== undefined){
const enrollmentsInLast24Hours = response.data.data.filter(enrollment => {
 const enrollmentEndTime = new Date(enrollment.createdAt).getTime();
 return enrollmentEndTime >= twentyFourHoursAgo && enrollmentEndTime <= currentTime;
});                 if(enrollmentsInLast24Hours.length !== 0){
                    setData((prevStat) => [...prevStat, ["All",enrollmentsInLast24Hours.length]]);
    }
            }    })
                .catch((err) => {});
        }
        if (obj.incompleteenrollments) {  

            Axios.get(`${BASE_URL}/api/user/inCompleteEnrollmentUser?userId=${userid}`).then((response) => {
            
                const currentTime = new Date().getTime();
       
       // Set the time for 24 hours ago
       const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;
       
       // Filter the enrollments based on the end timestamp 
       if(response.data.data !== undefined){
       const enrollmentsInLast24Hours = response.data.data.filter(enrollment => {
        const enrollmentEndTime = new Date(enrollment.createdAt).getTime();
        return enrollmentEndTime >= twentyFourHoursAgo && enrollmentEndTime <= currentTime;
       });    
       if(enrollmentsInLast24Hours.length !== 0){  
         
                setData((prevStat) => [...prevStat, ["Incomplete", enrollmentsInLast24Hours.length]]);
            }   } });
        }  
        if (obj.completedenrollments) {
            Axios.get(`${BASE_URL}/api/user/completeEnrollmentUser?userId=${userid}`).then((response) => {
              
                const currentTime = new Date().getTime();
       
       // Set the time for 24 hours ago
       const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;
       
       // Filter the enrollments based on the end timestamp   
       if(response.data.data !== undefined){
       const enrollmentsInLast24Hours = response.data.data.filter(enrollment => {
        const enrollmentEndTime = new Date(enrollment.activatedAt).getTime();
        return enrollmentEndTime >= twentyFourHoursAgo && enrollmentEndTime <= currentTime;
       });    
       if(enrollmentsInLast24Hours.length !== 0){
                setData((prevStat) => [...prevStat, ["Completed", enrollmentsInLast24Hours.length]]);
         }} });
        }    
        if (obj.provisioningqueue) {
            Axios.get(`${BASE_URL}/api/user/provisionedEnrollmentUserList?userId=${userid}`).then((response) => {
                console.log("Provisioned At",response.data) 
                const currentTime = new Date().getTime();
       
       // Set the time for 24 hours ago
       const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;
       
       // Filter the enrollments based on the end timestamp 
       if(response.data.data !== undefined){
       const enrollmentsInLast24Hours = response.data.data.filter(enrollment => {
        const enrollmentEndTime = new Date(enrollment.nladEnrollmentDate).getTime();
        return enrollmentEndTime >= twentyFourHoursAgo && enrollmentEndTime <= currentTime;
       });    
                if(enrollmentsInLast24Hours.length !== 0){
                setData((prevStat) => [...prevStat, ["Completed", enrollmentsInLast24Hours.length]]);   
                } 

          }  });
        }   

    }, []);   
      console.log(data)
    return (
        <div className="flex flex-wrap justify-content-around flex-row "> 
             { 
             data.length !== 1 ?<>
            <Chart chartType="PieChart" data={data} options={options} className="flex flex-wrap justify-content-center pie-chart" />
            <Chart chartType="ColumnChart" data={data} options={options} className="flex flex-wrap justify-content-center bar-chart" /></>:undefined
              } </div>
    );
}