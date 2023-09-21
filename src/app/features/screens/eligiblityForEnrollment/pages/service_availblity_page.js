import React from "react";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { InputText } from "primereact/inputtext";
import { fetchZipCode } from "../../../../store/zipcodeSlice";


export default function ServiceAvailablityPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();



    const formik = useFormik({
        initialValues: {
            zipCode: "",
        },
        onSubmit: (values) => {
            const serviceProvider = "645a85198cd1ff499c8b99cd";
            const csr = "645c7bcfe5098ff6251a2255";
            const carrier = "6455532566d6fad6eac59e34";
            const dataToSend = { serviceProvider, csr, carrier, ...values };
            // console.log(dataToSend);
            dispatch(fetchZipCode(dataToSend));
            navigate("/enrollment")
        },
    });

    return (
        <div className="flex flex-column justify-content-center">
            <div className="grid justify-content-center align-content-center my-5">
                <div className="card col-4 ">
                    <form className="my-4" onSubmit={formik.handleSubmit}>
                        <h6>Please enter zip code to check service availablity</h6>
                        <InputText type="text" name="zipCode" className="col-12 mb-3" value={formik.values.zipCode} onChange={formik.handleChange} keyfilter={/^\d{0,5}$/} maxLength={5} />
                        <Button label="Submit" type="submit" className="col-12" />
                    </form>
                </div>
            </div>
        </div>
    );
}
