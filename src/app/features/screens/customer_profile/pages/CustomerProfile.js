import React, { useEffect, useState } from 'react'
import BillingNavbar from '../../billing_and_invoices/components/BillingNavbar'
import { Button } from 'primereact/button'
import Axios from 'axios'
import BASE_URL from '../../../../../config'
import { toast } from 'react-toastify'

const CustomerProfile = () => {

    const [cpData, setCpData] = useState([])

    console.log('cpData', cpData)

    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);

    const getCustomerProfileData = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=654cf6e905e9f8273013343e`);
            setCpData(res?.data?.data || []);
        } catch (error) {
            toast.error(`Error fetching module data: ${error?.response?.data?.msg}`);
        }
    };

    useEffect(() => {
        getCustomerProfileData()
    }, []);

    return (
        <>
            <div className="card p-0">

                <BillingNavbar />

                <div className='pt-3'>
                    <div className='grid'>

                        <div className="col-12 lg:col-4">
                            <div className="p-3 h-full">
                                <div className="shadow-2 h-full flex flex-column">
                                    <div className="text-900 font-medium text-lg p-3">Customer Information</div>

                                    <hr className='m-0' />

                                    {/* Table */}
                                    <div>
                                        <table className='cp_table w-full text-left'>
                                            <tbody>
                                                <tr>
                                                    <td>Verify</td>
                                                    <td><Button label='Verify Customer' size="small" /></td>
                                                </tr>

                                                <tr>
                                                    <td>Service Address</td>
                                                    <td>
                                                        {cpData?.address1 + " " + cpData?.address1}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>City</td>
                                                    <td>{cpData?.city}</td>
                                                </tr>

                                                <tr>
                                                    <td>State</td>
                                                    <td>{cpData?.state}</td>
                                                </tr>
                                                <tr>
                                                    <td>Zip</td>
                                                    <td>{cpData?.zip}</td>
                                                </tr>

                                                <tr>
                                                    <td>Password</td>
                                                    <td>--</td>
                                                </tr>

                                                <tr>
                                                    <td>Alternate Ph</td>
                                                    <td>{cpData?.contact}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td>{cpData?.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mailing Address</td>
                                                    <td>{cpData?.mailingAddress1 + " " + cpData?.mailingAddress2}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mailing City</td>
                                                    <td>{cpData?.mailingCity}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mailing State</td>
                                                    <td>{cpData?.mailingState}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mailing Zip</td>
                                                    <td>{cpData?.mailingZip}</td>
                                                </tr>
                                                <tr>
                                                    <td>Address Type</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Tribal (Y/N)</td>
                                                    <td>
                                                        --
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Customer SSN (PC253)</td>
                                                    <td>{cpData?.SSN}</td>
                                                </tr>

                                                <tr>
                                                    <td>Customer DOB (PC253)</td>
                                                    <td>{cpData?.DOB}</td>
                                                </tr>

                                                <tr>
                                                    <td>Company</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Current Balance</td>
                                                    <td>--</td>
                                                </tr>

                                                <tr>
                                                    <td>Add more line</td>
                                                    <td>
                                                        <Button label='Add Line' size="small" />
                                                    </td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-12 lg:col-4">
                            <div className="p-3 h-full">
                                <div className="shadow-2 flex flex-column">
                                    <div className="text-900 font-medium text-lg p-3">Line Information</div>

                                    <hr className='m-0' />

                                    {/* Table */}
                                    <div>
                                        <table className='cp_table w-full text-left'>
                                            <tbody>
                                                <tr>
                                                    <td>MDN</td>
                                                    <td>--</td>
                                                </tr>

                                                <tr>
                                                    <td>IMEI</td>
                                                    <td>--</td>
                                                </tr>

                                                <tr>
                                                    <td>IMEI2</td>
                                                    <td>--</td>
                                                </tr>

                                                <tr>
                                                    <td>Device ID</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Make & Model</td>
                                                    <td>--</td>
                                                </tr>

                                                <tr>
                                                    <td>eSIM</td>
                                                    <td>{cpData?.ESim === true ? "Yes" : "No"}</td>
                                                </tr>

                                                <tr>
                                                    <td>Ported MDN</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Acc. Type</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Telgoo 5 Plan</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Plan Details</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Plan Price</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Query Usage</td>
                                                    <td>--</td>
                                                </tr>

                                            </tbody>

                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-12 lg:col-4">
                            <div className="p-3 h-full">
                                <div className="shadow-2 flex flex-column">
                                    <div className="text-900 font-medium text-lg p-3">Other Information</div>

                                    <hr className='m-0' />

                                    {/* Table */}
                                    <div>
                                        <table class="cp_table w-full text-left">
                                            <tbody>
                                                <tr>
                                                    <td>Wallet Balance</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Order by</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Master Agent ID</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Agent Name</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Enrollment ID</td>
                                                    <td>{cpData?.enrollmentId}</td>
                                                </tr>
                                                <tr>
                                                    <td>NV Application ID</td>
                                                    <td>{cpData?.applicationId}</td>
                                                </tr>
                                                <tr>
                                                    <td>NLAD Subscriber ID</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Approved by</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Source</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Fulfillment Metdod</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Tablet Subsidy Qualification</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>ACP Device Order Type</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Application Approval </td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td> Lifeline Activation </td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Disconnection</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Disconnection Reason</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Lifeline Program Participation</td>
                                                    <td>--</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default CustomerProfile