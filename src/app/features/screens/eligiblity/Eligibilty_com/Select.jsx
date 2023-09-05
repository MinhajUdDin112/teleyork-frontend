import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useFormik } from "formik";
import * as Yup from "yup";

const Select = ({ handleNext, handleBack }) => {
    const validationSchema = Yup.object().shape({
        isMedicaid: Yup.string().required("Select One Programe"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            isMedicaid: "",
        },
        onSubmit: (values, actions) => {
            console.log(values);
            actions.resetForm();
            handleNext();
        },
    });
    const Medicaid = (e) => {
        formik.values.isMedicaid = true;
    };

    return (
        <>
            <form action="" onSubmit={formik.handleSubmit}>
                <div>
                    <br />
                    <div className="flex flex-row justify-content-between align-items-center mb-2">
                        <Button label="Back" type="submit" onClick={handleBack} />
                        <Button label="Continue" type="submit" />
                    </div>
                    <div>
                        <h6>Enrollment ID: ETC175698</h6>
                    </div>
                    <br />
                    <div>
                        <h2>Qualify for the Affordable Connectivity Program</h2>
                        <p>
                            Select the applicable program from below to show that you, your dependent or someone in your household qualifies for Affordable Connectivity Program. You can qualify through some government assistance program or through your income (you don't need to qualify through both){" "}
                        </p>
                        <p>Note: You can only select one from the programs listed below</p>
                    </div>
                    <div className="flex justify-content-around flex-wrap pt-3">
                        <Card style={{ width: "17em", height: "17em", backgroundColor: "#aae5e9", marginBottom: "20px", boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)" }}>
                            <img src="/images/medicaid.jpg" alt="medicaid image" style={{ borderRadius: "6px 6px 0px 0px", height: "100%", width: "100%", objectFit: "contain" }} />
                            <div className="flex justify-content-center">
                                <p className="font-semibold">Medicaid</p>
                            </div>
                            <div className="flex justify-content-center">
                                <Button
                                    label="SELECT"
                                    type="button"
                                    value="button1"
                                    className="p-button-raised"
                                    onClick={(e) => {
                                        Medicaid(e);
                                    }}
                                />
                            </div>
                        </Card>

                        <Card style={{ width: "17em", height: "17em", backgroundColor: "#aae5e9", marginBottom: "20px", boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)" }}>
                            <img src="/images/medicaid.jpg" alt="medicaid image" style={{ borderRadius: "6px 6px 0px 0px", height: "100%", width: "100%", objectFit: "contain" }} />
                            <div className="flex justify-content-center">
                                <p className="font-semibold">Medicaid</p>
                            </div>
                            <div className="flex justify-content-center">
                                <Button label="SELECT" type="button"   value="button2" className="p-button-raised" />
                            </div>
                        </Card>
                        <Card style={{ width: "17em", height: "17em", backgroundColor: "#aae5e9", marginBottom: "20px", boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)" }}>
                            <img src="/images/medicaid.jpg" alt="medicaid image" style={{ borderRadius: "6px 6px 0px 0px", height: "100%", width: "100%", objectFit: "contain" }} />
                            <div className="flex justify-content-center">
                                <p className="font-semibold">Medicaid</p>
                            </div>
                            <div className="flex justify-content-center">
                                <Button label="SELECT" type="button" className="p-button-raised" />
                            </div>
                        </Card>
                    </div>
                </div>
            </form>
        </>
    );
};
export default Select;



