import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import BASE_URL from "../../../../../config";
import Axios from "axios";


export default function ServiceAvailabilityPage() {
  
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  

  // Get user data from localStorage
  const loginRes = localStorage.getItem("userData");
  const parseLoginRes = JSON.parse(loginRes);
  console.log("login data is",parseLoginRes)

  const validationSchema = Yup.object().shape({
    zipCode: Yup.string().required("Please enter Zip code"),
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      zipCode: "",
    },
    onSubmit: async (values, actions) => {
      const serviceProvider = parseLoginRes?.compony;
      const csr = "645c7bcfe5098ff6251a2255";
      const carrier = "6455532566d6fad6eac59e34";
      const dataToSend = { serviceProvider, csr, carrier, ...values };
              setIsLoading(true)
      try {
        const response = await Axios.post(`${BASE_URL}/api/user/verifyZip`, dataToSend);
        if (response?.status === 200) {
          localStorage.setItem("zipData", JSON.stringify(response.data));
          localStorage.removeItem("basicData");
          localStorage.removeItem("address");
          navigate("/enrollment")
        }
      } catch (error) {
        console.log(error?.response?.data?.msg)
        setErrorMessage(error?.response?.data?.msg);
        setIsLoading(false)
      }
    },
  });

  return (
    <div className="flex flex-column justify-content-center">
      <div className="grid justify-content-center align-content-center my-5">
        <div className="card col-4 ">
          <form className="my-4" onSubmit={formik.handleSubmit}>
            <h6>Please enter zip code to check service availability</h6>
            {isLoading ? (<InputText
              type="text"
              name="zipCode"
              className="col-12 mb-3"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              keyfilter={/^\d{0,5}$/}
              minLength={5}
              maxLength={5}
              disabled
            />) : (<InputText
              type="text"
              name="zipCode"
              className="col-12 mb-3"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              keyfilter={/^\d{0,5}$/}
              minLength={5}
              maxLength={5}
            />)}

            {formik.touched.zipCode && formik.errors.zipCode ? (
              <p className="mt-0" style={{ color: "red" }}>
                {formik.errors.zipCode}
              </p>
            ) : null}
            {errorMessage && (
              <p style={{ color: "red" }}>{errorMessage}</p>
            )}

              <Button
                label={"Submit"}
                icon={isLoading === true ? "pi pi-spin pi-spinner " : ""}
                type="submit"
                className="col-12"
                disabled={isLoading}
              />
            

          </form>
        </div>
      </div>
    </div>
  );
}
