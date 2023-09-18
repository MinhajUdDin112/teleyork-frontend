import React from "react";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addQuestion1Action } from "../../../../store/lifelineOrders/LifelineOrdersAction";
import * as Yup from "yup";
const Question1 = ({ handleNext,id , handleBack}) => {
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
          
            actions.resetForm();
            handleNext();
            const csr="645c7bcfe5098ff6251a2255";
            const userId=id;
            const dataToSend={csr,userId,...values}
            console.log(dataToSend);
            dispatch(addQuestion1Action(dataToSend))
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
                        <h6>Enrollment ID: {id}</h6>
                    </div>
                <h3>Do you live with another adult?</h3>
                <p>Adults are people who are 18 years or older, or who are emancipated minors. This can include a spouse, domestic partner, parent, adult son or daughter, adult in your family, adult roomate etc.</p>
                <div className="flex flex-row justify-content-between">
                    <Button
                        icon="pi pi-check"
                        label="Yes"
                        type="button"
                        onClick={(e) => {
                            handleQ1YesButton(e);
                        }}
                        className="p-button-success "
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
                <div className="flex flex-row justify-content-between">
                    <Button icon="pi pi-check" label="Yes" type='button' className="p-button-success" onClick={(e)=>{handleQ2YesButton(e)}} />
                    <Button icon="pi pi-times" label="No" type='button' className="p-button-danger" onClick={(e)=>{handleQ2NoButton(e)}} />
                </div>

                <br />
                <h3>Do yoy share money (incomeand expenses) with another adult who gets the Affordable Connectivity Program Benifit?</h3>
                 <p>This can be cost of bills, food etc and income. If you are married, you should check yes for this question.</p>
                <div className="flex flex-row justify-content-between">
                    <Button icon="pi pi-check" label="Yes" type='button' className="p-button-success" onClick={(e)=>{handleQ3YesButton(e)}} />
                    <Button icon="pi pi-times" label="No" type='button' className="p-button-danger" onClick={(e)=>{handleQ3NoButton(e)}} />
                </div>
            </form>
        </>
    );
};

export default Question1;


