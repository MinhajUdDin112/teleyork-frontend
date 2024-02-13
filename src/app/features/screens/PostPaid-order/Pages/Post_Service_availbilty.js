import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import Axios from "axios";
const BASE_URL=process.env.REACT_APP_BASE_URL
export default function Post_service_availbilty() {
  
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [isCreate, setIsCreate] = useState(false);
  const [isManage, setIsManage] = useState(false);

  const location = useLocation();
  const currentPath = location?.pathname
  const actionBasedChecks = () => {

    const loginPerms = localStorage.getItem("permissions")
    const parsedLoginPerms = JSON.parse(loginPerms)

    const isCreate = parsedLoginPerms.some((node) =>
      node?.subModule.some((subNode) =>
        subNode?.route === currentPath && subNode?.actions.some((action) =>
          action?.name === "create"
        )
      )
    );
    setIsCreate(isCreate)

    const isManage = parsedLoginPerms.some((node) =>
      node?.subModule.some((subNode) =>
        subNode?.route === currentPath && subNode?.actions.some((action) =>
          action?.name === "manage"
        )
      )
    );
    setIsManage(isManage)

  };

  useEffect(() => {
    actionBasedChecks();
  }, []);
  

  // Get user data from localStorage
  const loginRes = localStorage.getItem("userData");
  const parseLoginRes = JSON.parse(loginRes);
  
 useEffect(() => {
  localStorage.removeItem("zipData");
 }, [])

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
      const department = parseLoginRes?.department;

      const csr = parseLoginRes?._id;
      const carrier = "6455532566d6fad6eac59e34";
      const accountType="Postpaid";
      const dataToSend = { serviceProvider, csr, department, carrier, accountType, ...values };
              setIsLoading(true)
      try {
        const response = await Axios.post(`${BASE_URL}/api/user/verifyZip`, dataToSend);
       
        if (response?.status === 200) {
          localStorage.setItem("zipData", JSON.stringify(response.data));
          localStorage.removeItem("basicData");
          localStorage.removeItem("address");
          localStorage.removeItem("toWordsBack");
          localStorage.removeItem("agreeData");
          localStorage.removeItem("programmeId");
          localStorage.removeItem("fromIncomplete")
          localStorage.removeItem("productData");
          localStorage.removeItem("paymentstatus");
          localStorage.removeItem("paymentInfo")
          localStorage.removeItem("dataToSend")
          localStorage.removeItem("checkEligiblity")
          navigate("/post-enrollment")
        }
      } catch (error) {
      
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
          <h5><strong>Please Enter The Zip Code To Check Service Availability</strong></h5>
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
                disabled={isLoading || !isCreate}
              /> 
          </form>
        </div>
      </div>
    </div>
  );
}
