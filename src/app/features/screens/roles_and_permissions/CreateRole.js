import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import BASE_URL from "../../../../config";
import { useEffect } from "react";
import axios from "axios";

const CreateRole = () => {
    // const [checked, setChecked] = useState(false);
    const [permissions, setPermissions] = useState([]);
    console.log("first", permissions);
    //get module Api call
    const getPermissions = async () => {
        const res = await axios.get(`${BASE_URL}/api/web/module`);
        setPermissions(
            res?.data.data.map((resData) => {
                return {
                    ...resData.submodule,
                };
            })
        );
    };

    useEffect(() => {
        getPermissions();
    }, []);
    return (
        <div className="card">
            <form>
                <div className="mx-5">
                    <div className="mr-3">
                        <p className="m-0">Role Name:</p>
                        <InputText type="text" name="name" className="text-sm mb-2 w-25rem" placeholder="Enter Role Name" />
                    </div>
                    <div>
                        <p className="m-0">Role Description:</p>
                        <InputTextarea name="type" className="p-inputtext-sm  w-25rem p-0" rows={7} />
                    </div>
                    <div className="my-4">
                        <p>Select Permissions</p>
                    </div>
                    <div className="mx-5">
                        {/* <div className="flex align-items-center my-2">
                            <Checkbox inputId="city1" name="city" value="Chicago" className="mr-2" onChange={onCityChange} checked={cities.indexOf("Chicago") !== -1} />
                            <label htmlFor="city1">Chicago</label>
                        </div> */}
                    </div>
                    <div className="flex justify-content-end m-3">
                        <Button label="Add Role" type="submit" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateRole;
