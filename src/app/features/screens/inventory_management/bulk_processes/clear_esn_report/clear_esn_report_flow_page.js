import React, { useState, useEffect } from "react";
import ClearEsnSim from "./clear_esn_sim/clear_esn_sim";
import { useLocation } from "react-router-dom";
import ClearEsnReport from "./clear_esn_sim_report/clear_esn_report";
export default function ClearEsnReportFlowPage() {
    const location = useLocation();

    const [page2, setPage] = useState(location.state === null ? 0 : 1);
    useEffect(() => {
        return window.history.replaceState({}, undefined);
    });

    return <div>{page2 === 0 ? <ClearEsnSim setPage={setPage} /> : <ClearEsnReport setPage={setPage} />}</div>;
}
