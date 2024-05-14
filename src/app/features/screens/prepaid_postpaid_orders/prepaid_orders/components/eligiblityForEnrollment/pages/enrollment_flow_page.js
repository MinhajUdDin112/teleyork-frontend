import React, { useEffect, useRef, useState } from "react";
import { Steps } from "primereact/steps";
import PersonalInfoPage from "./personal_info_page";
import Eligibility from "./eligibility";
//import plan from "./plan";
import PaymentScreen from "./PaymentScreen";
import Preview from "./preview";
import Axios from "axios";
import "../css/preview.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function EnrollmentFlowPage() {
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/web/plan/all?serviceProvider=${parseLoginRes?.company}`)
            .then((res) => {
                localStorage.setItem("planprices", JSON.stringify(res?.data?.data));
            })
            .catch((err) => {});

        Axios.get(`${BASE_URL}/api/web/billing/getall`)
            .then((response) => {
                let inventoryType = [];
                for (let i = 0; i < response?.data?.data?.length; i++) {
                    let plans = [];
                    let discountobjectarray = [];
                    let discount = [];
                    let additionalfeature = [];
                    let paymentMethods = [];
                    let totaldiscounts = 0;
                    let additionaltotal = 0;
                    let additionalfeaturearray = [];
                    if (response?.data?.data[i]?.inventoryType === "SIM" && response?.data?.data[i]?.billingmodel === "PREPAID") {
                        let obj = { label: "SIM", value: response?.data?.data[i]?._id };
                        //objectforpricing[response.data.data[i].inventoryType]["oneTimeCharge"]=response.data.data[i].inventoryType.oneTimeCharge
                        inventoryType.push(obj);
                        for (let k = 0; k < response?.data?.data[i]?.monthlyCharge?.length; k++) {
                            let obj = {
                                name: response?.data?.data[i]?.monthlyCharge[k]?.name,
                                value: response?.data?.data[i]?.monthlyCharge[k]?._id,
                            };
                            plans.push(obj);
                        }
                        for (let k = 0; k < response?.data?.data[i]?.paymentMethod?.length; k++) {
                            let obj = {
                                name: response?.data?.data[i]?.paymentMethod[k],
                            };
                            paymentMethods.push(obj);
                        }
                        for (let z = 0; z < response?.data?.data[i]?.additionalFeature?.length; z++) {
                            let obj = {
                                name: response?.data?.data[i]?.additionalFeature[z]?.featureName,
                                value: response?.data?.data[i]?.additionalFeature[z]?._id,
                            };
                            additionaltotal += parseFloat(response?.data?.data[i]?.additionalFeature[z]?.featureAmount);
                            additionalfeaturearray.push((response?.data?.data[i]?.additionalFeature[z]?._id).toString());
                            additionalfeature.push(obj);
                        }

                        for (let y = 0; y < response.data.data[i].selectdiscount.length; y++) {
                            discountobjectarray.push(response?.data?.data[i]?.selectdiscount[y]?._id.toString());
                            totaldiscounts += parseFloat(response?.data?.data[i]?.selectdiscount[y]?.amount);
                        }
                        //Additional Features
                        //_id array
                        localStorage.setItem("simadditionalfeaturearray", JSON.stringify(additionalfeaturearray));

                        // Options array name and _id
                        localStorage.setItem("simadditional", JSON.stringify(additionalfeature));

                        localStorage.setItem("simadditionalfeaturearraytotal", JSON.stringify(additionalfeaturearray));
                        //totalfeatureamount
                        localStorage.setItem("simadditionaltotal", JSON.stringify(additionaltotal));
                        localStorage.setItem("simdiscount", JSON.stringify(response.data.data[i].selectdiscount));

                        //Discounts
                        //Total Discounts
                        localStorage.setItem("totalsimdiscount", JSON.stringify(totaldiscounts));
                        //discount _id array will send to backend
                        localStorage.setItem("simdiscountobjectarray", JSON.stringify(discountobjectarray));
                        localStorage.setItem("simdiscountobjectarraytotal", JSON.stringify(discountobjectarray));
                        //SIM Complete Object include additional discount and any other
                        localStorage.setItem("simpricing", JSON.stringify(response.data.data[i]));
                        //SIM Plans
                        localStorage.setItem("simplan", JSON.stringify(plans));
                        ///payments method
                        localStorage.setItem("simPaymentMethod", JSON.stringify(paymentMethods));
                    } else if (response?.data?.data[i]?.inventoryType === "WIRELESS DEVICE" && response?.data?.data[i]?.billingmodel === "PREPAID") {
                        let obj = { label: "WIRELESS DEVICE", value: response?.data?.data[i]?._id };
                        inventoryType.push(obj);
                        for (let k = 0; k < response?.data?.data[i]?.monthlyCharge?.length; k++) {
                            let obj = {
                                name: response?.data?.data[i]?.monthlyCharge[k]?.name,
                                value: response?.data?.data[i]?.monthlyCharge[k]?._id,
                            };
                            plans.push(obj);
                        }
                        for (let k = 0; k < response?.data?.data[i]?.paymentMethod?.length; k++) {
                            let obj = {
                                name: response?.data?.data[i]?.paymentMethod[k],
                            };
                            paymentMethods.push(obj);
                        }
                        for (let z = 0; z < response?.data?.data[i]?.additionalFeature?.length; z++) {
                            let obj = {
                                name: response?.data?.data[i]?.additionalFeature[z]?.featureName,
                                value: response?.data?.data[i]?.additionalFeature[z]?._id,
                            };
                            additionaltotal += parseFloat(response.data.data[i].additionalFeature[z].featureAmount);
                            additionalfeaturearray.push(response.data.data[i].additionalFeature[z]._id.toString());
                            additionalfeature.push(obj);
                        }
                        for (let y = 0; y < response.data.data[i].selectdiscount.length; y++) {
                            discountobjectarray.push(response.data.data[i].selectdiscount[y]._id.toString());
                            totaldiscounts += parseFloat(parseFloat(response.data.data[i].selectdiscount[y].amount));
                        }
                        //Device Features
                        // additional feature value and name
                        localStorage.setItem("deviceadditional", JSON.stringify(additionalfeature));
                        localStorage.setItem("deviceadditionalfeaturearraytotal", JSON.stringify(additionalfeaturearray));
                        // additionalfeaturetotal
                        localStorage.setItem("deviceadditionaltotal", JSON.stringify(additionaltotal));
                        //additional feature array object
                        localStorage.setItem("deviceadditionalfeaturearray", JSON.stringify(additionalfeaturearray));
                        //Discounts
                        //total device discount
                        localStorage.setItem("totaldevicediscount", JSON.stringify(totaldiscounts));

                        localStorage.setItem("devicediscount", JSON.stringify(response.data.data[i].selectdiscount));
                        //discount _id sennding to backend
                        localStorage.setItem("devicediscountobjectarray", JSON.stringify(discountobjectarray));

                        localStorage.setItem("devicediscountobjectarraytotal", JSON.stringify(discountobjectarray));
                        //Plans
                        //Device Plans
                        localStorage.setItem("deviceplan", JSON.stringify(plans));
                        //Complete Device Pricing including additional feature and discount
                        localStorage.setItem("devicepricing", JSON.stringify(response.data.data[i]));
                        ///payments method
                        localStorage.setItem("devicePaymentMethod", JSON.stringify(paymentMethods));
                    }
                }
                localStorage.setItem("inventoryType", JSON.stringify(inventoryType));
            })
            .catch((err) => {});
    }, []);
    const [activeIndex, setActiveIndex] = useState(0);
    const toast = useRef(null);
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const csr = parseLoginRes?._id;

    //     getting _id and enrollment id from local storage
    const zipRes = localStorage.getItem("prepaidzipData");
    const parseZipRes = JSON.parse(zipRes);
    const enrollment_id = parseZipRes?.data?.enrollmentId;
    const _id = parseZipRes?.data?._id;

    const basicRes = localStorage.getItem("prepaidbasicData");
    const parsebasicRes = JSON.parse(basicRes);
    const enrollmentid = parsebasicRes?.data?.enrollmentId;
    const id = parsebasicRes?.data?._id;
    let items;
    items = [
        {
            label: "Personal Info",
            command: (event) => {
                toast.current.show({ severity: "info", summary: "First Step", detail: event.item.label });
                setActiveIndex(0);
            },
        },
        {
            label: "Consent",
            command: (event) => {
                toast.current.show({ severity: "info", summary: "Seat Selection", detail: event.item.label });
                setActiveIndex(1);
            },
        },
        {
            label: "Product",
            command: (event) => {
                toast.current.show({ severity: "info", summary: "Seat Selection", detail: event.item.label });
                setActiveIndex(2);
            },
        },
        {
            label: "Preview",
            command: (event) => {
                toast.current.show({ severity: "info", summary: "Last Step", detail: event.item.label });
                setActiveIndex(3);
            },
        },
    ];

    let pages;
    if (zipRes) {
        pages = [
            PersonalInfoPage({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id, csr: csr }),
            Eligibility({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id, csr: csr }),
            PaymentScreen({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id, csr: csr }),
            //plan({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id, csr: csr }),
            Preview({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id, csr: csr }),
        ];
    } else if (basicRes) {
        pages = [
            PersonalInfoPage({ setActiveIndex: setActiveIndex, enrollment_id: enrollmentid, _id: id, csr: csr }),
            Eligibility({ setActiveIndex: setActiveIndex, enrollment_id: enrollmentid, _id: id, csr: csr }),
            PaymentScreen({ setActiveIndex: setActiveIndex, enrollment_id: enrollmentid, _id: id, csr: csr }),
            //plan({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id, csr: csr }),
            Preview({ setActiveIndex: setActiveIndex, enrollment_id: enrollmentid, _id: id, csr: csr }),
        ];
    } else {
        pages = [
            PersonalInfoPage({ setActiveIndex: setActiveIndex, enrollment_id: enrollmentid, _id: id, csr: csr }),
            Eligibility({ setActiveIndex: setActiveIndex, enrollment_id: enrollmentid, _id: id, csr: csr }),
            PaymentScreen({ setActiveIndex: setActiveIndex, enrollment_id: enrollmentid, _id: id, csr: csr }),
            //plan({ setActiveIndex: setActiveIndex, enrollment_id: enrollment_id, _id: _id, csr: csr }),
            Preview({ setActiveIndex: setActiveIndex, enrollment_id: enrollmentid, _id: id, csr: csr }),
        ];
    }

    return (
        <>
            <div style={{ fontFamily: "Inter" }}>
                <h5 style={{ paddingTop: "30px", marginLeft: "350px" }} className="h5">
                    ENROLLMENT ID: {basicRes ? enrollmentid : enrollment_id}
                </h5>
            </div>
            <div className="steps-demo card" style={{ paddingTop: "80px", fontFamily: "Inter" }}>
                <div className="" style={{ fontFamily: "Inter" }}>
                    <Steps style={{ fontFamily: "Inter" }} model={items} activeIndex={activeIndex} />
                </div>
                <div>{pages[activeIndex] ? pages[activeIndex] : ""}</div>
            </div>
        </>
    );
}
