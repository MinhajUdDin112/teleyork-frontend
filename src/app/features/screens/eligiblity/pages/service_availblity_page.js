import React from "react";
import CustomInputField from "../../../components/custom_input_field";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function ServiceAvailablityPage() {
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            zipCode: "",
        },
        onSubmit: async (values, actions) => {
            actions.setFieldValue("zipCode", values.zipCode);
            let body = {
                zipCode: values.zipCode,
            };
            
        },
    });

    return (
        <div className="flex flex-column justify-content-center">
            <div className="grid justify-content-center align-content-center my-5">
                <div className="card col-4 ">
                    <form >
                        <h6>Please enter zip code to check service availablity</h6>

                        <CustomInputField iden="zipCode" required={true} label="zip" type="number" min={0} className={"col-12 p-fluid"} formik={formik} />

                        <Button label="Submit" type="submit" className="col-12" />
                    </form>
                </div>
            </div>
        </div>
    );
}
