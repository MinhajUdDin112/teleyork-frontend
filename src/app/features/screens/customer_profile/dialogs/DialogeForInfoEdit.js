import React, { useEffect } from "react";
import {  useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import {  ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import classNames from "classnames";
import moment from "moment/moment";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const DialogeForInfoEdit=({cpData,setRefresh,setIsEdit})=>{
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
        address1: Yup.string().required("Address is required"),
        city: Yup.string().required("city is required"),
        state: Yup.string().required("state is required"),
        zip: Yup.string().required("zip is required"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            firstName: "",
            lastName: "",
            SSN: "",
            DOB: "",
            year: null,
            month: null,
            day: null,
            contact: "",
            email: "",
            maidenMotherName:"",
            alternateContact:"",
            address1: "",
            address2: " ",
            zip: "",
            city: "",
            state: "",
            mailingAddress1: "",
            mailingZip: "",
            mailingCity: "",
            mailingState: "",
        },
        onSubmit: async (values, actions) => {
            if (selectedDay === null || selectedYear === null || selectedMonth === null) {
                setCheckDOBError(true);
            } else {
                const dateObject = new Date(selectedYear, formik.values.month - 1, formik.values.day);
                const isoString = dateObject.toISOString();
                const selectedDate = isoString; 
                const formattedDate = selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : "";
              
                const dataToSend = {
                   
                    firstName: formik.values.firstName,
                    lastName: formik.values.lastName,
                    SSN: formik.values.SSN,
                    DOB: formattedDate,
                    contact: formik.values.contact,
                    email: formik.values.email,
                    maidenMotherName:formik.values.maidenMotherName,
                    alternateContact:formik.values.alternateContact,
                    address1: formik.values.address1,
                    address2: formik.values.address2,
                    zip: formik.values.zip,
                    city: formik.values.city,
                    state: formik.values.state,
                    mailingAddress1: formik.values.mailingAddress1,
                    mailingZip: formik.values.mailingZip,
                    mailingCity: formik.values.mailingCity,
                    mailingState: formik.values.mailingState,
                };

                setIsLoading(true);
                try {
                    const response = await Axios.patch(`${BASE_URL}/api/user?enrollmentId=${cpData?._id}`, dataToSend);
                    if (response?.status === 200 || response?.status === 201) {  
                        toast.success("information Updated Successfully"); 
                        localStorage.removeItem("basicData")
                        localStorage.removeItem("address")
                        setTimeout(()=>{
setRefresh(true)
setIsEdit(false)
                        },[1000])
                    }
                } catch (error) {
                    
                    toast.error(error?.response?.data?.msg[0]);
                    setIsLoading(false);
                }
                setIsLoading(false);
            }
        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
  
    const [dayoption, setDayOptions] = useState(null);
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


    //check customer Duplication

    // useEffect(() => {
    //     const fetchData = async () => {
          
    //         if (parsezipResponse && !basicResponse) {
    //             if (formik.values.contact.length > 9 ) {           
    //         const data = {
    //             contact: formik.values.contact,
    //             accountType:"Postpaid",
    //             alternateContact:""
    //         };
    //         try {
    //             const response = await Axios.post(`${BASE_URL}/api/user/checkCustomerDuplication`, data);
    //             setIsDuplicate(false);
    //         } catch (error) {
    //             toast.error(error?.response?.data?.msg);
    //         setIsDuplicate(true);        
    //     }
                  
    //             }
    //         }
    //     };

    //     fetchData();
    // }, [formik.values.contact  ]);

    // useEffect(() => {
    //     const fetchData = async () => {
          
    //         if (parsezipResponse && !basicResponse) {
    //             if (formik.values.alternateContact.length > 9 ) {           
    //         const data = {
    //             contact: "",
    //             accountType:"Postpaid",
    //             alternateContact:formik.values.alternateContact
    //         };
    //         try {
    //             const response = await Axios.post(`${BASE_URL}/api/user/checkCustomerDuplication`, data);
    //             setIsDuplicate(false);
    //         } catch (error) {
    //             toast.error(error?.response?.data?.msg);
    //         setIsDuplicate(true);        
    //     }
                  
    //             }
    //         }
    //     };

    //     fetchData();
    // }, [formik.values.alternateContact  ]);

    const basicResponse = localStorage.getItem("basicData");
    const parsebasicResponse = JSON.parse(basicResponse);
    const addressResponse = localStorage.getItem("address");
    const parseaddressResponse = JSON.parse(addressResponse);

    useEffect(() => {
        const dobString = parsebasicResponse?.DOB;
        if (dobString) {
            // set data in feilds from local storage
            setSelectedYear(new Date(parsebasicResponse?.DOB).getFullYear());
            setSelectedMonth(new Date(parsebasicResponse?.DOB).getMonth() + 1);
            setSelectedDay(new Date(parsebasicResponse?.DOB).getDate());
            formik.setFieldValue("firstName", parsebasicResponse?.firstName);
            formik.setFieldValue("lastName", parsebasicResponse?.lastName);
            formik.setFieldValue("SSN", parsebasicResponse?.SSN);
            formik.setFieldValue("DOB", new Date(parsebasicResponse?.data?.DOB));
            formik.setFieldValue("month", new Date(parsebasicResponse?.DOB).getMonth() + 1);
            formik.setFieldValue("day", new Date(parsebasicResponse?.DOB).getDate());
            formik.setFieldValue("year", new Date(parsebasicResponse?.DOB).getFullYear());
            formik.setFieldValue("email", parsebasicResponse?.email);
            formik.setFieldValue("contact", parsebasicResponse?.contact);
            formik.setFieldValue("maidenMotherName",parsebasicResponse?.maidenMotherName);
            formik.setFieldValue("alternateContact",parsebasicResponse?.alternateContact)
        }
    }, []);
    useEffect(() => {
        const address = parseaddressResponse?.address1;
        if (address) {
            formik.setFieldValue("address1", address);
            formik.setFieldValue("address2", parseaddressResponse?.address2);
            formik.setFieldValue("zip", parseaddressResponse?.zip);
            formik.setFieldValue("city", parseaddressResponse?.city);
            formik.setFieldValue("state", parseaddressResponse?.state);
            formik.setFieldValue("mailingAddress1", parseaddressResponse?.mailingAddress1);
            formik.setFieldValue("mailingZip", parseaddressResponse?.mailingZip);
            formik.setFieldValue("mailingCity", parseaddressResponse?.mailingCity);
            formik.setFieldValue("mailingState", parseaddressResponse?.mailingState);
        }
    }, []);
    

    return(
        <>
        <form onSubmit={formik.handleSubmit}>
            <ToastContainer/>
          <div className="p-fluid p-formgrid grid mb-3">
        
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
                        <label className="field_label">
                            SSN <span className="steric">*</span> <small>(Last 4 Digits)</small>
                        </label>
                        <InputText type="text" id="SSN" value={formik.values.SSN} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ "p-invalid": isFormFieldValid("SSN") }, "input_text")} keyfilter={/^\d{0,4}$/} maxLength={4} minLength={4} />
                        {getFormErrorMessage("SSN")}
                    </div>
                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                        Mother's Maiden Name 
                        </label>
                        <InputText
                            id="maidenMotherName"
                            value={formik.values.maidenMotherName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ textTransform: "uppercase" }}
                        />
                        
                    </div>
                    <div className="field col-12 md:col-6">
                        <label className="field_label">
                            DOB <span className="steric">*</span> <small>(MM/DD/YYYY)</small>
                        </label>
                        <div className="flex flex-wrap  justify-content-center flex-row">

                            <Dropdown
                                placeholder="Month"
                                value={formik.values.month}
                                filter
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
                                filter
                            />
                            <Dropdown
                                placeholder="Year"
                                className={classNames({ "p-invalid": yearerror }, "input_text md-col-3 col-4")}
                                value={formik.values.year}
                                name="year"
                                filter
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
                    <div className="field col-12 md:col-3">
                        <label className="field_label" htmlFor="contact">
                           Alternate Contact 
                        </label>

                        <InputText
                            onChange={formik.handleChange}
                            id="alternateContact"
                            value={formik.values.alternateContact}
                            onBlur={formik.handleBlur}
                            
                            minLength={10}
                            maxLength={10}
                            keyfilter={/^[0-9]*$/}
                            pattern="^(?!1|0|800|888|877|866|855|844|833).*$"
                        />
                    </div>
                    <div className="field col-12 md:col-3">
                    <label className="field_label" htmlFor="address1">
                            Address 1 <span style={{ color: "red" }}>*</span>
                            </label>
                        <InputText type="text" value={formik.values.address1} name="address1" onChange={formik.handleChange} onBlur={formik.handleBlur}  minLength={10} autoComplete="new-password" />
                        {formik.touched.address1 && formik.errors.address1 ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.address1}
                            </p>
                        ) : null}
                    </div>
                    <div className="field col-12 md:col-3">
                    <label className="field_label" htmlFor="address2">Address 2 </label>
                        <InputText type="text" value={formik.values.address2} name="address2" onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="new-password" />
                    </div>
                    <div className="field col-12 md:col-3">
                        <label className="field_label" htmlFor="city">
                            City <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText type="text" value={formik.values.city} className={classNames({ "p-invalid": isFormFieldValid("city") }, "input_text")}  onChange={formik.handleChange} name="city"   />
                        {getFormErrorMessage("city")}
                    </div>
                    
                          <div className="field col-12 md:col-3">
                                <label  className="field_label" htmlFor="state">
                                    State <span style={{ color: "red" }}>*</span>
                                </label>
                                <InputText type="text" value={formik.values.state} name="state"  className={classNames({ "p-invalid": isFormFieldValid("state") }, "input_text")} onChange={formik.handleChange} />
                                {getFormErrorMessage("state")}
                            </div> 

                            
                           <div className="field col-12 md:col-3">
                           <label  className="field_label" htmlFor="zip">
                                    Zip Code <span style={{ color: "red" }}>*</span>
                                </label>
                                <InputText value={formik.values.zip} name="zip" className={classNames({ "p-invalid": isFormFieldValid("zip") }, "input_text")}   onChange={formik.handleChange} />
                                {getFormErrorMessage("zip")}
                            </div> 
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                   Maiiling Address 1 
                                </label>
                                <InputText id="mailingAddress1" value={formik.values.mailingAddress1} onChange={formik.handleChange} className= "input_text"autoComplete="new-password" />
                               
                            </div>
                           
                       <div className="field col-12 md:col-3">
                            <label className="field_label">
                                City 
                            </label>
                            <InputText id="mailingCity" value={formik.values.mailingCity}    className="" />
                        </div>
                           <div className="field col-12 md:col-3">
                            <label className="field_label">
                                State 
                            </label>
                            <InputText id="mailingState" value={formik.values.mailingState} onChange={formik.handleChange}  className="" />
                        </div> 
                
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    Zip Code 
                                </label>
                                <InputText id="mailingZip" value={formik.values.mailingZip} onChange={formik.handleChange} className ="input_text" keyfilter={/^\d{0,5}$/} maxLength={5} />
                              
                            </div>
                            
         
          </div>
          <div className="text-right">
                                <Button label="Update" type="submit" icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} disabled={isLoading}/>
                            </div>
                            </form>
        </>
    )
}
export default DialogeForInfoEdit