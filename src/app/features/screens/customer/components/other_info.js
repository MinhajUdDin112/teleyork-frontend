import React from 'react'
import CustomerProfileDetails from './customer_profile_details'

export default function OtherInfo() {



  return (
    <div className='card' style={{padding:0}}>
    <div className='surface-800 text-white p-2 rounded'>
    Other Information
    </div>
    <CustomerProfileDetails title='Wallet Balance' value={'xyz'}/>
    <CustomerProfileDetails title='Order by' value={'xyz'}/>
    <CustomerProfileDetails title='Master Agent ID' value={'xyz'}/>
    <CustomerProfileDetails title='Agent Name' value={'xyz'}/>
    <CustomerProfileDetails title='Enrollment ID' value={'xyz'}/>
    <CustomerProfileDetails title='Customer Consent' value={'xyz'}/>
    <CustomerProfileDetails title='Approved by' value={'xyz'}/>
    <CustomerProfileDetails title='Source' value={'xyz'}/>
    <CustomerProfileDetails title='Desired Due Date' value={'xyz'}/>
    <CustomerProfileDetails title='Application Approved' value={'xyz'}/>
    <CustomerProfileDetails title='Non-Lifeline Activation' value={'xyz'}/>
    <CustomerProfileDetails title='Plan Expiry Date' value={'xyz'}/>
    <CustomerProfileDetails title='Will Prepaid plan check for autopay' value={'xyz'}/>
 


    </div>
  )
}
