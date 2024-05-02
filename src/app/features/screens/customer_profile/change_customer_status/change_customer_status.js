import Axios from "axios";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
// import { Toast } from "primereact/toast";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import React, { useState, useRef, useEffect } from "react";
import { TransferException, statusOption, prospectStatusOptions, activeStatusOptions, suspendStatusOptions, disconnectStatusOptions, connection, connectionExternally } from "./dropdown_options/options";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function ChangeCustomerStatus({ cpData, setChangeCustomerStatus, setRefreshEsn }) {
    const [isLoading, setIsLoading] = useState(false);
    //For Showing Toast Message
    // const toast = useRef(null);
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const [exceptionError, setExceptionError] = useState(false);
    //ConnectionType State
    const [connectionType, setConnectionType] = useState("");
    const [disconnectReason, setdisconnectReason] = useState("");
    //StatusType State
    const [statusTo, setStatusTo] = useState(cpData?.status);
    //Option for TransferException
    const transferExceptionOption = TransferException;
    //Option for Status
    const statusOptions = statusOption;
    //Options For Connection Type
    const connectionTypeOption = connection;

    const UpdateStatus = async () => {
        if (statusTo === "labelPrinted") {
            const dataToSend = {
                customerId: cpData?._id,
                status: statusTo,
            };
            Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend)
                .then((response) => {
                    setChangeCustomerStatus(false);
                    const successMessage = response?.data?.msg || "Success label Printed";
                    toast.success(successMessage);
                    setTimeout(() => {
                        setRefreshEsn((prev) => !prev);
                    }, 10);
                    // toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                })
                .catch((error) => {
                    const errorMessage = error.response?.data?.msg || "Disconnection Failed";
                    toast.error(errorMessage);
                    // toast.current.show({ severity: "error", summary: "Customer Status", detail: "Disconnection Failed" });
                });
        } else if (statusTo === "preShipment") {
            setIsLoading(true);
            const dataToSend = {
                customerId: cpData?._id,
                status: statusTo,
            };
            Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend)
                .then((response) => {
                    setChangeCustomerStatus(false);
                    const successMessage = response?.data?.msg || "Successfully Pre shipped";
                    toast.success(successMessage);
                    setTimeout(() => {
                        setRefreshEsn((prev) => !prev);
                    }, 10);

                    // toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                    setIsLoading(false);
                })
                .catch((error) => {
                    const errorMessage = error.response?.data?.msg || "Disconnection Failed";
                    toast.error(errorMessage);
                    // toast.current.show({ severity: "error", summary: "Customer Status", detail: "Disconnection Failed" });
                    setIsLoading(false);
                });
            setIsLoading(false);
        } else if (statusTo === "inTransit") {
            setIsLoading(true);
            const dataToSend = {
                customerId: cpData?._id,
                status: statusTo,
            };
            Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend)
                .then((response) => {
                    setChangeCustomerStatus(false);
                    const successMessage = response?.data?.msg || "Success In ";
                    toast.success(successMessage);
                    setTimeout(() => {
                        setRefreshEsn((prev) => !prev);
                    }, 10);

                    // toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                    setIsLoading(false);
                })
                .catch((error) => {
                    const errorMessage = error.response?.data?.msg || "Disconnection Failed";
                    toast.error(errorMessage);
                    // toast.current.show({ severity: "error", summary: "Customer Status", detail: "Disconnection Failed" });
                    setIsLoading(false);
                });
            setIsLoading(false);
        } else if (statusTo === "delivered") {
            setIsLoading(true);
            const dataToSend = {
                customerId: cpData?._id,
                status: statusTo,
            };
            Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend)
                .then((response) => {
                    setChangeCustomerStatus(false);
                    const successMessage = response?.data?.msg || "Successfully delivered";
                    toast.success(successMessage);
                    setTimeout(() => {
                        setRefreshEsn((prev) => !prev);
                    }, 10);

                    // toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                    setIsLoading(false);
                })
                .catch((error) => {
                    const errorMessage = error.response?.data?.msg || "Disconnection Failed";
                    toast.error(errorMessage);
                    // toast.current.show({ severity: "error", summary: "Customer Status", detail: "Disconnection Failed" });
                    setIsLoading(false);
                });
            setIsLoading(false);
        } else if (statusTo === "active" && cpData?.status === "prospect" && connectionType == "Internally") {
            setIsLoading(true);
            const dataToSend = {
                customerId: cpData?._id,
                status: statusTo,
            };
            try {
                const response = await Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend);
                if (response?.status == "200" || response?.status == "201") {
                    setChangeCustomerStatus(false);
                    const successMessage = response?.data?.msg || "Successfully Active";
                    toast.success(successMessage);
                    setTimeout(() => {
                        setRefreshEsn((prev) => !prev);
                    }, 10);

                    // toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                    setIsLoading(false);
                }
            } catch (error) {
                const errorMessage = error.response?.data?.msg || "Disconnection Failed";
                toast.error(errorMessage);
                // toast.current.show({ severity: "error", summary: "Customer Status", detail: error.response.data.msg || "Disconnection Failed" });
                setIsLoading(false);
            }
            setIsLoading(false);
        } else if (statusTo === "evaluation") {
            setIsLoading(true);
            const dataToSend = {
                customerId: cpData?._id,
                status: statusTo,
            };
            try {
                const response = await Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend);
                if (response?.status == "200" || response?.status == "201") {
                    setChangeCustomerStatus(false);
                    const successMessage = response?.data?.msg || "Successfully evaluated";
                    toast.success(successMessage);
                    setTimeout(() => {
                        setRefreshEsn((prev) => !prev);
                    }, 10);

                    // toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                    setIsLoading(false);
                }
            } catch (error) {
                toast.error("Disconnection Failed");
                // toast.current.show({ severity: "error", summary: "Customer Status", detail: error.response.data.msg || "Disconnection Failed" });
                setIsLoading(false);
            }
        } else if (statusTo === "active" && cpData?.status === "prospect" && connectionType === "Externally") {
            setIsLoading(true);
            const dataToSend = {
                enrollmentId: cpData?._id,
                userId: parseLoginRes?._id,
            };

            try {
                const response = await Axios.post(`${BASE_URL}/api/user/activateByPwg`, dataToSend);
                setIsLoading(false);

                if (response?.status === 200 || response?.status === 201) {
                    const successMessage = response?.data?.msg || "Successfully active";
                    toast.success(successMessage);
                    setTimeout(() => {
                        setRefreshEsn((prev) => !prev);
                    }, 10);

                    // toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Activated" });
                    setIsLoading(false);
                }
            } catch (error) {
                const errorMessage = error.response?.data?.msg || "Disconnection Failed";
                // toast.current.show({ severity: "error", summary: "Customer Status", detail: errorMessage });
                toast.error(errorMessage);
                setIsLoading(false);
            }

            setIsLoading(false);
        } else if (statusTo === "reconnect" && connectionType === "Externally") {
            setIsLoading(true);
            Axios.post(`${BASE_URL}/api/user/reConnectMdn`, { enrollmentId: cpData?._id })
                .then((response) => {
                    const successMessage = response?.data?.msg || "Successfully reconnected";
                    toast.success(successMessage);
                    setIsLoading(false);
                    setTimeout(() => {
                        setRefreshEsn((prev) => !prev);
                    }, 10);
                    // toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Reconnected" });
                })
                .catch((error) => {
                    console.log(error);
                    const errorMessage = error.response?.data?.error?.message ? error.response?.data?.error?.message : error.response?.data?.msg ? error.response?.data?.msg : "Reconnecting Failed";
                    toast.error(errorMessage);
                    // toast.current.show({ severity: "error", summary: "Customer Status", detail: "Reconnection Failed" });
                    setIsLoading(false);
                });
        } else if (statusTo === "reconnect" && connectionType === "Internally") {
            setIsLoading(true);
            Axios.post(`${BASE_URL}/api/user/reConnectMdn`, { enrollmentId: cpData?._id })
                .then((response) => {
                    const successMessage = response?.data?.msg || "Success reconnected";
                    toast.success(successMessage);
                    setTimeout(() => {
                        setRefreshEsn((prev) => !prev);
                    }, 10);

                    // toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Reconnected" });
                    setIsLoading(false);
                })
                .catch((error) => {
                    const errorMessage = error.response?.data?.msg || "Disconnection Failed";
                    toast.error(errorMessage);
                    // toast.current.show({ severity: "error", summary: "Customer Status", detail: "Reconnection Failed" });
                    setIsLoading(false);
                });
            setIsLoading(false);
        } else if (statusTo === "disconnected" && connectionType === "Externally") {
            setIsLoading(true);
            if (disconnectReason !== "") {
                Axios.post(`${BASE_URL}/api/user/disconnectMdnByPwg`, { enrollmentId: cpData?._id, disconnectReason: disconnectReason })
                    .then((response) => {
                        const successMessage = response?.data?.msg || "Successfully disconnected";
                        toast.success(successMessage);
                        setTimeout(() => {
                            setRefreshEsn((prev) => !prev);
                        }, 1000);

                        // toast.current.show({ severity: "Success", summary: "Customer Status", detail: "Successfully Disconnected" });
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        const errorMessage = error.response?.data?.msg || "Disconnection Failed";
                        toast.error(errorMessage);
                        // toast.current.show({ severity: "error", summary: "Customer Status", detail: errorMessage });
                        setIsLoading(false);
                    });
            } else {
                setExceptionError(true);
            }
        } else if (statusTo === "disconnected" && connectionType === "Internally") {
            setIsLoading(true);
            const dataToSend = {
                customerId: cpData?._id,
                status: statusTo,
            };
            if (disconnectReason !== "") {
                Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend)
                    .then((response) => {
                        const successMessage = response?.data?.msg || "Successfully Disconnected";
                        toast.success(successMessage);
                        setTimeout(() => {
                            setRefreshEsn((prev) => !prev);
                        }, 1000);

                        // toast.current.show({ severity: "Success", summary: "Customer Status", detail: "Successfully Disconnected" });
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        const errorMessage = error.response?.data?.msg || "Disconnection Failed";
                        toast.error(errorMessage);
                        // toast.current.show({ severity: "error", summary: "Customer Status", detail: errorMessage });
                        setIsLoading(false);
                    });
            } else {
                setExceptionError(true);
            }
        } else if (statusTo === "suspended" && connectionType === "Internally") {
            setIsLoading(true);
            const dataToSend = {
                enrollmentId: cpData?._id,
            };

            Axios.post(`${BASE_URL}/api/user/HotlineMdnByPwg`, dataToSend)
                .then((response) => {
                    const successMessage = response?.data?.msg || "Successfully Suspended";
                    toast.success(successMessage);
                    setTimeout(() => {
                        setRefreshEsn((prev) => !prev);
                    }, 10);

                    setIsLoading(false);
                })
                .catch((error) => {
                    const errorMessage = error.response?.data?.msg || "Disconnection Failed";
                    toast.error(errorMessage);
                    // toast.current.show({ severity: "error", summary: "Customer Status", detail: errorMessage });
                    setIsLoading(false);
                });
        } else if (statusTo === "suspended" && connectionType === "Externally") {
            setIsLoading(true);
            const dataToSend = {
                enrollmentId: cpData?._id,
            };

            Axios.post(`${BASE_URL}/api/user/HotlineMdnByPwg`, dataToSend)
                .then((response) => {
                    const successMessage = response?.data?.msg || "Successfully suspended";
                    toast.success(successMessage);
                    setTimeout(() => {
                        setRefreshEsn((prev) => !prev);
                    }, 10);

                    // toast.current.show({ severity: "Success", summary: "Customer Status", detail: "Successfully Disconnected" });
                    setIsLoading(false);
                })
                .catch((error) => {
                    const errorMessage = error.response?.data?.msg || "Disconnection Failed";
                    toast.error(errorMessage);
                    // toast.current.show({ severity: "error", summary: "Customer Status", detail: errorMessage });
                    setIsLoading(false);
                });
        } else if (cpData?.status === "suspended" && statusTo === "active" && connectionType === "Externally") {
            setIsLoading(true);
            const dataToSend = {
                enrollmentId: cpData?._id,
            };

            Axios.post(`${BASE_URL}/api/user/removeHotline`, dataToSend)
                .then((response) => {
                    const successMessage = response?.data?.msg || "Successfully suspended";
                    toast.success(successMessage);
                    setTimeout(() => {
                        setRefreshEsn((prev) => !prev);
                    }, 10);

                    // toast.current.show({ severity: "Success", summary: "Customer Status", detail: "Successfully Disconnected" });
                    setIsLoading(false);
                })
                .catch((error) => {
                    const errorMessage = error.response?.data?.msg || "Disconnection Failed";
                    toast.error(errorMessage);
                    // toast.current.show({ severity: "error", summary: "Customer Status", detail: errorMessage });
                    setIsLoading(false);
                });
        } else {
            toast.error("Please Select Status OR Type");
        }
    };
    return (
        <div className="flex flex-wrap flex-row justify-content-around ">
            {/* <div>
                <label className="block mt-4">Change Account Status To:</label>
                <Dropdown
                    value={statusTo}
                    onChange={(e) => {
                        setStatusTo(e.value);
                    }}
                    options={statusOptions}
                    className="field-width mt-3"
                    placeholder="Select Status"
                />
            </div> */}
            {cpData?.status === "prospect" && (
                <div>
                    <label className="block mt-4">Change Account Status To:</label>

                    <Dropdown
                        value={statusTo}
                        onChange={(e) => {
                            setStatusTo(e.value);
                        }}
                        options={prospectStatusOptions}
                        className="field-width mt-3"
                        placeholder="Select Status"
                    />
                </div>
            )}
            {cpData?.status === "active" && (
                <div>
                    <label className="block mt-4">Change Account Status To:</label>
                    <Dropdown
                        value={statusTo}
                        onChange={(e) => {
                            setStatusTo(e.value);
                        }}
                        options={activeStatusOptions}
                        className="field-width mt-3"
                        placeholder="Select Status"
                    />
                </div>
            )}
            {cpData?.status === "suspended" && (
                <div>
                    <label className="block mt-4">Change Account Status To:</label>
                    <Dropdown
                        value={statusTo}
                        onChange={(e) => {
                            setStatusTo(e.value);
                        }}
                        options={suspendStatusOptions}
                        className="field-width mt-3"
                        placeholder="Select Status"
                    />
                </div>
            )}
            {cpData?.status === "disconnected" && (
                <div>
                    <label className="block mt-4">Change Account Status To:</label>
                    <Dropdown
                        value={statusTo}
                        onChange={(e) => {
                            setStatusTo(e.value);
                        }}
                        options={disconnectStatusOptions}
                        className="field-width mt-3"
                        placeholder="Select Status"
                    />
                </div>
            )}
            {statusTo === "disconnected" ? (
                <>
                    <div>
                        <label className="block mt-4">
                            Disconnect Reason: <span className="steric">*</span>
                        </label>
                        <Dropdown
                            value={disconnectReason}
                            onChange={(e) => {
                                setdisconnectReason(e.value);
                                setExceptionError(false);
                            }}
                            options={transferExceptionOption}
                            placeholder="Select Reason"
                            className={classNames({ "p-invalid": exceptionError }, "input_text field-width mt-3")}
                        />
                        {exceptionError ? <p className="steric mt-2 ml-1">This Is Required</p> : undefined}
                    </div>
                </>
            ) : undefined}

            <div>
                <label className="block mt-4">Connection Type:</label>
                <Dropdown
                    className="field-width mt-3"
                    value={connectionType}
                    onChange={(e) => {
                        setConnectionType(e.value);
                    }}
                    options={(statusTo === "suspended" && cpData?.status === "active") || statusTo === "disconnected" ? connectionExternally : connectionTypeOption}
                    placeholder="Select Account Type"
                />
            </div>

            <div className="align-self-center mt-4">
                <Button onClick={UpdateStatus} label="Update Status " className="field-width mt-4" disabled={isLoading} icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} />
            </div>
            {/* <Toast ref={toast} /> */}
            <ToastContainer />
        </div>
    );
}
