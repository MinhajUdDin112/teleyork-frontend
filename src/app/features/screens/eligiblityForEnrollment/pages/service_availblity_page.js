import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { fetchZipCode } from "../../../../store/zipcodeSlice";
import { ProgressSpinner } from "primereact/progressspinner";
import BASE_URL from "../../../../../config";
import Axios from "axios";
export default function ServiceAvailabilityPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.zip);

  const zipResponse = useSelector((state) => state.zip);
  const zipStatus = zipResponse?.serviceAvailability?.status;
  console.log('zipStatus', zipStatus)
  const [errorMessage, setErrorMessage] = useState("");

  // Get user data from localStorage
  const loginRes = localStorage.getItem("userData");
  const parseLoginRes = JSON.parse(loginRes);





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

      try {
        const response = await Axios.post(`${BASE_URL}/api/user/verifyZip`, dataToSend);
        if (response?.status === 200) {
          localStorage.setItem("zipData", JSON.stringify(response.data));
          navigate("/enrollment")
        }
      } catch (error) {
        console.log(error?.response?.data?.msg)
        setErrorMessage(error?.response?.data?.msg);
      }

      // await dispatch(fetchZipCode(dataToSend));
      // if (zipStatus === 200) {
      //   navigate("/enrollment");
      // } else {
      //   console.log("rejected case", "service is not available");
      //   setErrorMessage("Sorry, Service is not available in your area.");
      //   actions.resetForm();
      // }
    },
  });

  return (
    <div className="flex flex-column justify-content-center">
      <div className="grid justify-content-center align-content-center my-5">
        <div className="card col-4 ">
          <form className="my-4" onSubmit={formik.handleSubmit}>
            <h6>Please enter zip code to check service availability</h6>
            {loading ? (<InputText
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
            {
              loading ? (<ProgressSpinner style={{ width: '40px', height: '40px', marginLeft: '160px', color: 'blue' }} strokeWidth="4" animationDuration=".5s" />) : <Button
                label={loading ? "Verifying..." : "Submit"}
                type="submit"
                className="col-12"
                disabled={loading}
              />
            }

          </form>
        </div>
      </div>
    </div>
  );
}
