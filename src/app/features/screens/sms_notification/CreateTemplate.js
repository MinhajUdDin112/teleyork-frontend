import React, { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "primereact/editor";
import { useEffect } from "react";
import { Toast } from "primereact/toast";
import { addTemplateAction } from "../../../store/notification/NotificationAction";
import { ProgressSpinner } from "primereact/progressspinner";
const CreateTemplate = () => {
    const dispatch = useDispatch();
    const [templateText, setTemplateText] = useState("");
    const { addTemplateLoading } = useSelector((state) => state.notification);
    const loginResponse = useSelector((state) => state.login);
    const loginData = loginResponse.loginData;
    const companyId = loginData?.compony;

    const type = [
        { label: "SMS", value: 0 },
        { label: "Email", value: 1 },
        { label: "Both", value: 2 },
    ];

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Template Name is required"),
        type: Yup.string().required("Template Type is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            type: "",
            notification_subject: "",
        },
        validationSchema,

        onSubmit: (values, actions) => {
            const name = templateText.match(/(?<=\$)\w+/g) || [];
            const keySequence = ["templateId", ...name];
            values.type === 0 ? keySequence.push("phone") : values.type === 1 ? keySequence.push("email") : keySequence.push("phone", "email");
            const dataToSend = {
                ...values,
                company: companyId,
                template: templateText.replace(/<p>/g, "").replace(/<\/p>/g, ""),
                keySequence: [...keySequence],
            };
            console.log("data to send", dataToSend);
            dispatch(addTemplateAction(dataToSend));
            actions.resetForm();
            setTemplateText("");
            show();
        },
    });

    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: "success", summary: "Info", detail: "Template Added" });
    };

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Create Template</h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Toast ref={toast} />
                <div className="card mx-5">
                    <div className="flex flex-wrap">
                        <div className="mr-3">
                            <p className="m-0">Template Name:</p>
                            <InputText type="text" name="name" value={formik.values.name} onChange={formik.handleChange} className="text-sm mb-2 w-25rem" placeholder="Enter Template Name" keyfilter={/^[a-zA-Z0-9-_]*$/} />
                            {formik.touched.name && formik.errors.name ? <div className="steric">{formik.errors.name}</div> : null}
                        </div>
                        <div>
                            <p className="m-0">Template Type:</p>
                            <Dropdown name="type" options={type} value={formik.values.type} onChange={formik.handleChange} className="p-inputtext-sm mb-2 w-25rem p-0" placeholder="Select Template Type" />
                            {formik.touched.type && formik.errors.type ? <div className="steric">{formik.errors.type}</div> : null}
                        </div>
                        <div>
                            <p className="ml-2">
                                please note Instructions to add variable in notifications: <br />
                                in the subject and in Email body prefix $$ with the variable name,
                                <br /> for example, $$CustomerFirstName,also don't add space in the <br /> variable name.{" "}
                            </p>
                        </div>

                        {formik.values.type === 1 || formik.values.type === 2 ? (
                            <div className="ml-3">
                                <p className="m-0">Add Subject:</p>
                                <InputText type="text" name="notification_subject" value={formik.values.notification_subject} onChange={formik.handleChange} className="text-sm mb-2 w-25rem" placeholder="Add Subject" />
                            </div>
                        ) : null}
                    </div>
                    <div className="mt-2">
                        <p className="m-0">Template Body: </p>
                        <Editor style={{ height: "320px" }} value={templateText} onTextChange={(e) => setTemplateText(e.htmlValue)} />
                       
                    </div>
                    {addTemplateLoading ? (
                        <ProgressSpinner style={{ width: "40px", height: "40px", marginLeft: "1050px", marginTop: "10px", color: "blue" }} strokeWidth="4" animationDuration=".5s" />
                    ) : (
                        <div className="flex justify-content-end m-3">
                            <Button label="Add Template" type="submit" />
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateTemplate;
