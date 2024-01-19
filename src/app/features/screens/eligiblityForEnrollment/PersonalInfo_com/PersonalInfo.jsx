import React, { useEffect } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import { useDispatch } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import classNames from "classnames";
import moment from "moment/moment";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const PersonalInfo = ({ handleNext, enrollment_id, _id, csr }) => {
    const [checkdoberror, setCheckDOBError] = useState(false);

    const startYear = 1900;
    const endYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const yearOptions = Array.from({ length: endYear - startYear + 1 }, (_, index) => {
        const year = endYear - index; // Adjusted to generate years in descending order
        return { label: year.toString(), value: year };
    });
    const customItemTemplate = (option) => <div style={{ marginTop: "-10px", marginBottom: "-10px" }}>{option.label}</div>;
    const monthOptions = [
        { label: "Jan-01", value: 1 },
        { label: "Feb-02", value: 2 },
        { label: "Mar-03", value: 3 },
        { label: "Apr-04", value: 4 },
        { label: "May-05", value: 5 },
        { label: "Jun-06", value: 6 },
        { label: "Jul-07", value: 7 },
        { label: "Aug-08", value: 8 },
        { label: "Sep-09", value: 9 },
        { label: "Oct-10", value: 10 },
        { label: "Nov-11", value: 11 },
        { label: "Dec-12", value: 12 },
    ];
    const [eSim, seteSim] = useState(false);
    const [selectedOption, setSelectedOption] = useState("email");
    const [isSelfReceive, setIsSelfReceive] = useState(true);
    const [isHouseHold, setIsHouseHold] = useState(false);
    const [acp, setAcp] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [dayerror, setDayError] = useState(false);
    const [montherror, setMonthError] = useState(false);
    const [yearerror, setYearError] = useState(false);
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("This is Required"),
        lastName: Yup.string().required("This is Required"),
        SSN: Yup.string().required("This is Required."),
        contact: Yup.string().required("This is Required."),
        email: Yup.string().email().required("This is Required."),
        salesChannel: Yup.string().required("This is Required."),
        BenifitFirstName: Yup.string().when("isSelfReceive", {
            is: false,
            then: () => Yup.string().required("This field is required"),
            otherwise: () => Yup.string().notRequired(),
        }),

        BenifitLastName: Yup.string().when("isSelfReceive", {
            is: false,
            then: () => Yup.string().required("This field is required"),
            otherwise: () => Yup.string().notRequired(),
        }),
        BenifitSSN: Yup.string().when("isSelfReceive", {
            is: false,
            then: () => Yup.string().required("This field is required"),
            otherwise: () => Yup.string().notRequired(),
        }),
        BenifitDOB: Yup.date().when("isSelfReceive", {
            is: false,
            then: () => Yup.date().nullable().required("This field is required").max(new Date(), "DOB cannot be in the future"),
            otherwise: () => Yup.string().notRequired(),
        }),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            SSN: "",
            DOB: "",
            year: null,
            month: null,
            day: null,
            contact: "",
            drivingLicense: "",
            email: "",
            ESim: "",
            bestWayToReach: "",
            isSelfReceive: "",
            BenifitFirstName: "",
            BenifitMiddleName: "",
            BenifitLastName: "",
            BenifitSSN: "",
            BenifitDOB: "",
            isACP: acp,
            salesChannel: "",
        },
        onSubmit: async (values, actions) => {
            if (selectedDay === null || selectedYear === null || selectedMonth === null) {
                setCheckDOBError(true);
            } else {
                const dateObject = new Date(selectedYear, formik.values.month - 1, formik.values.day);
                const isoString = dateObject.toISOString();

                const selectedDate = isoString;
              
                const formattedDate = selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : "";
              

                const userId = _id;

                const dataToSend = {
                    csr: csr,
                    userId: userId,
                    firstName: formik.values.firstName,
                    middleName: formik.values.middleName,
                    lastName: formik.values.lastName,
                    suffix: formik.values.suffix,
                    SSN: formik.values.SSN,
                    DOB: formattedDate,
                    contact: formik.values.contact,
                    drivingLicense: formik.values.drivingLicense,
                    email: formik.values.email,
                    ESim: formik.values.ESim,
                    bestWayToReach: formik.values.bestWayToReach,
                    isSelfReceive: formik.values.isSelfReceive,
                    BenifitFirstName: formik.values.BenifitFirstName,
                    BenifitMiddleName: formik.values.BenifitMiddleName,
                    BenifitLastName: formik.values.BenifitLastName,
                    BenifitSSN: formik.values.BenifitSSN,
                    BenifitDOB: formik.values.BenifitDOB,
                    isACP: acp, 
                    salesChannel:formik.values.salesChannel
                };

                setIsLoading(true);
                try {
                    const response = await Axios.post(`${BASE_URL}/api/user/initialInformation`, dataToSend);
                    if (response?.status === 200 || response?.status === 201) {
                        localStorage.setItem("basicData", JSON.stringify(response.data));
                        toast.success("information saved Successfully");
                        handleNext();
                    }
                } catch (error) {
                    toast.error(error?.response?.data?.msg);
                    setIsLoading(false);
                }
            }
        },
    });

    useEffect(() => {
        formik.setFieldValue("ESim", eSim);
    }, [eSim]);

    useEffect(() => {
        formik.setFieldValue("bestWayToReach", selectedOption);
    }, [selectedOption]);

    useEffect(() => {
        formik.setFieldValue("isSelfReceive", isSelfReceive);
    }, [isSelfReceive]);
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    const handleESim = (e) => {
        seteSim(e.target.value);
    };

    const handleRadio = (value) => {
        setIsSelfReceive(value === "myself");
        if (value === "somebody") {
            setIsHouseHold(true);
        } else {
            setIsHouseHold(false);
        }
    };

    const handleACP = (e) => {
        if (formik.values.isACP == true) {
            formik.values.isACP = false;
            setAcp(false);
        } else {
            formik.values.isACP = true;
            setAcp(true);
        }
    };
    const options = [
        { label: "Select", value: "" },
        { label: "JR.", value: "JR." },
        { label: "SR.", value: "SR." },
        { label: "II", value: "II" },
        { label: "III", value: "III" },
        { label: "IV", value: "IV" },
        { label: "V", value: "V" },
    ];
    const disableSuggestion = () => null;
    const basicResponse = localStorage.getItem("basicData");
    const parsebasicResponse = JSON.parse(basicResponse);
    const [dayoption, setDayOptions] = useState(null);
    //get zipData
    const zipResponse = localStorage.getItem("zipData");
    const parsezipResponse = JSON.parse(zipResponse);

    useEffect(() => {
        if (formik.values.month === 1 || formik.values.month === 3 || formik.values.month === 5 || formik.values.month === 7 || formik.values.month === 8 || formik.values.month === 10 || formik.values.month === 12) {
            const startDay = 1;
            const endDay = 31;
            const option = Array.from({ length: endDay - startDay + 1 }, (_, index) => {
                const day = startDay + index;
                return { label: day.toString(), value: day };
            });
            setDayOptions(option);
            if (formik.values.day !== null && formik.values.year !== null) {
                const dateObject = new Date(formik.values.year, formik.values.month - 1, formik.values.day);
                const isoString = dateObject.toISOString();
                formik.setFieldValue("DOB", isoString);
            } else {
                formik.setFieldValue("DOB", "");
            }
        } else if (formik.values.month === 4 || formik.values.month === 6 || formik.values.month === 9 || formik.values.month === 11) {
            const startDay = 1;
            const endDay = 30;
            const option = Array.from({ length: endDay - startDay + 1 }, (_, index) => {
                const day = startDay + index;
                return { label: day.toString(), value: day };
            });
            setDayOptions(option);
            if (formik.values.day !== null && formik.values.year !== null) {
                if (formik.values.day > 30) {
                    formik.setFieldValue("day", 30);
                    setSelectedDay(30);
                }
                const dateObject = new Date(formik.values.year, formik.values.month - 1, formik.values.day);
                const isoString = dateObject.toISOString();
                formik.setFieldValue("DOB", isoString);
            } else {
                formik.setFieldValue("DOB", "");
            }
        } else {
            if (formik.values.year !== null) {
                if (isLeapYear(formik.values.year)) {
                    if (formik.values.month === 2) {
                        const startDay = 1;
                        const endDay = 29;
                        const option = Array.from({ length: endDay - startDay + 1 }, (_, index) => {
                            const day = startDay + index;
                            return { label: day.toString(), value: day };
                        });
                        setDayOptions(option);
                        if (formik.values.day !== null) {
                            if (formik.values.day > 29) {
                                formik.setFieldValue("day", 29);
                                setSelectedDay(29);
                            }
                            const dateObject = new Date(formik.values.year, formik.values.month - 1, formik.values.day);
                            const isoString = dateObject.toISOString();
                            formik.setFieldValue("DOB", isoString);
                        } else {
                            formik.setFieldValue("DOB", "");
                        }
                    }
                } else {
                    const startDay = 1;
                    const endDay = 28;
                    const option = Array.from({ length: endDay - startDay + 1 }, (_, index) => {
                        const day = startDay + index;
                        return { label: day.toString(), value: day };
                    });
                    setDayOptions(option);
                    if (formik.values.day !== null && formik.values.year !== null) {
                        if (formik.values.day > 28) {
                            formik.setFieldValue("day", 28);
                            setSelectedDay(28);
                        }
                        const dateObject = new Date(formik.values.year, formik.values.month - 1, formik.values.day);
                        const isoString = dateObject.toISOString();
                        formik.setFieldValue("DOB", isoString);
                    } else {
                        formik.setFieldValue("DOB", "");
                    }
                }
            } else {
                const startDay = 1;
                const endDay = 29;
                const option = Array.from({ length: endDay - startDay + 1 }, (_, index) => {
                    const day = startDay + index;
                    return { label: day.toString(), value: day };
                });
                setDayOptions(option);
            }
        }
    }, [formik.values.month]);

    useEffect(() => {
        if (isLeapYear(formik.values.year)) {
            if (formik.values.month === 2) {
                const startDay = 1;
                const endDay = 29;
                const option = Array.from({ length: endDay - startDay + 1 }, (_, index) => {
                    const day = startDay + index;
                    return { label: day.toString(), value: day };
                });
                setDayOptions(option);
            }
        } else {
            if (formik.values.month === 2) {
                const startDay = 1;
                const endDay = 28;

                const option = Array.from({ length: endDay - startDay + 1 }, (_, index) => {
                    const day = startDay + index;
                    return { label: day.toString(), value: day };
                });
                setDayOptions(option);
            }
        }
    }, [formik.values.year]);
    function isLeapYear(year) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (!isSelfReceive) {
            setIsHouseHold(true);
        }
    }, [isSelfReceive]);

    //check customer Duplication

    useEffect(() => {
        const fetchData = async () => {
            if (parsezipResponse && !basicResponse) {
                if (formik.values.contact.length > 9) {
                    const data = {
                        contact: formik.values.contact,
                    };

                    try {
                        const response = await Axios.post(`${BASE_URL}/api/user/checkCustomerDuplication`, data);

                        setIsDuplicate(false);
                    } catch (error) {
                        toast.error(error?.response?.data?.msg);
                        setIsDuplicate(true);
                    }
                }
            }
        };

        fetchData();
    }, [formik.values.contact]);
    useEffect(() => {
        const dobString = parsebasicResponse?.data?.DOB;

        if (dobString) {
            // set data in feilds from local storage
            setSelectedYear(new Date(parsebasicResponse?.data?.DOB).getFullYear());
            setSelectedMonth(new Date(parsebasicResponse?.data?.DOB).getMonth() + 1);
            setSelectedDay(new Date(parsebasicResponse?.data?.DOB).getDate());
            formik.setFieldValue("firstName", parsebasicResponse?.data?.firstName);
            formik.setFieldValue("middleName", parsebasicResponse?.data?.middleName);
            formik.setFieldValue("lastName", parsebasicResponse?.data?.lastName);
            formik.setFieldValue("SSN", parsebasicResponse?.data?.SSN);
            formik.setFieldValue("DOB", new Date(parsebasicResponse?.data?.DOB));
            formik.setFieldValue("month", new Date(parsebasicResponse?.data?.DOB).getMonth() + 1);
            formik.setFieldValue("day", new Date(parsebasicResponse?.data?.DOB).getDate());
            formik.setFieldValue("year", new Date(parsebasicResponse?.data?.DOB).getFullYear());
            formik.setFieldValue("email", parsebasicResponse?.data?.email);
            formik.setFieldValue("suffix", parsebasicResponse?.data?.suffix);
            formik.setFieldValue("contact", parsebasicResponse?.data?.contact);
            formik.setFieldValue("drivingLicense", parsebasicResponse?.data?.drivingLicense);
            formik.setFieldValue("ESim", parsebasicResponse?.data?.ESim);
            formik.setFieldValue("bestWayToReach", parsebasicResponse?.data?.bestWayToReach);
            formik.setFieldValue("isSelfReceive", parsebasicResponse?.data?.isSelfReceive);
            formik.setFieldValue("BenifitFirstName", parsebasicResponse?.data?.BenifitFirstName);
            formik.setFieldValue("BenifitMiddleName", parsebasicResponse?.data?.BenifitMiddleName);
            formik.setFieldValue("BenifitLastName", parsebasicResponse?.data?.BenifitLastName);
            formik.setFieldValue("BenifitDOB", new Date(parsebasicResponse?.data?.BenifitDOB));
            formik.setFieldValue("BenifitSSN", parsebasicResponse?.data?.BenifitSSN);
            formik.setFieldValue("isACP", parsebasicResponse?.data?.isACP);
            formik.setFieldValue("salesChannel",parsebasicResponse?.data?.salesChannel)
            //chnage state
            seteSim(parsebasicResponse?.data?.ESim);
            setSelectedOption(parsebasicResponse?.data?.bestWayToReach);
            setAcp(parsebasicResponse?.data?.isACP);
            setIsSelfReceive(parsebasicResponse?.data?.isSelfReceive);
        }
    }, []);

    const handlePaste = (event) => {
        event.preventDefault();
        toast.warning("Pasting is not allowed in this field.");
    };
    //salesChannel Channel Options
    const salesChannelOptions = [
        {
            label: "Web Consent",
            value: "Web Consent",
        },
        {
            label: "Old Facebook",
            value: "Old Facebook",
        },
        {
            label: "New Facebook",
            value: "New Facebook",
        },
        {
            label: "Auto",
            value: "Auto",
        },
        {
            label: "Email",
            value: "Email",
        },
        {
            label: "SMM",
            value: "SMM",
        },
    ];

    return (
        <>
            <ToastContainer />
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-row justify-content-between align-tems-center mb-2 sticky-buttons">
                    <h5 className="font-bold enroll">ENROLLMENT ID: {enrollment_id}</h5>
                    <Button
                        label="Continue"
                        type="submit"
                        onClick={() => {
                            if (selectedDay === null || selectedMonth === null || selectedYear === null) {
                                if (selectedDay === null) {
                                    setDayError(true);
                                }
                                if (selectedYear === null) {
                                    setYearError(true);
                                }
                                if (selectedMonth === null) {
                                    setMonthError(true);
                                }
                                setCheckDOBError(true);
                            }
                        }}
                        icon={isLoading === true ? "pi pi-spin pi-spinner " : ""}
                        disabled={isLoading || isDuplicate}
                    />
                </div>
                <div className="flex flex-wrap justify-content-left ">
                    <div className="field-width2">
                        <label className="field_label mb-2 font-semibold">
                            Sales Channel <span className="steric">*</span>
                        </label>
                        <Dropdown placeholder="Select Channel" id="salesChannel" className={classNames({ "p-invalid": isFormFieldValid("salesChannel") }, "input_text w-full mb-2")} options={salesChannelOptions} value={formik.values.salesChannel} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {getFormErrorMessage("salesChannel")}
                    </div>
                </div>
                <p>To apply for the Affordable Connectivity program, complete all sections of this form, initial each agreement statement, and sign the final page.</p>
                <p className="text-xl font-semibold">What is your full legal name?</p>
                <p>Please provide the name that appears on official documents such as your Social Security Card or State ID, not a nickname.</p>

                <div className="p-fluid formgrid grid">
                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                            First Name <span className="steric">*</span>
                        </label>
                        <InputText
                            id="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("firstName") }, "input_text")}
                            keyfilter={/^[a-zA-Z\s]*$/}
                            minLength={3}
                            maxLength={20}
                            autoComplete="new-password"
                            style={{ textTransform: "uppercase" }}
                        />
                        {getFormErrorMessage("firstName")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">Middle Name</label>
                        <InputText id="middleName" value={formik.values.middleName} onChange={formik.handleChange} onBlur={formik.handleBlur} keyfilter={/^[a-zA-Z\s]*$/} maxLength={10} autoComplete="off" style={{ textTransform: "uppercase" }} />
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                            Last Name <span className="steric">*</span>
                        </label>
                        <InputText
                            id="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={classNames({ "p-invalid": isFormFieldValid("lastName") }, "input_text")}
                            keyfilter={/^[a-zA-Z\s]*$/}
                            minLength={3}
                            maxLength={20}
                            autoComplete="off"
                            style={{ textTransform: "uppercase" }}
                        />
                        {getFormErrorMessage("lastName")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">Suffix</label>
                        <Dropdown
                            id="suffix"
                            options={options}
                            value={formik.values.suffix}
                            onChange={(e) => {
                                formik.setFieldValue("suffix", e.value);
                                formik.handleChange(e);
                            }}
                            onBlur={formik.handleBlur}
                        />
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                            SSN <span className="steric">*</span> <small>(Last 4 Digits)</small>
                        </label>
                        <InputText type="text" id="SSN" value={formik.values.SSN} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ "p-invalid": isFormFieldValid("SSN") }, "input_text")} keyfilter={/^\d{0,4}$/} maxLength={4} minLength={4} />
                        {getFormErrorMessage("SSN")}
                    </div>

                    <div className="field col-12 md:col-6">
                        <label className="field_label">
                            DOB <span className="steric">*</span> <small>(MM/DD/YYYY)</small>
                        </label>
                        <div className="flex flex-wrap  justify-content-center flex-row">
                            <Dropdown
                                placeholder="Month"
                                value={formik.values.month}
                                id="month"
                                onChange={(e) => {
                                    if (selectedYear !== null && selectedDay !== null) {
                                        setCheckDOBError(false);
                                    }
                                    setMonthError(false);
                                    formik.handleChange(e);

                                    formik.handleChange(e);
                                   
                                    setSelectedMonth(e.value);
                                }}
                                options={monthOptions}
                                className={classNames({ "p-invalid": montherror }, "input_text md-col-3 col-4")}
                            />
                            <Dropdown
                                placeholder="Day"
                                value={formik.values.day}
                                id="day"
                                onChange={(e) => {
                                    if (selectedYear !== null && selectedMonth !== null) {
                                        setCheckDOBError(false);
                                    }
                                    setDayError(false);
                                    formik.handleChange(e);
                                    setSelectedDay(e.value);
                                    if (formik.values.month !== null && formik.values.year !== null) {
                                        const dateObject = new Date(formik.values.year, formik.values.month - 1, e.value);
                                        const isoString = dateObject.toISOString();
                                        formik.setFieldValue("DOB", isoString);
                                    }
                                }}
                                options={dayoption}
                                className={classNames({ "p-invalid": dayerror }, "input_text md-col-3 col-4")}
                            />
                            <Dropdown
                                placeholder="Year"
                                className={classNames({ "p-invalid": yearerror }, "input_text md-col-3 col-4")}
                                value={formik.values.year}
                                name="year"
                                itemTemplate={customItemTemplate}
                                onChange={(e) => {
                                    if (selectedMonth !== null && selectedDay !== null) {
                                        setCheckDOBError(false);
                                    }
                                    setYearError(false);
                                    setSelectedYear(e.value);
                                    if (formik.values.month !== null && formik.values.day !== null) {
                                        if (isLeapYear(e.value)) {
                                            if (formik.values.month === 2) {
                                                if (formik.values.day <= 29) {
                                                    const dateObject = new Date(e.value, formik.values.month - 1, formik.values.day);
                                                    const isoString = dateObject.toISOString();

                                                    formik.setFieldValue("DOB", isoString);
                                                } else {
                                                    formik.setFieldValue("day", 29);
                                                    setSelectedDay(e.value);
                                                    const dateObject = new Date(e.value, formik.values.month - 1, 29);
                                                    const isoString = dateObject.toISOString();

                                                    formik.setFieldValue("DOB", isoString);
                                                }
                                            }
                                        } else {
                                            if (formik.values.month === 2) {
                                                if (formik.values.day > 28) {
                                                    formik.setFieldValue("day", 28);
                                                    setSelectedDay(28);
                                                    const dateObject = new Date(e.value, formik.values.month - 1, 28);
                                                    const isoString = dateObject.toISOString();

                                                    formik.setFieldValue("DOB", isoString);
                                                } else {
                                                    const dateObject = new Date(e.value, formik.values.month - 1, formik.values.day);
                                                    const isoString = dateObject.toISOString();

                                                    formik.setFieldValue("DOB", isoString);
                                                }
                                            }
                                        }
                                        formik.handleChange(e);
                                    } else {
                                        formik.handleChange(e);
                                    }
                                }}
                                options={yearOptions}
                            />
                        </div>
                        {checkdoberror ? (
                            <p className="steric mt-1" style={{ color: "#e24c4c" }}>
                                This is required
                            </p>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">Driving License</label>
                        <InputText id="drivingLicense" value={formik.values.drivingLicense} onChange={formik.handleChange} onBlur={formik.handleBlur} keyfilter={/^[a-zA-Z0-9]*$/} />
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                            Email <span className="steric">*</span>
                        </label>
                        <InputText id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ "p-invalid": isFormFieldValid("email") }, "input_text")} />
                        {getFormErrorMessage("email")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label" htmlFor="contact">
                            Contact Number <span className="steric">*</span>
                        </label>

                        <InputText
                            onChange={formik.handleChange}
                            id="contact"
                            value={formik.values.contact}
                            onBlur={formik.handleBlur}
                            className={classNames({ "p-invalid": isFormFieldValid("contact") }, "input_text")}
                            minLength={10}
                            maxLength={10}
                            keyfilter={/^[0-9]*$/}
                            pattern="^(?!1|0|800|888|877|866|855|844|833).*$"
                        />
                        {getFormErrorMessage("contact")}
                    </div>
                </div>
            </form>
            <div className="col-6 mb-3 p-0">
                <p className="font-semibold"> Required E-Sim?</p>
                <div className="flex flex-wrap mt-2">
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton id="ESIm" value={false} checked={eSim === false} onChange={(e) => handleESim(e)}></RadioButton>
                        <label className="ml-2">NO</label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton id="ESIm" value={true} checked={eSim === true} onChange={(e) => handleESim(e)}></RadioButton>
                        <label className="ml-2">Yes</label>
                        <div />
                    </div>
                </div>
            </div>
            <div className="col-6 mb-3 p-0">
                <p className="font-semibold">What is the best way to reach you?</p>
                <div className="flex flex-wrap mt-4">
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="email" name="email" value="email" onChange={(e) => setSelectedOption(e.value)} checked={selectedOption === "email"} />
                        <label htmlFor="email" className="ml-2">
                            Email
                        </label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="Phone" name="phone" value="phone" onChange={(e) => setSelectedOption(e.value)} checked={selectedOption === "phone"} />
                        <label htmlFor="phone" className="ml-2">
                            Phone
                        </label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="message" name="message" value="message" onChange={(e) => setSelectedOption(e.value)} checked={selectedOption === "message"} />
                        <label htmlFor="message" className="ml-2">
                            Text Message
                        </label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="mail" name="mail" value="mail" onChange={(e) => setSelectedOption(e.value)} checked={selectedOption === "mail"} />
                        <label htmlFor="mail" className="ml-2">
                            Mail
                        </label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="any" name="any" value="any" onChange={(e) => setSelectedOption(e.value)} checked={selectedOption === "any"} />
                        <label htmlFor="any" className="ml-2">
                            Any
                        </label>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <p className="font-semibold">Who is receiving government assistance?</p>
                <div className="flex">
                    <div className="flex align-items-center">
                        <RadioButton inputId="myself" value="myself" name="myself" onChange={() => handleRadio("myself")} checked={isSelfReceive} />
                        <label className="ml-2">Myself</label>
                    </div>
                    <div className="flex align-items-center ml-2">
                        <RadioButton inputId="somebody" value="somebody" name="somebody" onChange={() => handleRadio("somebody")} checked={!isSelfReceive} />
                        <label className="ml-2">Somebody Else in the Household</label>
                    </div>
                </div>
            </div>

            {isHouseHold && (
                <div>
                    <div className="mt-4">
                        <p className="font-semibold">Information of benefit qualifying person</p>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    First Name <span className="steric">*</span>
                                </label>
                                <InputText className="mb-3" name="BenifitFirstName" value={formik.values.BenifitFirstName} onChange={formik.handleChange} keyfilter={/^[a-zA-Z\s]*$/} minLength={3} maxLength={20} style={{ textTransform: "uppercase" }} />
                                {getFormErrorMessage("BenifitFirstName")}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">Middle Name</label>
                                <InputText
                                    id="BenifitMiddleName"
                                    value={formik.values.BenifitMiddleName}
                                    onChange={formik.handleChange}
                                    className={classNames({ "p-invalid": isFormFieldValid("BenifitMiddleName") }, "input_text")}
                                    keyfilter={/^[a-zA-Z\s]*$/}
                                    minLength={3}
                                    maxLength={20}
                                    style={{ textTransform: "uppercase" }}
                                />
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    Last Name <span className="steric">*</span>
                                </label>
                                <InputText className="mb-3" name="BenifitLastName" value={formik.values.BenifitLastName} onChange={formik.handleChange} keyfilter={/^[a-zA-Z\s]*$/} minLength={3} maxLength={20} style={{ textTransform: "uppercase" }} />
                                {getFormErrorMessage("BenifitLastName")}
                            </div>

                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    DOB <span className="steric">*</span> <small>(MM/DD/YYYY)</small>
                                </label>
                                <Calendar onPaste={handlePaste} className="mb-3" name="BenifitDOB" value={formik.values.BenifitDOB} onChange={formik.handleChange} showIcon />
                                {getFormErrorMessage("BenifitDOB")}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    SSN <span className="steric">*</span> <small>(Last 4 Digits)</small>
                                </label>
                                <InputText type="text" className="mb-3" name="BenifitSSN" value={formik.values.BenifitSSN} onChange={formik.handleChange} keyfilter={/^\d{0,4}$/} maxLength={4} minLength={4} />
                                {getFormErrorMessage("BenifitSSN")}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4">
                <h3>Affordable Connectivity Program (ACP) Consent</h3>
                <div className="sp_small">
                    <Checkbox
                        id="isACP"
                        checked={acp}
                        onChange={(e) => {
                            handleACP(e);
                            formik.handleChange(e);
                        }}
                        className={classNames({ "p-invalid": isFormFieldValid("isACP") }, "input_mask")}
                    />
                    <label className="p-checkbox-label mx-2">
                        By proceeding with your application, you acknowledge and understand that the Affordable Connectivity Program is an FCC benefit initiative that lowers your monthly broadband bill. This program has an indefinite duration, and you will receive a 30-day notice upon its
                        conclusion, after which you can choose to maintain your plan at the undiscounted rate. As a participant, you have the option to transfer your ACP benefit to another service provider. It's important to note that the Affordable Connectivity Program offers a single monthly
                        service discount and one device discount per household
                    </label>
                    {getFormErrorMessage("isACP")}
                </div>
            </div>
        </>
    );
};

export default PersonalInfo;
