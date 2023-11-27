import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import Axios from "axios";
import BASE_URL from "../../../../config";
import { toast } from "react-toastify";
import { useEffect } from "react";
const DialogeForRemarksForIJ = ({enrollmentId}) => {
    const [isCallQualityRemarks, setIsCallQualityRemarks] = useState();

    const formik = useFormik({
        initialValues: {
            QualityRemarks:"",
            remarksNote:"",
        },
        onSubmit: async (values, actions) => {
            const dataToSend = {
                enrollmentId,
                ...values
            };
            try {
                const response = await Axios.patch(`${BASE_URL}/api/user/qualityRemarks`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    toast.success("Remarks Added");
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
        },
        
    });
    useEffect(() => {
        formik.setValues({
            QualityRemarks: isCallQualityRemarks,
            remarksNote: "",
        });
      }, [
        isCallQualityRemarks,
      ]);

  return (
   <>
   <form onSubmit={formik.handleSubmit}>  
  <div className="flex flex-column">
  <div>
    <label>Call Quality</label>
  </div>
  <div className="flex flex-wrap mt-3 align-items-center">
    <div className="ml-4 mb-3">
      <RadioButton
        inputId="isCallQualityRemarks"
        name="pizza"
        value="good"
        onChange={(e) => setIsCallQualityRemarks(e.value)}
        checked={isCallQualityRemarks === "good"}
        className="mt-2"
      />
      <label className="ml-2">Good</label>
    </div>
    <div className="ml-4 mb-3">
      <RadioButton
        inputId="isCallQualityRemarks"
        name="pizza"
        value="average"
        onChange={(e) => setIsCallQualityRemarks(e.value)}
        checked={isCallQualityRemarks === "average"}
        className="mt-2"
      />
      <label className="ml-2">Average</label>
    </div>
    <div className="ml-4 mb-3">
      <RadioButton
        inputId="isCallQualityRemarks"
        name="pizza"
        value="satisfactory"
        onChange={(e) => setIsCallQualityRemarks(e.value)}
        checked={isCallQualityRemarks === "satisfactory"}
        className="mt-2"
      />
      <label className="ml-2">Satisfactory</label>
    </div>
    <div className="ml-4 mb-3">
      <RadioButton
        inputId="isCallQualityRemarks"
        name="pizza"
        value="declined"
        onChange={(e) => setIsCallQualityRemarks(e.value)}
        checked={isCallQualityRemarks === "declined"}
        className="mt-2"
      />
      <label className="ml-2">Declined</label>
    </div>
    <div className="mt-3 flex flex-wrap justify-content-center" style={{width:"100vw"}}  >
                        <div style={{width:"100%"}}>
                            <h4 >Notes</h4>
                            <InputTextarea id="remarksNote" style={{width:"100%"}}  value={formik.values.remarksNote} onChange={formik.handleChange}  className="p-2"  />
                        </div>
                        <br />
                    </div>
  </div>
  <div className="flex flex-wrap justify-content-end mt-4">
                    <Button label="Submit" type="submit" />
                </div>
</div>

   </form>
                    
                   
   </>
  )
}

export default DialogeForRemarksForIJ