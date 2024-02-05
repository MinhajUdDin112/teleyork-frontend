import React from "react";

const PlanInfo = ({currentPlan}) => { 
    let feature="" 
    let discounts=""
    let additionalFeature=currentPlan[0]?.additionalFeature   
    let discount=currentPlan[0]?.discount
    for(let i=0;i<discount?.length;i++){  
         if(i+1 === discount?.length){
       discounts+=`${discount[i]?.discountname}`;  
         } 
         else{ 
            
       discounts+=`${discount[i]?.discountname},`;  }
         }   
         for(let i=0;i<additionalFeature?.length;i++){  
            if(i+1 === additionalFeature?.length){
            feature+=`${additionalFeature[i]?.featureName}`;  
            } 
            else{ 
               
          feature+=`${additionalFeature[i]?.featureName},`;  
            }
        

    }
    return (
        <div className=" ">
            <div className="flex flex-wrap mx-5">
                <div className="col-3 ">
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Current Plan Name:</p>
                        <p className="text-sm m-0">{currentPlan[0]?.plan[0]?.name}</p>
                    </div>
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Bill Generate:</p>
                        <p className="text-sm m-0">{currentPlan[0]?.billingPeriod}</p>
                    </div>
                  
                </div>
                <div className="col-3">
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Current Plan Price($):</p>
                        <p className="text-sm m-0">{currentPlan[0]?.plan[0]?.price}</p>
                    </div> 
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Current Deposit Amount:</p>
                        <p className="text-sm m-0">{currentPlan[0]?.totalAmount}</p>
                    </div>
                    {/*<div className="mb-1">
                        <p className="font-bold text-sm m-0">Current credit Limit:</p>
                        <p className="text-sm m-0">500</p>
                    </div>   */}
                    {/*<div className="mb-1">
                        <p className="font-bold text-sm m-0">Due date day is:</p>
                        <p className="text-sm m-0">4th of month</p>  
                         
                    </div>*/ 
                    } 
                                    </div>
                <div className="col-3">
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Charging type:</p>
                        <p className="text-sm m-0">Monthly</p>
                    </div>
                    {/*<div className="mb-1">
                        <p className="font-bold text-sm m-0">Consumed Credit:</p>
                        <p className="text-sm m-0">365</p>
                    </div>     */}
                   
                </div>
                <div className="col-3">
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Additional Feature:</p>
                        <p className="text-sm m-0">{feature}</p>
                    </div> 
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Discounts:</p>
                        <p className="text-sm m-0">{discounts}</p>
                    </div>
                  {/*  <div className="mb-1">
                        <p className="font-bold text-sm m-0">Available Postpaid Limit:</p>
                        <p className="text-sm m-0">765</p>
                    </div>  
                    */ 
                }
                </div>
            </div>
        </div>
    );
};

export default PlanInfo;
