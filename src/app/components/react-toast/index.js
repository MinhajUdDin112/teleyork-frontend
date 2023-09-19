import React, { useEffect, useRefs } from "react";
import { Toast } from "primereact/toast";

function Toasts({ success, error }) {
    const toast = useRefs(null);
    debugger;
    useEffect(() => {
        if (success) {
            toast.current.show({ severity: "success", summary: "Info", detail: success });
        }
        if (error) {
            toast.current.show({ severity: "error", summary: "info", detail: error });
        }
    }, [success, error]);

    return <Toast ref={toast} />;
}

export default Toasts;
