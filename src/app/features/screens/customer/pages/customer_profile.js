import React from 'react'
import CustomerInfo from '../components/customer_info'
import LineInfo from '../components/line_info'
import OtherInfo from '../components/other_info'

export default function CustomerProfileScreen
() {
  return (
    <div className='card'>
    <div className='grid p-fluid'>
    <div className='col-4 md-col-4'>
    <CustomerInfo/>
    </div>
    <div className='col-4 md-col-4'>
    <LineInfo/>
    </div>
    <div className='col-4 md-col-4'>
    <OtherInfo/>
    </div>
    </div>  

    </div>
  )
}
