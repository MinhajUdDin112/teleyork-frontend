import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { useLocation, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import Axios from "axios";
import "../css/service_availability.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function ServiceAvailabilityPage({ setZipVerified }) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isCreate, setIsCreate] = useState(false);
    const [pwgApiCheck, setPwgApiCheck] = useState("pending");
    const [pwgApiCheckFound, setPwgApiCheckFound] = useState(false);
    const [pwgDbCheck, setPwgDbCheck] = useState("pending");
    const [pwgDbCheckFound, setPwgDbCheckFound] = useState(false);
    const [uspsCheck, setUspsCheck] = useState("pending");
    const [uspsCheckFound, setUspsCheckFound] = useState(false);
    const [showCheckCoverage, setShowCheckCoverage] = useState(false);
    const [isManage, setIsManage] = useState(false);
    const location = useLocation();
    const currentPath = location?.pathname;
    const actionBasedChecks = () => {
        const loginPerms = localStorage.getItem("permissions");
        const parsedLoginPerms = JSON.parse(loginPerms);
        const isCreate = parsedLoginPerms.some((node) => node?.subModule.some((subNode) => subNode?.route === currentPath && subNode?.actions.some((action) => action?.name === "create")));
        setIsCreate(isCreate);

        const isManage = parsedLoginPerms.some((node) => node?.subModule.some((subNode) => subNode?.route === currentPath && subNode?.actions.some((action) => action?.name === "manage")));
        setIsManage(isManage);
    };

    useEffect(() => {
        actionBasedChecks();
    }, []);

    // Get user data from localStorage
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);

    useEffect(() => {
        localStorage.removeItem("prepaidzipData");
    }, []);

    const validationSchema = Yup.object().shape({
        zipCode: Yup.string().required("Please enter Zip code"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            zipCode: "",
        },
        onSubmit: async (values, actions) => {
            const serviceProvider = parseLoginRes?.company;
            const department = parseLoginRes?.department;
            const csr = parseLoginRes?._id;
            const carrier = "6455532566d6fad6eac59e34";
            const dataToSend = { serviceProvider, csr, department, carrier, ...values, accountType: "Prepaid" };
            setIsLoading(true);
            setShowCheckCoverage(true);
            Axios.post(`${BASE_URL}/api/user/PWGverifyZip`, dataToSend)
                .then((res) => {
                    setPwgApiCheck(false);
                    setPwgApiCheckFound(true);
                    localStorage.setItem("prepaidzipData", JSON.stringify(res.data));

                    Axios.post(`${BASE_URL}/api/user/DBverifyzip`, dataToSend)
                        .then((res) => {
                            setPwgDbCheck(false);
                            setPwgDbCheckFound(true);
                            Axios.post(`${BASE_URL}/api/user/verifyZip`, dataToSend)
                                .then((res) => {
                                    setUspsCheck(false);
                                    setUspsCheckFound(true);
                                    setIsLoading(false);
                                })
                                .catch((err) => {
                                    setUspsCheck(false);
                                    setUspsCheckFound(false);
                                    setIsLoading(false);
                                });
                        })
                        .catch((err) => {
                            setPwgDbCheck(false);
                            setPwgDbCheckFound(false);
                            Axios.post(`${BASE_URL}/api/user/verifyZip`, dataToSend)
                                .then((res) => {
                                    setUspsCheck(false);
                                    setUspsCheckFound(true);
                                })
                                .catch((err) => {
                                    setUspsCheck(false);
                                    setUspsCheckFound(false);
                                });
                        });
                })
                .catch((err) => {
                    setPwgApiCheck(false);
                    setPwgApiCheckFound(false);
                    Axios.post(`${BASE_URL}/api/user/DBverifyzip`, dataToSend)
                        .then((res) => {
                            setPwgDbCheck(false);
                            setPwgDbCheckFound(true);
                            localStorage.setItem("prepaidzipData", JSON.stringify(res.data));
                            Axios.post(`${BASE_URL}/api/user/verifyZip`, dataToSend)
                                .then((res) => {
                                    setUspsCheck(false);
                                    setUspsCheckFound(true);
                                    setIsLoading(false);
                                })
                                .catch((err) => {
                                    setUspsCheck(false);
                                    setUspsCheckFound(false);
                                    setIsLoading(false);
                                });
                        })
                        .catch((err) => {
                            setPwgDbCheck(false);
                            setPwgDbCheckFound(false);
                            Axios.post(`${BASE_URL}/api/user/verifyZip`, dataToSend)
                                .then((res) => {
                                    setUspsCheck(false);
                                    setUspsCheckFound(true);
                                    setIsLoading(false);
                                    localStorage.setItem("prepaidzipData", JSON.stringify(res.data));
                                })
                                .catch((err) => {
                                    setUspsCheck(false);
                                    setUspsCheckFound(false);
                                    setIsLoading(false);
                                });
                        });
                });
            /* setIsLoading(true);
     try {
                const response = await Axios.post(`${BASE_URL}/api/user/verifyZip`, dataToSend);

                if (response?.status === 200) {
                    localStorage.setItem("prepaidzipData", JSON.stringify(response.data)); 
              
                    setZipVerified(true);
                    setShowCheckCoverage(true)
                }
            } catch (error) {
                setErrorMessage(error?.response?.data?.msg);
                setIsLoading(false);
            }   
                 */
        },
    });

    return (
        <div className="flex flex-column justify-content-center">
            <div className="grid justify-content-center align-content-center my-5">
                <div className="cardnewenrollment ">
                    <h1 className="heading">NEW ENROLLMENT</h1>
                    <hr className="hr" />
                    <form className="my-4" onSubmit={formik.handleSubmit}>
                        <p style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: "500", paddingLeft: "20px", color: "black" }}>Please Enter The Zip Code To Check Service Availability</p>

                        {isLoading ? (
                            <InputText
                                type="text"
                                name="zipCode"
                                className="col-11 mb-3"
                                value={formik.values.zipCode}
                                style={{ marginLeft: "20px", width: "900px" }}
                                onChange={(e) => {
                                    formik.setFieldValue("zipCode", e.target.value);
                                    if (pwgApiCheck !== "pending" && pwgDbCheck !== "pending" && uspsCheck !== "pending") {
                                        formik.setFieldValue("zipCode", e.value);
                                        setShowCheckCoverage(false);
                                        setIsLoading(false);
                                        setPwgApiCheck("pending");
                                        setPwgApiCheckFound(true);
                                        setPwgDbCheck("pending");
                                        setPwgDbCheckFound(true);
                                        setUspsCheck("pending");
                                        setUspsCheckFound(true);
                                    }
                                }}
                                keyfilter={/^\d{0,5}$/}
                                minLength={5}
                                maxLength={5}
                                disabled={isLoading}
                            />
                        ) : (
                            <InputText
                                type="text"
                                name="zipCode"
                                className="col-11 mb-3"
                                value={formik.values.zipCode}
                                style={{ marginLeft: "20px", width: "900px" }}
                                onChange={(e) => {
                                    formik.setFieldValue("zipCode", e.target.value);
                                    if (pwgApiCheck !== "pending" && pwgDbCheck !== "pending" && uspsCheck !== "pending") {
                                        formik.setFieldValue("zipCode", e.value);
                                        setShowCheckCoverage(false);
                                        setIsLoading(false);
                                        setPwgApiCheck("pending");
                                        setPwgApiCheckFound(true);
                                        setPwgDbCheck("pending");
                                        setPwgDbCheckFound(true);
                                        setUspsCheck("pending");
                                        setUspsCheckFound(true);
                                    }
                                }}
                                keyfilter={/^\d{0,5}$/}
                                minLength={5}
                                maxLength={5}
                            />
                        )}

                        {formik.touched.zipCode && formik.errors.zipCode ? (
                            <p className="mt-0" style={{ color: "red", fontFamily: "Inter", marginLeft: "20px" }}>
                                {formik.errors.zipCode}
                            </p>
                        ) : null}
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        {pwgApiCheck !== "pending" && pwgDbCheck !== "pending" && uspsCheck !== "pending" ? (
                            <Button
                                style={{ marginLeft: "20px" }}
                                label={"Submit"}
                                type="button"
                                onClick={() => {
                                    localStorage.setItem("izZipVerified", "yes");
                                    setZipVerified(true);
                                }}
                                className="checkbutton"
                            />
                        ) : (
                            <Button style={{ marginLeft: "20px" }} label={"Check Coverage"} type="submit" className="checkbutton" disabled={isLoading || !isCreate} />
                        )}
                        {showCheckCoverage ? (
                            <div>
                                <Button
                                    style={{ marginLeft: "20px", marginTop: "20px" }}
                                    iconPos="right"
                                    className="chkbtn"
                                    type="button"
                                    icon={pwgApiCheck === "pending" ? "pi pi-spin pi-spinner" : pwgApiCheckFound ? "pi coverage-found pi-check" : "pi coverage-notfound pi-times"}
                                    label="Checking Through Pwg Apis "
                                />
                                <Button
                                    style={{ marginLeft: "20px", marginTop: "20px" }}
                                    iconPos="right"
                                    className="chkbtn"
                                    type="button"
                                    icon={pwgDbCheck === "pending" ? "pi pi-spin pi-spinner" : pwgDbCheckFound ? "pi coverage-found pi-check" : "pi coverage-notfound pi-times"}
                                    label="Checking Through Pwg Database Data "
                                />

                                <Button
                                    style={{ marginLeft: "20px", marginTop: "20px" }}
                                    iconPos="right"
                                    className="chkbtn"
                                    type="button"
                                    icon={uspsCheck === "pending" ? "pi pi-spin pi-spinner" : uspsCheckFound ? "pi coverage-found pi-check" : "pi coverage-notfound pi-times"}
                                    label="Checking Through USPS "
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        <Dialog className="proceed" header="PROCEEDING CONFIRMATION" headerClassName="dialogHeader" style={{ width: "40vw" }} visible={pwgApiCheck !== "pending" && pwgDbCheck !== "pending" && uspsCheck !== "pending" && !pwgApiCheckFound && !pwgDbCheckFound && !uspsCheckFound}>
                            <p>Still Want To Proceed</p>
                            <div className="mt-4 flex flex-wrap flex-row justify-content-center">
                                <Button
                                    label="Yes"
                                    style={{ backgroundColor: "#C68301", color: "white", border: "none", height: "40px", width: "70px" }}
                                    onClick={() => {
                                        const serviceProvider = parseLoginRes?.company;
                                        const department = parseLoginRes?.department;

                                        const csr = parseLoginRes?._id;
                                        const carrier = "6455532566d6fad6eac59e34";
                                        const dataToSend = { serviceProvider, csr, department, carrier, ...formik.values, accountType: "Prepaid" };

                                        Axios.post(`${BASE_URL}/api/user/withoutzip`, dataToSend)
                                            .then((res) => {
                                                localStorage.setItem("prepaidzipData", JSON.stringify(res.data));

                                                localStorage.setItem("izZipVerified", "no");
                                                setZipVerified(true);
                                            })
                                            .catch((err) => {});
                                    }}
                                />
                                <Button
                                    label="No"
                                    className="ml-4"
                                    style={{
                                        backgroundColor: "#C68301",
                                        color: "white",
                                        border: "none",
                                        height: "40px",
                                        width: "70px",
                                    }}
                                    onClick={() => {
                                        setShowCheckCoverage(false);
                                        setIsLoading(false);
                                        setPwgApiCheck("pending");
                                        setPwgApiCheckFound(true);
                                        setPwgDbCheck("pending");
                                        setPwgDbCheckFound(true);
                                        setUspsCheck("pending");
                                        setUspsCheckFound(true);
                                    }}
                                />
                            </div>
                        </Dialog>
                    </form>
                </div>
            </div>
        </div>
    );
}
