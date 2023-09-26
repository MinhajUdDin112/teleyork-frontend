
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { addQuestion1Action } from "../../../../store/lifelineOrders/LifelineOrdersAction";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
const Question1 = ({handleNext,handleBack , enrollment_id}) => {
  // State variables for answers to each question
  const [q1Answer, setQ1Answer] = useState(null);
  const [q2Answer, setQ2Answer] = useState(null);
  const [q3Answer, setQ3Answer] = useState(null);

  const dispatch = useDispatch();

 const zipid = useSelector((state)=>state.zip)
 const zipId = zipid?.serviceAvailability?.data?.data?._id;

  const validationSchema = Yup.object().shape({
    livesWithAnotherAdult: Yup.string().required("Answer is required for Question 1"),
    hasAffordableConnectivity: Yup.string().required("Answer is required for Question 2"),
    isSharesIncomeAndExpense: Yup.string().required("Answer is required for Question 3"),
  });

  const formik = useFormik({
    initialValues: {
      livesWithAnotherAdult: "",
      hasAffordableConnectivity: "",
      isSharesIncomeAndExpense: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      const csr = "645c7bcfe5098ff6251a2255";
       const userId = zipId;
      const dataToSend = { csr, userId, ...values };
     dispatch(addQuestion1Action(dataToSend));
      handleNext();
      
    },
  });

  return (
    <>
    <form  onSubmit={formik.handleSubmit}>

    <div className="flex flex-row justify-content-between align-items-center mb-2">
                     <Button label="Back" type="button" onClick={handleBack} />
                     <Button label="Continue" type="submit"  />
                 </div>
                 <div>
                     <h6>Enrollment ID: {enrollment_id}</h6>
                 </div>
                 <h3>Do you live with another adult?</h3>
                 <h5>Adults are people who are 18 years or older, or who are emancipated minors. This can include a spouse, domestic partner, parent, adult son or daughter, adult in your family, adult roomate etc.</h5>
                 <div className="flex flex-row ">
                 <button
            className={` button-design answer-button ${
              q1Answer === "yes" ? "green" : ""
            }`}
            onClick={() => {
              setQ1Answer("yes");
              formik.setFieldValue("livesWithAnotherAdult", true);
            }}
            type="button"
          >
            Yes
          </button>
          <button
            className={` button-design answer-button ${
              q1Answer === "no" ? "red" : ""
            }`}
            onClick={() => {
              setQ1Answer("no");
              formik.setFieldValue("livesWithAnotherAdult", false);
            }}
            type="button"
          >
            No
          </button>
                    </div>
                    <br />
                 <h3>Do they get the Affordable Connectivity Program?</h3>
                <div className="flex flex-row ">
                <button
            className={`button-design answer-button ${
              q2Answer === "yes" ? "green" : ""
            }`}
            onClick={() => {
              setQ2Answer("yes");
              formik.setFieldValue("hasAffordableConnectivity", true);
            }}
            type="button"
          >
            Yes
          </button>
          <button
            className={`button-design answer-button ${
              q2Answer === "no" ? "red" : ""
            }`}
            onClick={() => {
              setQ2Answer("no");
              formik.setFieldValue("hasAffordableConnectivity", false);
            }}
            type="button"
          >
            No
          </button>

    </div>
    <br/>
    <h3>Do yoy share money (incomeand expenses) with another adult who gets the Affordable Connectivity Program Benifit?</h3>
    <div className="flex flex-row">
    <button
            className={`button-design answer-button ${
              q3Answer === "yes" ? "green" : ""
            }`}
            onClick={() => {
              setQ3Answer("yes");
              formik.setFieldValue("isSharesIncomeAndExpense", true);
            }}
            type="button"
          >
            Yes
          </button>
          <button
            className={`button-design answer-button ${
              q3Answer === "no" ? "red" : ""
            }`}
            onClick={() => {
              setQ3Answer("no");
              formik.setFieldValue("isSharesIncomeAndExpense", false);
            }}
            type="button"
          >
            No
          </button>

    </div>

    </form>

    </>
  );
};

export default Question1;
