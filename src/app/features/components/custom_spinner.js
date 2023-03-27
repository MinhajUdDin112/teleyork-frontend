import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

export default function CustomLoading() {
    return (
        <div className="text-center">
            <ProgressSpinner />
        </div>
    );
}
