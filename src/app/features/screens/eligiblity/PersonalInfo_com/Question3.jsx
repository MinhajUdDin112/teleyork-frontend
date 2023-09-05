// import React from 'react'
// import { Button } from 'primereact/button'

// const Question3 = ({handleNext}) => {
//   return (
//     <>
//  <div className="flex flex-row justify-content-between align-tems-center mb-2">
//                     <h6 className="font-semibold onClick={handleNext}">Enrollment ID:</h6>
//                     <Button label="Continue" onClick={handleNext} />
//                 </div>
//                 <h3>Do yoy share money (incomeand expenses) with another adult who gets the Affordable Connectivity Program Benifit?</h3>
//                 <p>This can be cost of bills, food etc and income. If you are married, you should check yes for this question.</p>
//                 <div className="flex flex-row justify-content-between">
//                     <Button icon="pi pi-check" label="Yes" className="p-button-success" />
//                     <Button icon="pi pi-times" label="No" className="p-button-danger" />
//                 </div>
//     </>
//   )
// }

// export default Question3





import React from 'react'
import { Button } from 'primereact/button'
import { useFormik } from "formik";
import * as Yup from "yup";
const Question3 = ({handleNext}) => {

  const validationSchema = Yup.object().shape({
    isShareMoney: Yup.string().required("are you share money ?"),
});

const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      isShareMoney: "",
    },
    onSubmit: (values, actions) => {
        console.log(values);
        actions.resetForm();
        handleNext();
    },
});

const handleYesButton = (e) => {
    formik.values.isShareMoney = true;
};
const handleNoButton = (e) => {
    formik.values.isShareMoney = false;
};

  return (
  <>
   <form  onSubmit={formik.handleSubmit}>
 <div className="flex flex-row justify-content-between align-tems-center mb-2">
                    <h6 className="font-semibold">Enrollment ID:</h6>
                    <Button label="Continue" type='submit' />
                </div>
                <h3>Do yoy share money (incomeand expenses) with another adult who gets the Affordable Connectivity Program Benifit?</h3>
                 <p>This can be cost of bills, food etc and income. If you are married, you should check yes for this question.</p>
                <div className="flex flex-row justify-content-between">
                    <Button icon="pi pi-check" label="Yes" type='button' className="p-button-success" onClick={(e)=>{handleYesButton(e)}} />
                    <Button icon="pi pi-times" label="No" type='button' className="p-button-danger" onClick={(e)=>{handleNoButton(e)}} />
                </div>
                </form>
  </>
  )
}

export default Question3