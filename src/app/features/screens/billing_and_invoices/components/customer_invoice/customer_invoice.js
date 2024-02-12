import { Button } from "primereact/button";
import html2canvas from "html2canvas";
import "./css/customer_invoice.css"; 
import { useRef } from "react"; 
import jsPDF from "jspdf"; 
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useEffect } from "react";
import "./jspdf-font/Roboto-Black-normal.js"
{
    /* pdf.internal.pageSize*/
}  

export default function CustomerInvoice({userDetails,invoiceData}) {
    let downloadbuttonref=useRef()
    console.log(invoiceData) 
     console.log(userDetails) 
      useEffect(()=>{   
         if(invoiceData !== undefined){
       downloadbuttonref.current.click() 
         }  
      })  
      const downloadinvoice=async () => {
        {
            /*  const canvas = await html2canvas(document.querySelector(".downloadtemp"), { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        let a = document.createElement("a");
        a.href = imgData;
        a.download = true;
    a.click(); */
        }
        document.querySelector(".progress").style.display = "block";
        document.querySelector(".downloadtemp").style.width = "1050px";
        html2canvas(document.querySelector(".downloadtemp"), { scale: 2 }).then((canvas) => {
            const pdf = new jsPDF();
           // pdf.setFont("Roboto");    
        
pdf.setFont("Roboto-Black-normal");
            pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
            pdf.save("converted.pdf");
            document.querySelector(".downloadtemp").style.width = "100%"; 
            document.querySelector(".progress").style.display = "none";
        });
    }
    return (
        <div> 
             
            <Button 
                 ref={downloadbuttonref}
                className="download-invoice"
                label="Download Invoice"
                onClick={downloadinvoice}
            ></Button>  
            
            <div className="progress">
                <ProgressSpinner  className="spinner"/>
            </div>
            <div className="flex flex-wrap justify-content-between  downloadtemp">
                <div className="flex flex-column ">
                <div  className="ml-4">
                    <img className="mb-0 mt-4 pt-4" src="/companyLogo2.png" height="80" width="200" />
                    <h6 className="mt-0">1755 Park Street, Suite 200, Naperville, IL, 60563</h6>
                    </div>   

                    <div className="customer-info mt-3 line1">     
                     <p className="font-semibold line3">{userDetails?.firstName} {userDetails?.lastName}</p> 
                     <p className="font-semibold line3">3042828588</p> 
                     <p className="font-semibold line3">{userDetails?.address1}</p>
                     </div>
                </div>
              
                
                <div className="center-linetop">
                    <hr />
                </div>
                <div className="mt-4 companyremittance">
                    <div>
                        <div className="topline"></div>
                        <h6 className="remittancehead font-bold">Remittance Section</h6>
                        <div className="bottomline"></div>
                        <div className="remittance-wrapper">
                            <div className="pl-2 w-full remittancesec  flex flex-wrap justify-content-between">
                                <p>Account No</p>
                                <p> 212121</p>
                            </div>
                            <div className="pl-2  flex remittancesec flex-wrap justify-content-between">
                                <p>Invoice No</p>
                                <p>{invoiceData?.invoiceNo}</p>
                            </div>
                            <div className=" pl-2  remittancesec flex flex-wrap justify-content-between">
                                <p>Invoice Date</p>
                                <p>01/06/23</p>
                            </div>
                            <div className=" pl-2 remittancesec font-bold flex flex-wrap justify-content-between">
                                <p>Total Amount Due</p>
                                <p>$42</p>
                            </div>
                            <div className=" pl-2 remittancesec  flex flex-wrap justify-content-between line1">
                                <p>Due Date</p>
                                <p>{invoiceData?.invoiceDueDate}</p>
                            </div>
                            <div className=" pl-2   flex flex-wrap justify-content-between">
                                <p>Amount paid</p>
                                <div className="amount-paid">${invoiceData?.amountPaid}</div>
                            </div>
                        </div>
                        <p className="text-center">
                            Please make checks payable to:<span className="company"> IJWIRELESS</span>
                        </p>

                        <div className="remittancebottom"></div>
                       
                    </div>
                </div>
                <p className="w-full text-center mt-4">
                    Please detach top portion and return with payment. <strong className="company">I</strong>mportant
                </p>
                <div className="dashed-line"></div>
                <div className="account-summary mt-4 ">
                    <p className="text-center font-bold line2">ACCOUNT SUMMARY</p>
                    <div className="pl-2 w-full font-bold  flex flex-wrap justify-content-between line">
                        <p>Account No</p>
                        <p> 212121</p>
                    </div>
                    <div className="pl-2 w-full   flex flex-wrap justify-content-between line">
                        <p>Customer Name</p>
                        <p>{userDetails?.firstName} {userDetails?.lastName}</p>
                    </div>
                    <div className="pl-2  flex flex-wrap justify-content-between line">
                        <p>Invoice Date</p>
                        <p>01/06/23</p>
                    </div>
                    <div className=" pl-2  flex flex-wrap justify-content-between line">
                        <p>Invoice Number</p>
                        <p>{invoiceData?.invoiceNo}</p>
                    </div>
                    <div className=" pl-2  flex flex-wrap justify-content-between line">

                        <p className="line">Due Date</p>
                        <p>{invoiceData?.invoiceDueDate}</p>
                    </div>
                    <p className="mt-4 pt-4 pl-1 font-bold ">ACCOUNT DETAILS</p>
                    <div className="pl-2 w-full mt-2  flex flex-wrap justify-content-between line">
                        <p>Previous Balance</p>
                        <p> $0.00</p>
                    </div>
                    <div className="pl-2  flex flex-wrap justify-content-between line">
                        <p>Payment Received On Account</p>
                        <p>$0.00</p>
                    </div>
                    <div className=" pl-2 flex flex-wrap justify-content-between">
                        <p>Balance Forward</p>
                        <p>$0.00</p>
                    </div>
                    <div >
                    <p className="font-bold  mt-0 pt-1 pl-1">CURRENT SERVICES</p>
                    <div className="pl-2 w-full  mt-2 flex flex-wrap justify-content-between line ">
                        <p>Current Activity Charges</p>
                        <p>$30.30</p>
                    </div>
                    <div className="pl-2  flex flex-wrap justify-content-between ">
                        <p>Taxes and Surcharges</p>
                        <p>$12.19</p>
                    </div>
                    </div>
                   
                    <div className="topline"></div>
                    <div className=" flex justify-content-between blnc-due line">
                        <p className="inline font-bold mt-2">BALANCE DUE</p>
                        <p className="inline font-bold">$42</p>
                    </div>
                   
                </div>
                <div className="center-line">
                    <hr />
                </div>
                <div className="recurring-charges mt-4">
                   
                    <h6 className="text-left font-bold">One time Charges</h6>
                    <div className="bottomline"></div>
                    <table>
                        <thead>
                            <tr>
                                <td>Billed Number</td>
                                <td>Description</td>
                                <td>Period</td>
                                <td>Amount</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>(134) 577-6543</td>
                                <td>TEST T-10GB Plan</td>
                                <td>01/06/2023 to 02/05/2023</td>

                                <td>28.49$</td>
                            </tr>
                            <tr>
                                <td>(134) 577-6543</td>
                                <td>TEST T-10GB Plan</td>
                                <td>01/06/2023 to 02/05/2023</td>

                                <td>28.49$</td>
                            </tr>
                        </tbody>
                    </table>
                    <h6 className="text-left font-bold mt-3">Recurring Charges:</h6>
                    <div className="bottomline"></div>
                    <table>
                        <thead>
                            <tr>
                                <td>Billed Number</td>
                                <td>Description</td>
                                <td>Period</td>
                                <td>Amount</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>(134) 577-6543</td>
                                <td>TEST T-10GB Plan</td>
                                <td>01/06/2023 to 02/05/2023</td>
                                <td>28.49$</td>
                            </tr>
                            <tr>
                                <td>(134) 577-6543</td>
                                <td>TEST T-10GB Plan</td>
                                <td>01/06/2023 to 02/05/2023</td>

                                <td>28.49$</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex font-bold flex-row flex-wrap justify-content-between">
                        <p>Total Recurring Charges</p>
                        <p>30</p>
                    </div>
                    <div className="topline"></div>
                    <h6 className="font-bold">Regulatory Taxes and Surcharges: </h6>
                    <div className="bottomline"></div>
                    <table>
                        <thead>
                            <tr>
                                <td>Description</td>
                                <td>Amount</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>City Sales Tax </td>
                                <td>0.02</td>
                            </tr>
                            <tr>
                                <td> Dallad Mta</td>
                                <td>0.02</td>
                            </tr>
                            <tr>
                                <td>Fedral Cost Recovery Charge </td>
                                <td>0.02</td>
                            </tr>
                            <tr>
                                <td>Fedral Cost Recovery Fee </td>
                                <td>0.02</td>
                            </tr>
                            <tr>
                                <td>Fedral Excise Tax </td>
                                <td>0.07</td>
                            </tr>
                            <tr>
                                <td>Fedral Universal Service Fee </td>
                                <td>3.45</td>
                            </tr>
                            <tr>
                                <td>State Sales Tax </td>
                                <td>0.14</td>
                            </tr>
                            <tr>
                                <td>TX Universal Service </td>
                                <td>8.17</td>
                            </tr>
                            <tr className="font-bold">
                                <td>Total Regulatory Taxes and Surcharges </td>
                                <td>8.17</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    );
}
