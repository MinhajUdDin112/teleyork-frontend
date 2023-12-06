import React, { useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { useEffect } from "react";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { parse } from "csv-parse/lib/sync";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const UploadBulk = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isUpload, setIsUpload] = useState(false);
    const [isLink, setIsLink] = useState();
    const [statusResponse, setStatusResponse] = useState([]);
    const [linkResponse, setLinkResponse] = useState([]);
    const [linkbuttonLoading, setLinkbuttonLoading] = useState(false)

    const onUpload = async () => {
        try {
            toast.success("File Successfully Uploaded.");
            setIsUpload(true);
        } catch (error) {
            console.log("error is", error);
        } finally {
        }
    };

    const getStatus = () => {
        setIsLoading(true);
        const timeoutId = setTimeout(async () => {
            try {
                const response = await Axios.get(`${BASE_URL}/api/user/getBatchStatus`);
                console.log("response of status is ", response?.data?.data);
                setStatusResponse(response?.data?.data);
                const finalResponse = response?.data?.data;
                const nonEmptyRejectedRowFiles = finalResponse.filter((item) => item.rejectedRowFile !== "").map((item) => item.rejectedRowFile);

                console.log("Rejected Row Files:", nonEmptyRejectedRowFiles);
                if (nonEmptyRejectedRowFiles) {
                    setIsLink(nonEmptyRejectedRowFiles);
                }
                setIsLoading(false);
            } catch (error) {
                console.log("get status error is", error?.response);
                setIsLoading(false);
            }
            setIsLoading(false);
        }, 6000);

        return () => clearTimeout(timeoutId);
    };


    const sendLink = async () => {
      setLinkbuttonLoading(true)
        try {
            const data = {
                link: isLink,
            };
            const response = await Axios.post(`${BASE_URL}/api/user/getErroredData`, data);
            console.log("link response is", response?.data?.data);
            const csvData = response?.data?.data;
            console.log("csv data is", csvData);

            // Parse the CSV data
            const records = parse(csvData, {
                columns: true,
                skip_empty_lines: true,
                relax_column_count: true,
            });

            // Set the JSON data into the state
            console.log("json record is", records);
            setLinkResponse(records);
            setLinkbuttonLoading(false)
        } catch (error) {
            console.log("link error is", error);
            setLinkbuttonLoading(false)
        }
    };

    console.log("link is", isLink);

    return (
        <>
            <ToastContainer />
            <div className="card">
                <h5>Bulk Upload</h5>
            </div>

            <div className="ml-3 flex flex-column card">
                <h5>Please Select a file.</h5>
                <div className="steric">
                    <h5>It's name should be sac-filename like (111111-example.csv) and its extension should be csv only.</h5>
                </div>

                <FileUpload
                    name="file"
                    url={`${BASE_URL}/api/user/upload`}
                    onError={(error) => {
                        console.log("error is", error?.xhr?.response);
                        const response = error?.xhr?.response;
                        const jsonString = JSON.stringify(response);
                        const splitArray = jsonString.split(",");

                        if (splitArray.length >= 4) {
                            const valueAtIndex3 = splitArray[3];
                            const valueAtIndex4 = splitArray[4];

                            toast.error("error is " + valueAtIndex3 + valueAtIndex4);
                        } else {
                            console.error("Not enough elements in the split array.");
                        }
                    }}
                    accept=".csv"
                    maxFileSize={1000000}
                    onUpload={onUpload}
                    emptyTemplate={<p className="m-0">Drag and drop files here to upload.</p>}
                />
            </div>
{isUpload?<>
  <Button className="m-5" label="Check Status" onClick={getStatus} icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} disabled={!isUpload || isLoading} />

<div className="card ml-3">
    <DataTable value={statusResponse} stripedRows tableStyle={{ minWidth: "50rem" }}>
        <Column field="batchId" header="Batch Id"></Column>
        <Column field="filename" header="File Nmae"></Column>
        <Column field="sac" header="SAC"></Column>
        <Column field="rowsProcessed" header="Rows Processed"></Column>
        <Column field="rowsRejected" header="Rows Rejected"></Column>
        <Column field="totalRows" header="Total Rows"></Column>
        <Column field="statusCode" header="Status Code"></Column>
        <Column
            field="uploadDateTime"
            header="uploadDateTime"
            body={(rowData) =>
                new Date(rowData.uploadDateTime)
                    .toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                    })
                    .replace(/\//g, "-")
            }
        />
    </DataTable>
</div>
</>:""}
           

            {isLink && isLink ? (
                <>
                    {" "}
                    <Button className="m-5" label="See Error" onClick={sendLink}  icon={linkbuttonLoading === true ? "pi pi-spin pi-spinner " : ""} disabled={linkbuttonLoading} />
                    <div className="card ml-3">
                        <DataTable value={linkResponse} stripedRows paginator rows={10} rowsPerPageOptions={[10, 25, 50]}s tableStyle={{ minWidth: "50rem" }}>
                            <Column field="Batch Row Number" header="Row Number"></Column>
                            {/* <Column field="ETC General Use" header="ETC General Use"></Column> */}
                            <Column field="Error Data" header="Error Data"></Column>
                            <Column field="Error Message" header="Error Message"></Column>
                            <Column field="Field Name" header="Field Name"></Column>
                            <Column field="MSG_Code" header="Error Code"></Column>
                            <Column field="Phone Number" header="Phone Number"></Column>
                            {/* <Column field="Warning Message" header="Warning Message"></Column> */}
                        </DataTable>
                    </div>
                </>
            ) : (
                ""
            )}
        </>
    );
};

export default UploadBulk;
