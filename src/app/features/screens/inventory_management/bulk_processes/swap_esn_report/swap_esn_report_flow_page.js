import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SwapEsnSim from "./swap_esn_sim/swap_esn_sim";
import SwapEsnReport from "./swap_esn_sim_report/swap_esn_report";
export default function SwapEsnReportFlowPage() {
    const location = useLocation();

    const [page2, setPage] = useState(location.state === null ? 0 : 1);
    useEffect(() => {
        return window.history.replaceState({}, undefined);
    });

    return <div>{page2 === 0 ? <SwapEsnSim setPage={setPage} /> : <SwapEsnReport setPage={setPage} />}</div>;
}
