import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Axios from "axios";
import "./css/barchart_style.css";
export default function EnrollmentStatChart({ BASE_URL, userid, permittedRoutes }) {
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
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
        provisionedenrollments: {
            label: "Provisioning Enrollments",
        },
        activatedenrollments: {
            label: "Completed Enrollments",
        },
        nvsenrollments: {
            label: "Successfull NVS",
        },
        transferoutenrollments: {
            label: "Transfer Out Enrollments",
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
            delete obj.allenrollments;
        }
        if (!permittedRoutes.includes("/provisioning-queue")) {
            delete obj.provisionedenrollments;
        }
        if (parseLoginRes.role.role !== "PROVISION MANAGER") {
            if (parseLoginRes.role.role !== "PROVISION AGENT") {
                delete obj.transferoutenrollments;
                delete obj.nvsenrollments;
            }
        }
        if (!permittedRoutes.includes("/completedenrollments")) {
            delete obj.activatedenrollments;
        }
    }

    useEffect(() => {
        if (obj.provisionedenrollments) {
            Axios.get(`${BASE_URL}/api/web/dashboard/provisionedSingleEnrollmentUserList?userId=${userid}`)
                .then((response) => {  
                    if(response.data.data !== undefined  && response.data.data > 0){
                    setData((prevStat) => [...prevStat, ["Provisioning", response.data.data]]); 
                    }
                })
                .catch((err) => {});
        }
        if (obj.activatedenrollments) {
            Axios.get(`${BASE_URL}/api/web/dashboard/completeSingleEnrollmentUserList?userId=${userid}`)
                .then((response) => { 
                    if(response.data.data !== undefined  && response.data.data > 0){
                    setData((prevStat) => [...prevStat, ["Completed", response.data.data]]);  
                    }
                })
                .catch((err) => {});
        }
        if (obj.nvsenrollments) {
            Axios.get(`${BASE_URL}/api/web/dashboard/getNVSuccessLength?userId=${userid}`)
                .then((response) => {  
                    if(response.data.data !== undefined  && response.data.data > 0){
                    setData((prevStat) => [...prevStat, ["NVS", response.data.data]]); 
                    }
                })
                .catch((err) => {});
        }
        if (obj.transferoutenrollments) {
            Axios.get(`${BASE_URL}/api/web/dashboard/showTransferOutEnrollments?userId=${userid}`)
                .then((response) => {  
                    if(response.data.data !== undefined  && response.data.data > 0){
                    setData((prevStat) => [...prevStat, ["Transfer Out", response.data.data]]); 
                    }
                })
                .catch((err) => {});
        }

        if (obj.rejectedenrollments) {
            Axios.get(`${BASE_URL}/api/web/dashboard/rejectedSingleEnrollmentUserList?userId=${userid}`)
                .then((response) => {  
                    if(response.data.data !== undefined  && response.data.data > 0){
                    setData((prevStat) => [...prevStat, ["Rejected", response.data.data]]); 
                    }
                })
                .catch((err) => {});
        }
        if (obj.approvedEnrollments) {
            Axios.get(`${BASE_URL}/api/web/dashboard/approvedSingleEnrollmentList?userId=${userid}`)
                .then((response) => {  
                    if(response.data.data !== undefined  && response.data.data > 0){
                    setData((prevStat) => [...prevStat, ["Approved", response.data.data]]);  
                    }
                })
                .catch((err) => {});
        }
        if (obj.allenrollments) {
            Axios.get(`${BASE_URL}/api/web/dashboard/EnrollmentApprovedBySingleUser?userId=${userid}`)
                .then((response) => {  
                    if(response.data.data !== undefined  && response.data.data > 0){
                    setData((prevStat) => [...prevStat, ["All", response.data.data]]); 
                    }
                })
                .catch((err) => {});
        }
        if (obj.incompleteenrollments) {
            Axios.get(`${BASE_URL}/api/web/dashboard/inCompleteSingleEnrollmentUserList?userId=${userid}`).then((response) => {
                  
                if(response.data.data !== undefined && response.data.data > 0){
                setData((prevStat) => [...prevStat, ["Incomplete", response.data.data]]);  
                 }
            });
        }
    }, []);
    return (
        <div className="flex flex-wrap justify-content-around flex-row ">
            {data.length !== 1 ? (
                <>
                    <Chart chartType="PieChart" data={data} options={options} className="flex flex-wrap justify-content-center pie-chart" />
                    <Chart chartType="ColumnChart" data={data} options={options} className="flex flex-wrap justify-content-center bar-chart" />
                </>
            ) : undefined}{" "}
        </div>
    );
}
