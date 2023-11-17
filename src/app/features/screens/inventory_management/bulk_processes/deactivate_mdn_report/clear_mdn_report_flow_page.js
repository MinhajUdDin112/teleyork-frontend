import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ClearMdn from "./deactivate_mdn/deactivate_mdn";
import ClearMdnReport from "./deactivate_mdn_report/deactivate_mdn_report";
export default function DeactivateMdnFlowPage() {
    const location = useLocation();

    const [page2, setPage] = useState(location.state === null ? 0 : 1);
    useEffect(() => {
        return window.history.replaceState({}, undefined);
    });

    return <div>{page2 === 0 ? <ClearMdn setPage={setPage} /> : <ClearMdnReport setPage={setPage} />}</div>;
}
