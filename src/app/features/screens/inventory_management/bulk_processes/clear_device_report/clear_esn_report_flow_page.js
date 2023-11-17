import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ClearDevice from "./clear_device/clear_device";
import ClearDeviceReport from "./clear_device_report/clear_device_report";
export default function ClearDeviceReportFlowPage() {
    const location = useLocation();

    const [page2, setPage] = useState(location.state === null ? 0 : 1);
    useEffect(() => {
        return window.history.replaceState({}, undefined);
    });

    return <div>{page2 === 0 ? <ClearDevice setPage={setPage} /> : <ClearDeviceReport setPage={setPage} />}</div>;
}
