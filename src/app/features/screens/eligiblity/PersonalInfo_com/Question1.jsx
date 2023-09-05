import React from "react";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
const Question1 = ({ handleNext }) => {
    const validationSchema = Yup.object().shape({
        isWithAdult: Yup.string().required("Are you Living with Adult?"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            isWithAdult: "",
        },
        onSubmit: (values, actions) => {
            console.log(values);
            actions.resetForm();
            handleNext();
        },
    });

    const handleYesButton = (e) => {
        formik.values.isWithAdult = true;
    };
    const handleNoButton = (e) => {
        formik.values.isWithAdult = false;
    };

    return (
        <>
            <form  onSubmit={formik.handleSubmit}>
                <div className="flex flex-row justify-content-between align-tems-center mb-2">
                    <h6 className="font-semibold">Enrollment ID:</h6>
                    <Button label="Continue" type="submit" />
                </div>
                <h3>Do you live with another adult?</h3>
                <p>Adults are people who are 18 years or older, or who are emancipated minors. This can include a spouse, domestic partner, parent, adult son or daughter, adult in your family, adult roomate etc.</p>
                <div className="flex flex-row justify-content-between">
                    <Button
                        icon="pi pi-check"
                        label="Yes"
                        type="button"
                        onClick={(e) => {
                            handleYesButton(e);
                        }}
                        className="p-button-success "
                    />
                    <Button
                        icon="pi pi-times"
                        label="No"
                        type="button"
                        onClick={(e) => {
                            handleNoButton(e);
                        }}
                        className="p-button-danger"
                    />
                </div>
            </form>
        </>
    );
};

export default Question1;
