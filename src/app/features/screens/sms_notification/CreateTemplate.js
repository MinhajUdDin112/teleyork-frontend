import React, { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "primereact/editor";
import { Toast } from "primereact/toast";
import { addTemplateAction } from "../../../store/notification/NotificationAction";

const CreateTemplate = () => {
    const dispatch = useDispatch();
    const [templateText, setTemplateText] = useState("");

    const type = [
        { label: "SMS", value: 0 },
        { label: "Email", value: 1 },
        { label: "Both", value: 2 },
    ];
    const formik = useFormik({
        initialValues: {
            name: "",
            type: "",
        },
        onSubmit: (values, actions) => {
            const name = templateText.match(/(?<=\$)\w+/g) || [];
            const keySequence = ["templateId", ...name];
            values.type === 0 ? keySequence.push("phone") : values.type === 1 ? keySequence.push("email") : keySequence.push("phone", "email");
            const dataToSend = {
                ...values,
                template: templateText.replace(/<p>/g, "").replace(/<\/p>/g, ""),
                keySequence: [...keySequence],
            };
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
                            <InputText type="text" name="name" value={formik.values.name} onChange={formik.handleChange} className="text-sm mb-2 w-25rem" placeholder="Enter Template Name" />
                        </div>
                        <div>
                            <p className="m-0">Template Type:</p>
                            <Dropdown name="type" options={type} value={formik.values.type} onChange={formik.handleChange} className="p-inputtext-sm mb-2 w-25rem p-0" placeholder="Select Template Type" />
                        </div>
                    </div>
                    <div className="mt-2">
                        <p className="m-0">Template Body:</p>
                        <Editor style={{ height: "320px" }} value={templateText} onTextChange={(e) => setTemplateText(e.htmlValue)} />
                    </div>
                    <div className="flex justify-content-end m-3">
                        <Button label="Add Template" type="submit" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateTemplate;
