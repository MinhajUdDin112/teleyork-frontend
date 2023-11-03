import { Card } from "primereact/card";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { NewYorkStates } from "../../../../../../../Utils/new_york_states";
export default function AddShipperDetailDialog() {
    const [usergrouptype, setUserGroupType] = useState(null);
    const [statevalue, setStateValue] = useState(null);
    const stateoption = NewYorkStates;
    const statusoption = [{ label: "active", value: "active" }];
    const [statusvalue, setStatusValue] = useState("active");
    const [otpyes, setOtpYes] = useState(true);
    const [otpno, setOtpNo] = useState(false);
    const usergrouptypeoptions = [
        { label: "Admin", value: "admin" },
        { label: "Employees", value: "employees" },
        { label: "Field Agent", value: "fieldagent" },
        { label: "Fullfilment", value: "fullfilment" },
        { label: "Manager", value: "manager" },
        { label: "Provisioning", value: "provisioning" },
        { label: "Retension and Customer Services", value: "retensionandcustomerservices" },
        { label: "Sales Team", value: "salesteam" },
        { label: "Super Admin", value: "super admin" },
        { label: "SuperAdmin", value: "superadmin" },
        { label: "Shipper", value: "shipper" },
        { label: "TD Vendors", value: "tdvendor" },
        { label: "VendorGroup", value: "vendorgroup" },
    ];
    const formik = useFormik({
        initialValues: {
            usergrouptype: "",
            firstname: "",
            lastname: "",
            agentcompanyname: "",
            loginid: "",
            password: "",
            phonenumber: "",
            email: "",
            address: "",
            address2: "",
            zip: "",
            city: "",
            state: "",
            status: "",
            otp: "",
        },
        validate: (values) => {
            // Implement your validation logic here
            const errors = {};
            if (!values.usergrouptype) {
                errors.usergrouptype = "Usergrouptype is required";
            }
            if (!values.firstname) {
                errors.firstname = "FirstName is required";
            }
            if (!values.lastname) {
                errors.lastname = "LastName is required";
            }
            if (!values.agentcompanyname) {
                errors.agentcompanyname = "AgentCompanyName is required";
            }
            if (!values.loginid) {
                errors.loginid = "LoginId is required";
            }

            if (!values.password) {
                errors.password = "Password is required";
            }

            return errors;
        },
    });
    return (
        <Card style={{width:"80vw"}}>
            <Card style={{height:"99px"}}>
                <h4 className="font-semibold">Add Shipper Detail page</h4>
            </Card>
            <div className="flex flex-wrap justify-content-around">
                <div className="mt-8">
                    <label style={{ display: "block" }}>
                        User Group Type<span style={{ color: "red" }}>*</span>
                    </label>
                    <Dropdown
                        value={usergrouptype}
                        options={usergrouptypeoptions}
                        onChange={(e) => {
                            setUserGroupType(e.value);
                            formik.values.usergrouptype = e.value;
                        }}
                        optionLabel="label"
                        placeholder="--Select--"
                        className="mt-4 w-full md:w-14rem"
                    />
                </div>
                <div className="mt-8">
                    <label style={{ display: "block" }}>
                        FirstName <span style={{ color: "red" }}>*</span>
                    </label>
                    <InputText value={formik.firstname} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                </div>
                <div className="mt-8">
                    <label style={{ display: "block" }}>
                        LastName <span style={{ color: "red" }}>*</span>
                    </label>
                    <InputText value={formik.lastname} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                </div>
                <div className="mt-8">
                    <label style={{ display: "block" }}>
                        AgentCompany Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <InputText value={formik.agentcompanyname} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                </div>
                <div className="mt-8">
                    <label style={{ display: "block" }}>
                        LoginId <span style={{ color: "red" }}>*</span>
                    </label>
                    <InputText value={formik.loginid} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                </div>
                <div className="mt-8">
                    <label style={{ display: "block" }}>
                        Password <span style={{ color: "red" }}>*</span>
                    </label>
                    <InputText value={formik.password} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                </div>
                <div className="mt-8">
                    <label style={{ display: "block" }}>
                        Phone Number <span style={{ color: "red" }}>*</span>
                    </label>
                    <InputText value={formik.phonenumber} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                </div>
                <div className="mt-8">
                    <label style={{ display: "block" }}>
                        Email Address <span style={{ color: "red" }}>*</span>
                    </label>
                    <InputText value={formik.email} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                </div>
                <div className="mt-8">
                    <label style={{ display: "block" }}>
                        Address <span style={{ color: "red" }}>*</span>
                    </label>
                    <InputText value={formik.address} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                </div>
                <div className="mt-8">
                    <label style={{ display: "block" }}>
                        Address 2 <span style={{ color: "red" }}>*</span>
                    </label>
                    <InputText value={formik.address2} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                </div>
                <div className="mt-8">
                    <label style={{ display: "block" }}>
                        Zip <span style={{ color: "red" }}>*</span>
                    </label>
                    <InputText value={formik.zip} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                </div>
                <div className="mt-8">
                    <label style={{ display: "block" }}>
                        City <span style={{ color: "red" }}>*</span>
                    </label>
                    <InputText value={formik.city} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                </div>
                <div className="mt-8">
                    <label style={{ display: "block" }}>
                        State<span style={{ color: "red" }}>*</span>
                    </label>
                    <Dropdown
                        value={statevalue}
                        options={stateoption}
                        onChange={(e) => {
                            setStateValue(e.value);
                            formik.values.state = e.value;
                        }}
                        optionLabel="label"
                        placeholder="--Select--"
                        className="mt-4 w-full md:w-14rem"
                    />
                </div>
                <div className="mt-8">
                    <label style={{ display: "block" }}>OTP</label>
                    <div className="mt-4">
                        <Checkbox
                            onChange={() => {
                                if (otpno) {
                                } else {
                                    setOtpNo((prev) => !prev);
                                    setOtpYes(false);     
                                    formik.values.otp="no"
                                }
                            }}
                            checked={otpno}
                        />
                        <label style={{ marginLeft: "5px" }}>No</label>
                        <Checkbox
                            style={{ marginLeft: "15px" }}
                            onChange={() => {
                                if (otpyes) {
                                } else {
                                    setOtpYes((prev) => !prev);
                                    setOtpNo(false);  
                                    formik.values.otp="yes"
                                }
                            }}
                            checked={otpyes}
                        />
                        <label style={{ marginLeft: "5px" }}>Yes</label>
                    </div>
                </div>
                <div className="mt-8">
                    <label style={{ display: "block" }}>Status</label>
                    <Dropdown
                        value={statusvalue}
                        options={statusoption}
                        onChange={(e) => {
                            setStatusValue(e.value);
                            formik.values.status = e.value;
                        }}
                        optionLabel="label"
                        placeholder="--Select--"
                        className="mt-4 w-full md:w-14rem"
                    />
                </div>
            </div>
        </Card>
    );
}
