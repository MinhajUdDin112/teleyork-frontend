// import React from 'react'
// import { Button } from 'primereact/button'
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useDispatch } from 'react-redux';
// import { addQuestion2Action } from '../../../../store/lifelineOrders/LifelineOrdersAction';
// const Question2 = ({handleNext,id,handleBack}) => {
// const dispatch=useDispatch();
//   const validationSchema = Yup.object().shape({
//     hasAffordableConnectivity: Yup.string().required("is they get ACP?"),
// });

// const formik = useFormik({
//     validationSchema: validationSchema,
//     initialValues: {
//         hasAffordableConnectivity: "",
//     },
//     onSubmit: (values, actions) => {
//         console.log(values);
//         actions.resetForm();
//         handleNext();
//         dispatch(addQuestion2Action(values));
//     },
// });

// const handleYesButton = (e) => {
//     formik.values.hasAffordableConnectivity = true;
// };
// const handleNoButton = (e) => {
//     formik.values.hasAffordableConnectivity = false;
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
//                 <h3>Do they get the Affordable Connectivity Program?</h3>
//                 <div className="flex flex-row justify-content-between">
//                     <Button icon="pi pi-check" label="Yes" type='button' className="p-button-success" onClick={(e)=>{handleYesButton(e)}} />
//                     <Button icon="pi pi-times" label="No" type='button' className="p-button-danger" onClick={(e)=>{handleNoButton(e)}} />
//                 </div>
//                 </form>
//   </>
//   )
// }

// export default Question2