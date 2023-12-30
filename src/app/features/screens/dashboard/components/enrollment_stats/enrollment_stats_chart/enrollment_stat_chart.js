import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Axios from "axios";
import "./css/barchart_style.css";
export default function EnrollmentStatChart({ BASE_URL, userid, permittedRoutes }) {
   
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
    }

    useEffect(() => {
        if (obj.rejectedenrollments) {
            Axios.get(`${BASE_URL}/api/web/dashboard/rejectedSingleEnrollmentUserList?userId=${userid}`)
                .then((response) => {
                    setData((prevStat) => [...prevStat, ["Rejected", response.data.data]]);
                })
                .catch((err) => {});
        }
        if (obj.approvedEnrollments) {
            Axios.get(`${BASE_URL}/api/web/dashboard/approvedSingleEnrollmentList?userId=${userid}`)
                .then((response) => {
                    setData((prevStat) => [...prevStat, ["Approved", response.data.data]]);
                })
                .catch((err) => {});
        }
        if (obj.allenrollments) {
            Axios.get(`${BASE_URL}/api/web/dashboard/EnrollmentApprovedBySingleUser?userId=${userid}`)
                .then((response) => {
                    setData((prevStat) => [...prevStat, ["All", response.data.data]]);
                })
                .catch((err) => {});
        }
        if (obj.incompleteenrollments) {
            Axios.get(`${BASE_URL}/api/web/dashboard/inCompleteSingleEnrollmentUserList?userId=${userid}`).then((response) => {
                setData((prevStat) => [...prevStat, ["Incomplete", response.data.data]]);
            });
        }
    }, []);
    return (
        <div className="flex flex-wrap justify-content-around flex-row "> 
             { 
             data.length !== 1 ?<>
            <Chart chartType="PieChart" data={data} options={options} className="flex flex-wrap justify-content-center pie-chart" />
            <Chart chartType="ColumnChart" data={data} options={options} className="flex flex-wrap justify-content-center bar-chart" /></>:undefined
              } </div>
    );
}
