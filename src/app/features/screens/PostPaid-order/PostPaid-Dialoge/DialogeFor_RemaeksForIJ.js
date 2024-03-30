import React, { useState } from "react";  
import "./css/RemarksForIj.css"
import { RadioButton} from "primereact/radiobutton" 
import  {Dropdown} from "primereact/dropdown"
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea"; 
import { InputText } from 'primereact/inputtext';
import Axios from "axios";
import { toast } from "react-toastify";
import { Formik } from "formik";
const BASE_URL=process.env.REACT_APP_BASE_URL
const DialogeForRemarksForIJ = ({enrollmentId, getAllEnrollments,setOpenDialogeForRemarksForIJ}) => {
  const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);  
  const [isCallQualityRemarks, setIsCallQualityRemarks] = useState("good");  
    const [remarkNoteError,setRemarkNoteError]=useState(false)
    const [uploadType,setUploadType]=useState("file")   
    const [remarkNote,setRemarkNote]=useState("")
    const [file,setFile]=useState("")   
    const [fileType,setFileType]=useState()    
    const [linkValue,setLinkValue]=useState("") 
    const [fileTypeError,setFileTypeError]=useState(false)
    const options = [
        { label: "Select File Type", value: "" },
        { label: "Address Proof", value: "Address Proof History" },
        { label: "Bill Proof History", value: "Bill Proof History" },
    ];
       const AddRemarks=async ()=>{  
         const dataToSend={} 
         dataToSend.enrollmentId=enrollmentId 
         dataToSend.QualityRemarks=isCallQualityRemarks 
          dataToSend.remarkNote=remarkNote  
          if(linkValue === "" && file === ""){  
        
            try{
           let response=await  Axios.patch(`${BASE_URL}/api/user/qualityRemarks`, dataToSend)
            if (response?.status === 200 || response?.status === 201) {
              setOpenDialogeForRemarksForIJ(prev=>!prev)
                toast.success("Remarks Added");
                getAllEnrollments();
            } 
          } 
          catch (error) {
            toast.error(error?.response?.data?.msg);
        } 
          }  
          else{ 
         
               if(uploadType !== ""){
              const formData=new FormData() 
              formData.append("fileType",fileType)  
              formData.append("enrollmentId",enrollmentId)
              formData.append("uploadedBy",parseLoginRes._id) 
               if(file !== ""){
               formData.append("file",file) 
               } 
               formData.append("audioUrl",linkValue)
            try{
           let response=await  Axios.post(`${BASE_URL}/api/web/uploadfiles/upload-file`, formData)
            if (response?.status === 200 || response?.status === 201) {
             /* setOpenDialogeForRemarksForIJ(prev=>!prev)
                toast.success("Remarks Added");
                getAllEnrollments(); */
                try{
                  let response=await  Axios.patch(`${BASE_URL}/api/user/qualityRemarks`, dataToSend)
                   if (response?.status === 200 || response?.status === 201) {
                     setOpenDialogeForRemarksForIJ(prev=>!prev)
                       toast.success("Remarks Added");
                       getAllEnrollments();
                   } 
                 } 
                 catch (error) {
                   toast.error(error?.response?.data?.msg);
               } 
            } 
          } 
          catch (error) {
            toast.error(error?.response?.data?.msg);
        } 
      }
            
          }

       
          }
  return (
   
         <div className="flex mainremarks flex-wrap flex-row justify-content-left">  
            <div className="callqualitysection">              <h1 className="qualitylabel">Call Quality</h1>      
               <div className="flex flex-wrap flex-row mt-2 justify-content-left ">   
                   <div className="flex flex-wrap mt-2  flex-row justify-content-left align-items-center " >
                  <RadioButton  value="good" className="mt-2" onChange={(e)=>{ 
                            setIsCallQualityRemarks(e.value)
                      }}  
                        checked={isCallQualityRemarks === "good"}/>  
                   <label className="ml-2 mt-2">Good</label>          
                   <div/>
                    <div className="flex flex-wrap flex-row  mt-2 justify-content-left "> 
                      <RadioButton className="ml-2"  
                        onChange={(e)=>{ 
                          setIsCallQualityRemarks(e.value)
                    }}   
                    value="average"
                      checked={isCallQualityRemarks === "average"}
                        /> 
                      
                   <label className="ml-2">Average</label> 
                    </div>      
                  
                    <div className="flex flex-wrap flex-row mt-2 justify-content-left "> 
                      <RadioButton value="satisfactory"  onChange={(e)=>{ 
                            setIsCallQualityRemarks(e.value)
                      }}  
                        checked={isCallQualityRemarks === "satisfactory"}
                       className="ml-2"/> 
                      
                   <label className="ml-2" >Satisfactory</label> 
                    </div>      
                    <div className="flex flex-wrap flex-row mt-2 justify-content-left "> 
                      <RadioButton value="declined"  onChange={(e)=>{ 
                            setIsCallQualityRemarks(e.value)
                      }}  
                        checked={isCallQualityRemarks === "declined"}
                       className="ml-2"/> 
                      
                   <label className="ml-2" >Declined</label> 
                    </div> 
                   </div>  
                  
                    </div>     
                   
                   
               </div> 
               <div className="foruploadfile flex flex-wrap flex-row justify-left mt-1">   
                <div className="filetype mt-2">
                   <label className="block">Upload Type </label>
                      <Dropdown   
                      placeholder="File Type"  
                       optionLabel="label"  
                       className="mt-2"
                       optionValue="value" 
                       value={uploadType}
                         options={[{label:"File",value:"file"},{label:"Link",value:"link"}]} 
                          onChange={(e)=>{  
                             if(e.value === "file"){ 
                              setLinkValue("")
                             } 
                             else{ 
                              setFile("")
                             }
                            setUploadType(e.value)
                          }}
                       />  
                        </div>        
                        <div className=" mr-2 ml-2 mt-1">   
                        <label className="block mt-1 ">File Type </label>
                        <Dropdown
                            className=" mt-2"
                            id="fileType"
                            options={options}  
                            placeholder="File Type"
                            value={fileType}
                            onChange={(e) => {
                                 setFileType(e.value)
                            }}
                        />
                          {fileTypeError && fileTypeError ? (
                            <p className="mt-2 ml-2" style={{ color: "red" }}>
                                {fileTypeError}
                            </p>
                        ) : null}
                    </div> 
                       {  
                       uploadType === "link" ? 
                        <div className="mt-2 ml-2 filelink">  
                        
                          
                   <label className="block">File Link </label>
                    <InputText placeholder="Paste File Link Here" value={linkValue} className=" mt-2 " onChange={(e)=>{ 
                   setLinkValue(e.target.value)
                    }} />   
                    </div>
                    : <div className="mt-2 ml-2 uploadfiletype"> 
                      
                   <label className="block">Upload File </label>
                    <Button className=" mt-2"  onClick={()=>{ 
                     let input=document.createElement("input") 
                     input.type="file" 
                     input.onchange=(e)=>{ 
                      setFile(e.target.files[0])
                     }  
                    input.click()

                    }}   label={`${file !== "" ? file.name :"Upload File"}`}/> 
                     </div>
                  }
                    
                    </div>  
                     <div className="remark mt-4">
                <InputTextarea   
                className="w-full"
                value={remarkNote} 
                     onChange={(e)=>{  
                      setRemarkNoteError(false)
                      setRemarkNote(e.value)
                     }}
                      placeholder="Add Remarks"
                 />     
                 { 
                   remarkNoteError ? <p className="errormessage">Remarks Note Is Required</p> :undefined
                 }  
                  </div>          
                  <Button label="Add Remarks"  className="mt-4" onClick={()=>{ 
                    if(remarkNote === ""){ 
                      setRemarkNoteError(true) 
                    
                    } 
                    else{ 
                        AddRemarks()
                    }
                  }}/>                 
         </div>   
  )
}

export default DialogeForRemarksForIJ