import React from "react";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";

export default function CustomInputField({ iden, formik, type = "text", className, label, placeHolder, options, optionLabel, optionValue, value, onChange, min }) {
    function titleCase(str) {
        return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
    }

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleWheel = (e) => {
        e.preventDefault();
    };

    return (
        <div className={`field ${className}`}>
            <label htmlFor="name1">{label || titleCase(iden ?? "")}</label>

            {onChange === undefined || value === undefined ? (
                <InputText step="1" type={type} min={min} placeholder={placeHolder} />
            ) : type === "dropdown" ? (
                <Dropdown
                    placeholder={placeHolder}
                    id={iden}
                    name={iden}
                    options={options}
                    optionLabel={optionLabel}
                    optionValue={optionValue}
                    value={value ? value : formik.values[iden]}
                    onChange={onChange || formik.handleChange}
                    className={classNames("customInput", { "p-invalid": isFormFieldValid({ iden }) })}
                />
            ) : type === "multiSelect" ? (
                <MultiSelect
                    placeholder={placeHolder}
                    id={iden}
                    name={iden}
                    options={options}
                    optionLabel={optionLabel}
                    optionValue={optionValue}
                    value={value ? value : formik.values[iden]}
                    onChange={onChange || formik.handleChange}
                    className={classNames("customInput", { "p-invalid": isFormFieldValid({ iden }) })}
                />
            ) : type === "textArea" || type === "textarea" ? (
                <InputTextarea id={iden} name={iden} value={value ? value : formik.values[iden]} onChange={onChange || formik.handleChange} type="text" placeholder={placeHolder} className={classNames("customInput", { "p-invalid": isFormFieldValid({ iden }) })} />
            ) : (
                <InputText
                    step="1"
                    onWheel={(event) => event.currentTarget.blur()}
                    onScroll={(event) => event.currentTarget.blur()}
                    onScrollCapture={(event) => event.currentTarget.blur()}
                    autoComplete="off"
                    autoSave="off"
                    id={iden ?? ""}
                    name={iden ?? ""}
                    value={value ? value : formik.values[iden]}
                    onChange={onChange || formik.handleChange}
                    type={type}
                    min={min}
                    placeholder={placeHolder}
                    className={classNames("customInput", { "p-invalid": isFormFieldValid({ iden }) })}
                />
            )}
            {iden && value !== undefined && onChange !== undefined && getFormErrorMessage(iden)}
        </div>
    );
}
