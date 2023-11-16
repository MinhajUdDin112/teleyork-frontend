import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import BASE_URL from "../../../../config";
import { ToastContainer, toast } from "react-toastify";
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from "primereact/progressspinner";

const ResumeApplication = () => {
    const location = useLocation();
    const [successDialogVisible, setSuccessDialogVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const responseData = location.state && location.state.responseData;
    const navigate = useNavigate();

    const initialInformation = JSON.parse(localStorage.getItem("initialInformation"));

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            city: "",
            state: "",
            zip: "",
            SSN: "",
        },
        onSubmit: async (values, actions) => {
            const userId = initialInformation?.data?._id;

            const dataToSend = {
                userId,
            };
            setIsLoading(true)
            try {
                const response = await Axios.post(`${BASE_URL}/api/enrollment/selfEnromentSubmit`, dataToSend);
                if (response?.status == 200 || response?.status == 201) {
                    setSuccessDialogVisible(true);
                    localStorage.removeItem("homeAddress");
                    localStorage.removeItem("selectProgram");
                    localStorage.removeItem("initialInformation");
                    setIsLoading(false)         
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setIsLoading(false)
            }
            setIsLoading(false)
        },
    });

    const hideSuccessDialog = () => {
        setSuccessDialogVisible(false);
        navigate('/selfenrollment');
      };

    const setValues = () => {
        formik.setFieldValue("firstName", responseData?.data?.firstName);
        formik.setFieldValue("lastName", responseData?.data?.lastName);
        formik.setFieldValue("email", responseData?.data?.email);
        formik.setFieldValue("city", responseData?.data?.city);
        formik.setFieldValue("state", responseData?.data?.state);
        formik.setFieldValue("zip", responseData?.data?.zip);
        formik.setFieldValue("SSN", responseData?.data?.SSN);
    };

    useEffect(() => {
        setValues();
    }, []);

    return (
        <>
            <ToastContainer />
            <Dialog className="dialoge-style"
  visible={successDialogVisible}
  onHide={hideSuccessDialog}
  header=""
  footer={
    <div>
      <Button label="OK" onClick={hideSuccessDialog} />
    </div>
  }
  // Set showHeader to false to hide the close icon
>
  <p>You are Enrolled Successfully</p>
</Dialog>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh", // Changed height to minHeight
                }}
            >
                <div className="col-7">
                    {/* <div className="col-12">
                        <p className="text-4xl font-semibold">IJ Wireless</p>
                    </div> */}
                    <div className="card flex p-8">
                        <div className="col-6">
                            <p className="text-2xl font-bold">Self Enrollment Completed</p>
                            <p className="mt-0 text-xl">Preview Your Details</p>
                            {/* <p className="text-lg">Please verify your identity to resume application process.</p> */}
                        </div>
                        <div className="col-6">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="flex flex-column">
                                    <InputText id="firstName" value={formik.values.firstName} disabled onChange={formik.handleChange} className="mb-3" placeholder="First Name" />
                                    <InputText id="lastName" value={formik.values.lastName} disabled onChange={formik.handleChange} className="mb-3" placeholder="Last Name" />
                                    <InputText id="email" value={formik.values.email} disabled onChange={formik.handleChange} className="mb-3" placeholder="Email" />
                                    <InputText id="city" value={formik.values.city} disabled onChange={formik.handleChange} className="mb-3" placeholder="city" />
                                    <InputText id="state" value={formik.values.state} disabled onChange={formik.handleChange} className="mb-3" placeholder="State" />
                                    <InputText id="zip" value={formik.values.zip} disabled onChange={formik.handleChange} className="mb-3" placeholder="ZipCode" />
                                    {/* <Calendar value={formik.values} disabled onChange={formik.handleChange} className="mb-3" id="icon" value={date} disabled onChange={(e) => setDate(e.value)} showIcon /> */}
                                    <InputText id="SSN" value={formik.values.SSN} disabled onChange={formik.handleChange} className="mb-3" placeholder="Last 4 SSN or Tribal ID" />
                                    <Button label="Submit" icon={isLoading ? <ProgressSpinner strokeWidth="6" style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} /> : null}  disabled={ isLoading} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResumeApplication;
