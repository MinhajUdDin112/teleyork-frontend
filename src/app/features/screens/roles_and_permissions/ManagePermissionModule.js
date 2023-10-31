import React from "react";
import { useState, useEffect } from "react";
export default function ManagepermissionModule({ module, disabledMode, permissionObject, setPermissionObject }) {
    const [checkMain, setCheckMain] = useState(false);
    console.log(permissionObject);
    const togglePermission = (submoduleId, actionId) => {  
        if(permissionObject[submoduleId] !== undefined){
        if (permissionObject[submoduleId].includes(actionId)) {
            const updatedArray = permissionObject[submoduleId].filter((item) => item !== actionId);

            setPermissionObject((prevstate) => ({
                ...prevstate,
                [submoduleId]: updatedArray,
            }));
        } else {
            const array = permissionObject[submoduleId];
            array.push(actionId);
            setPermissionObject((prevstate) => ({
                ...prevstate,
                [submoduleId]: array,
            }));
        } 
    }  
    else{ 
        setPermissionObject((prevstate) => ({
            ...prevstate,
            [submoduleId]: [actionId],
        }));  
    }

    };
    function toggleMainModulePermission(mainmodule) {
        console.log("main module is") 
        console.log(mainmodule)
        console.log("Mainmodule change is call");
        let cond = true;
        for (let i = 0; i < mainmodule.submodule.length; i++) { 
                console.log(mainmodule.submodule[i])   
                if(permissionObject[mainmodule.submodule[i]._id] !== undefined){
            if (permissionObject[mainmodule.submodule[i]._id].length !== 3 ) {
                cond = false;
                break;
            }           
        }  
        else{ 
           cond=false; 
           break;
        }
           

        } 
       
    
        if (cond === true) {
            let objofsubmoduleid = {};
            console.log("cond is true")
            for (let i = 0; i < mainmodule.submodule.length; i++) {    
                console.log("submodule is ",mainmodule.submodule[i])
                objofsubmoduleid[mainmodule.submodule[i]._id] = [];
            }
            // setCheckMain(prev=>!prev)
            setPermissionObject((prev) => ({
                ...prev,
                ...objofsubmoduleid,
            }));
        }   
        else if(cond === false){ 
            let objofsubmoduleid = {};
            for (let i = 0; i < mainmodule.submodule.length; i++) {
            
                let arr=[]  
                for(let k=0;k<3;k++){
                arr.push(mainmodule.submodule[i].actions[k]._id)  
                }  
                objofsubmoduleid[mainmodule.submodule[i]._id] =arr
            }
            // setCheckMain(prev=>!prev) 
            setCheckMain(true)
            setPermissionObject((prev) => ({
                ...prev,
                ...objofsubmoduleid,
            }));
        } 
        else{ 

        }
    
    }  

    function toggleSubModulePermissions(submodule) { 
        if(permissionObject[submodule._id] !== undefined){
        if (permissionObject[submodule._id].length === 3) {  
            console.log("all check")
            setPermissionObject((prevstate) => ({
                ...prevstate,
                [submodule._id]: [],
            }));
        } else {
            let arr2 = [];
            for (let i = 0; i < 3; i++) {
                arr2.push(submodule.actions[i]._id);
            }
            setPermissionObject((prevstate) => ({
                ...prevstate,
                [submodule._id]: arr2,
            }));
        }  
    }     
    else{ 
        let arr2 = [];
        for (let i = 0; i < 3; i++) {
            arr2.push(submodule.actions[i]._id);
        }
        setPermissionObject((prevstate) => ({
            ...prevstate,
            [submodule._id]: arr2,
        }));
    }

    }
    useEffect(() => {
        let cond = true;  
        for (let i = 0; i < module.submodule.length; i++) { 
            if(permissionObject[module.submodule[i]._id] !== undefined){
            if (permissionObject[module.submodule[i]._id].length !== 3 || permissionObject[module.submodule[i]._id] === undefined) {
                cond = false;
                break;
            }  
        } 
        else{ 
            cond=false; 
            break;
        }
        }  
    
        setCheckMain(cond);
    }, [permissionObject]);

    return (
        <div style={{marginTop:"45px"}} >
            <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round">
                <ul style={{ paddingLeft: "24%" }}>
                    <li style={{ marginTop: "10px",listStyleType:"none"}}>
                        <input
                            style={{ cursor: "pointer"}}
                            type="checkbox"
                            disabled={disabledMode}
                            checked={checkMain}
                            onChange={() => {
                                toggleMainModulePermission(module);
                            }}
                        />
                        {module.name}
                    </li>
                    {module.submodule.map((submodule) => (
                        <ul>
                            <li style={{ marginTop: "5px" ,listStyleType:"none"}}>
                                <div key={submodule._id} style={{ width: "245px" }}>
                                    <input
                                        style={{ cursor: "pointer" }}
                                        type="checkbox"
                                        disabled={disabledMode}
                                        checked={permissionObject[submodule._id] !== undefined ?permissionObject[submodule._id].length === 3 ? true : false:false}
                                        onChange={() => {
                                            toggleSubModulePermissions(submodule);
                                        }}
                                    />
                                    {submodule.name}
                                </div>
                            </li>
                            <ul>
                                <li style={{ marginTop: "5px",listStyleType:"none" }}>
                                    {submodule.actions.map((action) => (
                                        <div key={`${submodule._id}-${action._id}`} style={{ marginTop: "5px" }}>
                                            <input style={{ cursor: "pointer" }} type="checkbox" disabled={disabledMode} checked={permissionObject[submodule._id] !== undefined ? permissionObject[submodule._id].includes(action._id) === true ? true : false:false} onChange={() => {togglePermission(submodule._id, action._id)}} />
                                            {action.name}
                                        </div>
                                    ))}
                                </li>
                            </ul>
                        </ul>
                    ))}
                </ul>
            </div>
        </div>
    );
}
