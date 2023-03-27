import React from 'react'
import CustomerProfileDetails from './customer_profile_details'

export default function LineInfo() {



  return (
    <div className='card' style={{padding:0}}>
    <div className='surface-800 text-white p-2 rounded'>
    Line Information
    </div>
    <CustomerProfileDetails title='MDN' value='xyz' secondValue='Test'/>
    <CustomerProfileDetails title='Acc. Type' value='xyz'/>
    <CustomerProfileDetails title='Vcare plans' value='xyz'/>
    <CustomerProfileDetails title='Plan Details' value='xyz'/>
    <CustomerProfileDetails title='Plan Price' value='xyz'/>
    <CustomerProfileDetails title='Carrier' value='xyz'/>
    <CustomerProfileDetails title='Query Usage' value='xyz'/>
    <CustomerProfileDetails title='ACTIVE TELEPHONE NUMBER' value='xyz'/>
  


    </div>
  )
}
