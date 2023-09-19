// import React from 'react'
// import { Button } from 'primereact/button'
// import { useFormik } from "formik";
// import { useDispatch } from "react-redux";
// import { addQuestion3Action } from "../../../../store/lifelineOrders/LifelineOrdersAction";
// import * as Yup from "yup";

// const Question3 = ({handleNext,id,handleBack}) => {
  
//   const dispatch= useDispatch();
//   const validationSchema = Yup.object().shape({
//     isSharesIncomeAndExpense: Yup.string().required("are you share money ?"),
// });

// const formik = useFormik({
//     validationSchema: validationSchema,
//     initialValues: {
//       isSharesIncomeAndExpense: "",
//     },
//     onSubmit: (values, actions) => {
//         console.log(values);
//         actions.resetForm();
//         handleNext();
//         dispatch(addQuestion3Action(values));
//     },
// });

// const handleYesButton = (e) => {
//     formik.values.isSharesIncomeAndExpense = true;
// };
// const handleNoButton = (e) => {
//     formik.values.isSharesIncomeAndExpense = false;
// };

//   return (
//   <>
//    <form  onSubmit={formik.handleSubmit}>
//    <div className="flex flex-row justify-content-between align-items-center mb-2">
//                         <Button label="Back" type="button" onClick={handleBack} />
//                         <Button label="Continue" type="submit" />
//                     </div>
//                     <div>
//                         <h6>Enrollment ID: {id}8</h6>
//                     </div>
//                 <h3>Do yoy share money (incomeand expenses) with another adult who gets the Affordable Connectivity Program Benifit?</h3>
//                  <p>This can be cost of bills, food etc and income. If you are married, you should check yes for this question.</p>
//                 <div className="flex flex-row justify-content-between">
//                     <Button icon="pi pi-check" label="Yes" type='button' className="p-button-success" onClick={(e)=>{handleYesButton(e)}} />
//                     <Button icon="pi pi-times" label="No" type='button' className="p-button-danger" onClick={(e)=>{handleNoButton(e)}} />
//                 </div>
//                 </form>
//   </>
//   )
// }

// export default Question3