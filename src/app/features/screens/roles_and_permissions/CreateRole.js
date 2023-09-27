import React, { useState, useEffect } from "react";
import BASE_URL from "../../../../config";
import Axios from "axios";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from "primereact/divider";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const CreateRole = () => {

    const location = useLocation()
    const { rowData } = location.state || {};

    const [moduleData, setModuleData] = useState([]);
    const [selectedModules, setSelectedModules] = useState({});
    console.log('selectedModules', selectedModules)
    const [selectedSubmodules, setSelectedSubmodules] = useState({});
    console.log('selectedSubmodules', selectedSubmodules)
    const [selectedActions, setSelectedActions] = useState({});

    // Get user data from ls
    const loginRes = localStorage.getItem("userData")
    const parseLoginRes = JSON.parse(loginRes)

    // Validation Schema
    const validationSchema = Yup.object().shape({
        role: Yup.string().required('This field is required.'),
        description: Yup.string().required('This field is required.'),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            role: '',
            description: '',
        },
        onSubmit: async () => {


            const permissions = [];

            // Define the data object
            const data = {
                serviceProvider: parseLoginRes?.compony,
                permissions: permissions,
                role: formik.values.role,
                description: formik.values.description,
                isSperPanelRole: false
            };

            // Iterate over selectedSubmodules to build permissions array
            Object.keys(selectedSubmodules).forEach((submoduleId) => {
                if (selectedSubmodules[submoduleId]) {
                    const submoduleActions = [];

                    moduleData.forEach((module) => {
                        module.submodule.forEach((submodule) => {
                            if (submodule._id === submoduleId) {
                                submodule.actions.forEach((action) => {
                                    const key = `${submoduleId}-${action._id}`;
                                    if (selectedActions[key]) {
                                        submoduleActions.push(action._id);
                                    }
                                });
                            }
                        });
                    });

                    permissions.push({
                        subModule: submoduleId,
                        actions: submoduleActions,
                    });
                    console.log('permissions', permissions)
                }
            });

            // return

            // Send the data to the server using Axios POST request
            Axios.post(`${BASE_URL}/api/web/role`, data)
                .then((response) => {
                    if (response?.status === 200) {
                        toast.warn("Role Added")
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            formik.resetForm()

        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const getModules = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/module`);
            setModuleData(res?.data?.data || []);
        } catch (error) {
            console.error("Error fetching module data:", error);
        }
    };

    useEffect(() => {
        getModules();
    }, []);

    const handleModuleCheckboxChange = (moduleId) => {
        console.log("moduleId", moduleId)
        setSelectedModules((prevSelectedModules) => ({
            ...prevSelectedModules,
            [moduleId]: !prevSelectedModules[moduleId],
        }));

        setSubmodulesAndActions(moduleId, !selectedModules[moduleId]);
    };

    const setSubmodulesAndActions = (moduleId, checked) => {
        const module = moduleData.find((module) => module._id === moduleId);
        if (module) {
            module.submodule.forEach((submodule) => {
                setSelectedSubmodules((prevSelectedSubmodules) => ({
                    ...prevSelectedSubmodules,
                    [submodule._id]: checked,
                }));
                submodule.actions.forEach((action) => {
                    togglePermission(submodule._id, action._id);
                });
            });
        }
    };

    const togglePermission = (submoduleId, actionId) => {

        console.log("actionId", actionId)
        setSelectedActions((prevSelectedActions) => {
            const key = `${submoduleId}-${actionId}`;
            return {
                ...prevSelectedActions,
                [key]: !prevSelectedActions[key],
            };
        });
    };

    const handleSubmoduleCheckboxChange = (submoduleId) => {
        const updatedSubmodules = {
            ...selectedSubmodules,
            [submoduleId]: !selectedSubmodules[submoduleId],
        };

        setSelectedSubmodules(updatedSubmodules);

        // Check permissions if submodule is checked, uncheck if it's unchecked
        if (updatedSubmodules[submoduleId]) {
            checkPermissionsForSubmodule(submoduleId);
        } else {
            uncheckPermissionsForSubmodule(submoduleId);
        }
    };

    // to check permissions for a submodule
    const checkPermissionsForSubmodule = (submoduleId) => {
        setSelectedActions((prevSelectedActions) => {
            const updatedActions = { ...prevSelectedActions };
            moduleData.forEach((module) => {
                module.submodule.forEach((submodule) => {
                    if (submodule._id === submoduleId) {
                        submodule.actions.forEach((action) => {
                            updatedActions[`${submoduleId}-${action._id}`] = true;
                        });
                    }
                });
            });
            return updatedActions;
        });
    };

    // to uncheck permissions for a submodule
    const uncheckPermissionsForSubmodule = (submoduleId) => {
        setSelectedActions((prevSelectedActions) => {
            const updatedActions = { ...prevSelectedActions };
            Object.keys(updatedActions).forEach((actionId) => {
                if (actionId.startsWith(`${submoduleId}-`)) {
                    updatedActions[actionId] = false;
                }
            });
            return updatedActions;
        });
    };

    const getPermissionsByRoleId = async () => {

        const data = {
            "roleId": rowData && rowData?._id
        }

        try {
            const res = await Axios.get(`${BASE_URL}/api/web/role/roleDetails?serviceProvider=${parseLoginRes?.compony}`, data);
            console.log('res', res)
        } catch (error) {
            console.error("Error fetching module data:", error);
        }
    };

    useEffect(() => {
        if (rowData) {
            getPermissionsByRoleId()
        }
    }, [rowData]);

    return (
        <>
            <div className="card">

                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="p-fluid p-formgrid grid">

                            <div className="col-12 md:col-4">
                                <label className='Label__Text'>
                                    Role
                                </label>
                                <InputText
                                    id="role"
                                    placeholder="Enter Role Name"
                                    value={formik.values.role}
                                    onChange={formik.handleChange}
                                    className={classNames({ 'p-invalid': isFormFieldValid('role') }, 'Input__Round')}
                                    keyfilter={/^[A-Za-z\s]+$/}
                                    maxLength={30}
                                />
                                {getFormErrorMessage("role")}
                            </div>

                            <div className="col-12 md:col-4">
                                <label className='Label__Text'>
                                    Description
                                </label>
                                <InputTextarea
                                    id="description"
                                    placeholder="Enter Role Description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    className={classNames({ 'p-invalid': isFormFieldValid('description') }, 'Input__Round')}
                                    rows={5}
                                    cols={30}
                                />
                                {getFormErrorMessage("description")}
                            </div>

                        </div>

                        <div>
                            <Button label="Submit" type="submit" />
                        </div>

                    </form>
                </div>

                <Divider />

                <div className="grid r_n_r">
                    {
                        moduleData.map((module) => (
                            <div className="col-12 md:col-6 lg:col-3">
                                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">

                                    <ul>
                                        <li>
                                            <input
                                                type="checkbox"
                                                checked={selectedModules[module._id] || false}
                                                onChange={() => handleModuleCheckboxChange(module._id)}
                                            />
                                            {module.name}
                                        </li>
                                        {
                                            module.submodule.map((submodule) => (
                                                <ul>
                                                    <li>
                                                        <div key={submodule._id}>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedSubmodules[submodule._id] || false}
                                                                onChange={() => handleSubmoduleCheckboxChange(submodule._id)}
                                                            />
                                                            {submodule.name}
                                                        </div>
                                                    </li>
                                                    {console.log('module.submodule', module.submodule)}
                                                    <ul>
                                                        <li>
                                                            {submodule.actions.map((action) => (
                                                                <div key={`${submodule._id}-${action._id}`}>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedActions[`${submodule._id}-${action._id}`] || false}
                                                                        onChange={() => togglePermission(submodule._id, action._id)}
                                                                    />
                                                                    {action.name}
                                                                </div>
                                                            ))}
                                                        </li>
                                                    </ul>
                                                </ul>
                                            ))
                                        }

                                    </ul>

                                </div>
                            </div>
                        ))
                    }
                </div>

                <div>
                    <table className="w_100 text-left">
                        <thead>
                            <tr>
                                <th>Module</th>
                                <th>Submodule</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moduleData.map((module) => (
                                <tr key={module._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedModules[module._id] || false}
                                            onChange={() => handleModuleCheckboxChange(module._id)}
                                        />
                                        {module.name}
                                    </td>
                                    <td>
                                        {module.submodule.map((submodule) => (
                                            <div key={submodule._id}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSubmodules[submodule._id] || false}
                                                    onChange={() => handleSubmoduleCheckboxChange(submodule._id)}
                                                />
                                                {submodule.name}
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        {module.submodule.map((submodule) => (
                                            <div key={submodule._id}>
                                                {submodule.actions.map((action) => (
                                                    <div key={`${submodule._id}-${action._id}`}>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedActions[`${submodule._id}-${action._id}`] || false}
                                                            onChange={() => togglePermission(submodule._id, action._id)}
                                                        />
                                                        {action.name}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* <div>
                    <br />
                    <br />
                    <br />
                    <h4>Selected IDs:</h4>
                    <p>Selected Modules: {Object.keys(selectedModules).filter((key) => selectedModules[key]).join(', ')}</p>
                    <p>Selected Submodules: {Object.keys(selectedSubmodules).filter((key) => selectedSubmodules[key]).join(', ')}</p>
                    <p>Selected Actions: {Object.keys(selectedActions).filter((key) => selectedActions[key]).join(', ')}</p>
                </div> */}
            </div>
        </>
    );
};

export default CreateRole;
