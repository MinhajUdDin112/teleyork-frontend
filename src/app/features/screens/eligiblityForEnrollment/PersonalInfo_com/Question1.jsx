import React from "react";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addQuestion1Action } from "../../../../store/lifelineOrders/LifelineOrdersAction";
import * as Yup from "yup";
const Question1 = ({ handleNext,id , handleBack,enrollmentId}) => {
    const dispatch= useDispatch();
    const validationSchema = Yup.object().shape({
        livesWithAnotherAdult: Yup.string().required("Are you Living with Adult?"),
        hasAffordableConnectivity: Yup.string().required("is they get ACP?"),
        isSharesIncomeAndExpense: Yup.string().required("are you share money ?"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            livesWithAnotherAdult: "",
            hasAffordableConnectivity: "",
            isSharesIncomeAndExpense: "",
        },
        onSubmit: (values, actions) => {
            const csr="645c7bcfe5098ff6251a2255";
            const userId=id;
            const dataToSend={csr,userId,...values}
            dispatch(addQuestion1Action(dataToSend))
           
            handleNext();
            actions.resetForm();
        },
    });

    const handleQ1YesButton = (e) => {
        formik.values.livesWithAnotherAdult = true;
    };
    const handleQ1NoButton = (e) => {
        formik.values.livesWithAnotherAdult = false;
    };

    const handleQ2YesButton = (e) => {
        formik.values.hasAffordableConnectivity = true;
    };
    const handleQ2NoButton = (e) => {
        formik.values.hasAffordableConnectivity = false;
    };

    const handleQ3YesButton = (e) => {
        formik.values.isSharesIncomeAndExpense = true;
    };
    const handleQ3NoButton = (e) => {
        formik.values.isSharesIncomeAndExpense = false;
    };

    return (
        <>
            <form  onSubmit={formik.handleSubmit}>
            <div className="flex flex-row justify-content-between align-items-center mb-2">
                        <Button label="Back" type="button" onClick={handleBack} />
                        <Button label="Continue" type="submit" />
                    </div>
                    <div>
                        <h6>Enrollment ID: {enrollmentId}</h6>
                    </div>
                <h3>Do you live with another adult?</h3>
                <p>Adults are people who are 18 years or older, or who are emancipated minors. This can include a spouse, domestic partner, parent, adult son or daughter, adult in your family, adult roomate etc.</p>
                <div className="flex flex-row ">
                    <Button
                        icon="pi pi-check"
                        label="Yes"
                        type="button"
                        onClick={(e) => {
                            handleQ1YesButton(e);
                        }}
                        className="p-button-success mr-4 "
                    />
                    <Button
                        icon="pi pi-times"
                        label="No"
                        type="button"
                        onClick={(e) => {
                            handleQ1NoButton(e);
                        }}
                        className="p-button-danger"
                    />
                </div>

                <br />
                <h3>Do they get the Affordable Connectivity Program?</h3>
                <div className="flex flex-row ">
                    <Button icon="pi pi-check" label="Yes" type='button' className="p-button-success mr-4" onClick={(e)=>{handleQ2YesButton(e)}} />
                    <Button icon="pi pi-times" label="No" type='button' className="p-button-danger" onClick={(e)=>{handleQ2NoButton(e)}} />
                </div>

                <br />
                <h3>Do yoy share money (incomeand expenses) with another adult who gets the Affordable Connectivity Program Benifit?</h3>
                 <p>This can be cost of bills, food etc and income. If you are married, you should check yes for this question.</p>
                <div className="flex flex-row ">
                    <Button icon="pi pi-check" label="Yes" type='button' className="p-button-success mr-4" onClick={(e)=>{handleQ3YesButton(e)}} />
                    <Button icon="pi pi-times" label="No" type='button' className="p-button-danger" onClick={(e)=>{handleQ3NoButton(e)}} />
                </div>
            </form>
        </>
    );
};

export default Question1;


// import React, { useState } from "react";
// import { Button } from "primereact/button";
// import { useFormik } from "formik";
// import { useDispatch } from "react-redux";
// import { addQuestion1Action } from "../../../../store/lifelineOrders/LifelineOrdersAction";
// import * as Yup from "yup";

// const Question1 = ({ handleNext, id, handleBack, enrollmentId }) => {
//   const dispatch = useDispatch();
//   const validationSchema = Yup.object().shape({
//     livesWithAnotherAdult: Yup.string().required("Are you Living with Adult?"),
//     hasAffordableConnectivity: Yup.string().required("is they get ACP?"),
//     isSharesIncomeAndExpense: Yup.string().required("are you share money?"),
//   });

//   const formik = useFormik({
//     validationSchema: validationSchema,
//     initialValues: {
//       livesWithAnotherAdult: "",
//       hasAffordableConnectivity: "",
//       isSharesIncomeAndExpense: "",
//     },
//     onSubmit: (values, actions) => {
//       const csr = "645c7bcfe5098ff6251a2255";
//       const userId = id;
//       const dataToSend = { csr, userId, ...values };
//       dispatch(addQuestion1Action(dataToSend));

//       handleNext();
//       actions.resetForm();
//     },
//   });

//   const [q1Clicked, setQ1Clicked] = useState(false);
//   const [q2Clicked, setQ2Clicked] = useState(false);
//   const [q3Clicked, setQ3Clicked] = useState(false);

//   const handleQ1YesButton = (e) => {
//     formik.values.livesWithAnotherAdult = true;
//     setQ1Clicked(true);
//   };
//   const handleQ1NoButton = (e) => {
//     formik.values.livesWithAnotherAdult = false;
//     setQ1Clicked(true);
//   };

//   const handleQ2YesButton = (e) => {
//     formik.values.hasAffordableConnectivity = true;
//     setQ2Clicked(true);
//   };
//   const handleQ2NoButton = (e) => {
//     formik.values.hasAffordableConnectivity = false;
//     setQ2Clicked(true);
//   };

//   const handleQ3YesButton = (e) => {
//     formik.values.isSharesIncomeAndExpense = true;
//     setQ3Clicked(true);
//   };
//   const handleQ3NoButton = (e) => {
//     formik.values.isSharesIncomeAndExpense = false;
//     setQ3Clicked(true);
//   };

//   return (
//     <>
//       <form onSubmit={formik.handleSubmit}>
//         <div className="flex flex-row justify-content-between align-items-center mb-2">
//           <Button label="Back" type="button" onClick={handleBack} />
//           <Button label="Continue" type="submit" />
//         </div>
//         <div>
//           <h6>Enrollment ID: {enrollmentId}</h6>
//         </div>
//         <h3>Do you live with another adult?</h3>
//         <p>
//           Adults are people who are 18 years or older, or who are emancipated
//           minors. This can include a spouse, domestic partner, parent, adult
//           son or daughter, adult in your family, adult roomate etc.
//         </p>
//         <div className="flex flex-row ">
//           <Button
//             icon="pi pi-check"
//             label="Yes"
//             type="button"
//             onClick={(e) => {
//               handleQ1YesButton(e);
//             }}
//             className={` mr-4 ${q1Clicked ? "clicked" : ""}`}
//           />
//           <Button
//             icon="pi pi-times"
//             label="No"
//             type="button"
//             onClick={(e) => {
//               handleQ1NoButton(e);
//             }}
//             className={` ${q1Clicked ? "clicked" : ""}`}
//           />
//         </div>

//         <br />
//         <h3>Do they get the Affordable Connectivity Program?</h3>
//         <div className="flex flex-row ">
//           <Button
//             icon="pi pi-check"
//             label="Yes"
//             type="button"
//             className={` mr-4 ${q2Clicked ? "clicked" : ""}`}
//             onClick={(e) => {
//               handleQ2YesButton(e);
//             }}
//           />
//           <Button
//             icon="pi pi-times"
//             label="No"
//             type="button"
//             className={` ${q2Clicked ? "clicked" : ""}`}
//             onClick={(e) => {
//               handleQ2NoButton(e);
//             }}
//           />
//         </div>

//         <br />
//         <h3>
//           Do yoy share money (incomeand expenses) with another adult who gets
//           the Affordable Connectivity Program Benifit?
//         </h3>
//         <p>
//           This can be cost of bills, food etc and income. If you are married,
//           you should check yes for this question.
//         </p>
//         <div className="flex flex-row ">
//           <Button
//             icon="pi pi-check"
//             label="Yes"
//             type="button"
//             className={` mr-4 ${q3Clicked ? "clicked" : ""}`}
//             onClick={(e) => {
//               handleQ3YesButton(e);
//             }}
//           />
//           <Button
//             icon="pi pi-times"
//             label="No"
//             type="button"
//             className={` ${q3Clicked ? "clicked" : ""}`}
//             onClick={(e) => {
//               handleQ3NoButton(e);
//             }}
//           />
//         </div>
//       </form>
//     </>
//   );
// };

// export default Question1;
