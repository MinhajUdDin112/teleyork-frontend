 import React from 'react'
import CustomerProfileDetails from './customer_profile_details'

export default function CustomerInfo() {



  return (
    <div className='card' style={{padding:0}}>
    <div className='surface-800 text-white p-2 rounded'>
    Customer Information
    </div>
    <CustomerProfileDetails title='Service Address' value='xyz' showEdit={true}/>
    <CustomerProfileDetails title='City' value='xyz'/>
    <CustomerProfileDetails title='State' value='xyz'/>
    <CustomerProfileDetails title='Zip' value='xyz'/>
    <CustomerProfileDetails title='Password' value='xyz'/>
    <CustomerProfileDetails title='Secret Ans' value='xyz'/>
    <CustomerProfileDetails title='Alternate Ph' value='xyz'/>
    <CustomerProfileDetails title='Email' value='xyz'/>
    <CustomerProfileDetails title='Mailing Address' value='xyz'/>
    <CustomerProfileDetails title='City' value='xyz'/>
    <CustomerProfileDetails title='State' value='xyz'/>
    <CustomerProfileDetails title='Zip' value='xyz'/>
    <CustomerProfileDetails title='Address Type' value='xyz'/>
    <CustomerProfileDetails title='Customer SSN' value='xyz'/>
    <CustomerProfileDetails title='Customer DOB' value='xyz'/>
    <CustomerProfileDetails title='A/U Name' value='xyz'/>


    </div>
  )
}
