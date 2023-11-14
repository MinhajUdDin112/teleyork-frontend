import React, { useState } from "react";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import * as Yup from "yup";
const DialogeForRemarks = () => {
   
    const formik = useFormik({
       
        initialValues: {
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            value5: "",
        },
        onSubmit: async (values, actions) => {
            // try {
            //     const response = await Axios.post(`${BASE_URL}/api/user/initialInformation`);
            //     if (response?.status === 200 || response?.status === 201) {
            //         localStorage.setItem("basicData", JSON.stringify(response.data));
            //         toast.success("information saved Successfully");              
            //     }
            // } catch (error) {
            //     toast.error(error?.response?.data?.msg);
            // }
        },
    });


    return (
        <div className="">
            <div className="flex justify-content-center margn">
            <label className="field_label mr-5">  Actve Listener </label>
            <Rating id="value1"  value={formik.values.value1} onChange={formik.handleChange} cancel={false}
                
                onIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/custom-icon-active.png" alt="custom-image-active" width="25px" height="25px" />}
                offIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/custom-icon.png" alt="custom-image" width="25px" height="25px" />}
            />
            </div>
            <div className="flex justify-content-center margn">
            <label className="field_label mr-5 ">Active Listener </label>
            <Rating id="value2"  value={formik.values.value2} onChange={formik.handleChange} cancel={false}
              
                onIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/custom-icon-active.png" alt="custom-image-active" width="25px" height="25px" />}
                offIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/custom-icon.png" alt="custom-image" width="25px" height="25px" />}
            />
            </div>
            <div className="flex justify-content-center margn">
            <label className="field_label mr-5">  Actve Listener </label>
            <Rating id="value3"  value={formik.values.value3} onChange={formik.handleChange} cancel={false}
              
                onIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/custom-icon-active.png" alt="custom-image-active" width="25px" height="25px" />}
                offIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/custom-icon.png" alt="custom-image" width="25px" height="25px" />}
            />
            </div>
            <div className="flex justify-content-center margn">
            <label className="field_label mr-5">  Actve Listener </label>
            <Rating id="value4"  value={formik.values.value4} onChange={formik.handleChange} cancel={false}
              
                onIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/custom-icon-active.png" alt="custom-image-active" width="25px" height="25px" />}
                offIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/custom-icon.png" alt="custom-image" width="25px" height="25px" />}
            />
            </div>
            <div className="flex justify-content-center margn">
            <label className="field_label mr-5">  Actve Listener </label>
            <Rating id="value5"  value={formik.values.value5} onChange={formik.handleChange} cancel={false}
              
                onIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/custom-icon-active.png" alt="custom-image-active" width="25px" height="25px" />}
                offIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/custom-icon.png" alt="custom-image" width="25px" height="25px" />}
            />
            </div>
    
           
        </div>
    );
}

export default DialogeForRemarks