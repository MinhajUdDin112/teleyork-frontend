import React, { useEffect, useState } from 'react'
import BillingNavbar from '../../billing_and_invoices/components/BillingNavbar'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import Axios from 'axios'
import { toast } from 'react-toastify'
import { ScrollPanel } from 'primereact/scrollpanel'
import { useLocation } from 'react-router-dom'
const BASE_URL = process.env.REACT_APP_BASE_URL
const CustomerProfile = () => {
    const [cpData, setCpData] = useState([]);
    const [noteLength, setNoteLength] = useState(null)

    console.log('cpData', cpData)

    const { state } = useLocation();
  const selectedId = state?.selectedId;

    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);

    const getCustomerProfileData = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${selectedId}`);
            if (res?.status == 200 || res?.status == 201) {
                setCpData(res?.data?.data || []);
            }

        } catch (error) {
            console.log(error?.response?.data?.msg);
        }
    };
    console.log("cp data is", cpData)

    useEffect(() => {
        getCustomerProfileData();

    }, []);

   

    return (
        <>
            <div className="card p-0">
                <BillingNavbar />

                <div className="pt-3">
                    <div className="grid">
                        <div className="col-12 lg:col-4">
                            <div className="p-3 h-full">
                                <div className="shadow-2 h-full flex flex-column">
                                    <div className="text-900 font-medium text-lg p-3">Customer Information</div>

                                    <hr className="m-0" />

                                    {/* Table */}
                                    <div>
                                        <table className="cp_table w-full text-left">
                                            <tbody>
                                                <tr>
                                                    <td>Verify</td>
                                                    <td>
                                                        <Button label="Verify Customer" size="small" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>ACP Qualify</td>
                                                    <td>{cpData?.acpQualify ? new Date(cpData.acpQualify).toLocaleDateString() : ""}</td>
                                                </tr>
                                                <tr>
                                                    <td>Service Address</td>
                                                    <td>{cpData?.address1 + " " + cpData?.address2}</td>
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
                                                    {cpData?.mailingAddress1 || cpData?.mailingAddress2 ?
                                                        <td>{cpData?.mailingAddress1 + " " + cpData?.mailingAddress2}</td>
                                                        :
                                                        <td>{cpData?.address1 + " " + cpData?.address2}</td>
                                                    }

                                                </tr>
                                                <tr>
                                                    <td>Mailing City</td>
                                                    {cpData?.mailingCity ?
                                                        <td>{cpData?.mailingCity}</td>
                                                        :
                                                        <td>{cpData?.city}</td>}

                                                </tr>
                                                <tr>
                                                    <td>Mailing State</td>
                                                    {cpData?.mailingState ?
                                                        <td>{cpData?.mailingState}</td>
                                                        :
                                                        <td>{cpData?.state}</td>}

                                                </tr>
                                                <tr>
                                                    <td>Mailing Zip</td>
                                                    {cpData?.mailingZip ?
                                                        <td>{cpData?.mailingZip}</td>
                                                        :
                                                        <td>{cpData?.zip}</td>}

                                                </tr>

                                                {/* <tr>
                                                    <td>Tribal (Y/N)</td>
                                                    <td>
                                                        --
                                                    </td>
                                                </tr> */}
                                                <tr>
                                                    <td>Customer SSN (PC253)</td>
                                                    <td>{cpData?.SSN}</td>
                                                </tr>

                                                <tr>
                                                    <td>Customer DOB (PC253)</td>
                                                    <td>{cpData?.DOB ? new Date(cpData.DOB).toLocaleDateString() : ""}</td>
                                                </tr>

                                                <tr>
                                                    <td>Company</td>
                                                    <td>
                                                        {" "}
                                                        <td>{parseLoginRes?.companyName}</td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Current Balance</td>
                                                    <td>0.00</td>
                                                </tr>

                                                <tr>
                                                    <td>Add more line</td>
                                                    <td>
                                                        <Button label="Add Line" size="small" />
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

                                    <hr className="m-0" />

                                    {/* Table */}
                                    <div>
                                        <table className="cp_table w-full text-left">
                                            <tbody>
                                                <tr>
                                                    <td>MDN</td>
                                                    <td>{cpData?.phoneNumber}</td>
                                                </tr>
                                                <tr>
                                                    <td>SIM/ESN</td>
                                                    <td>{cpData?.esn}</td>
                                                </tr>
                                                <tr>
                                                    <td>IMEI</td>
                                                    <td>{cpData?.IMEI}</td>
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
                                                    <td>{cpData?.plan?.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Plan Details</td>
                                                    <td>{cpData?.plan?.description}</td>
                                                </tr>
                                                <tr>
                                                    <td>Plan Price</td>
                                                    <td>{cpData?.plan?.price}</td>
                                                </tr>
                                                <tr>
                                                    <td>Carrier</td>
                                                    <td>{cpData?.carrier?.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Query Usage</td>
                                                    <td>{cpData?.carrier?.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>TMB Live Status</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>OCS Live Status</td>
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

                                    <hr className="m-0" />

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
                                                    <td>{cpData?.createdBy?.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Master Agent ID</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Agent Name</td>
                                                    <td>{cpData?.createdBy?.name}</td>
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
                                                    <td>{cpData?.subscriberId}</td>
                                                </tr>
                                                <tr>
                                                    <td>Approved by</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Source</td>
                                                    <td>
                                                        {" "}
                                                        <td>{parseLoginRes?.companyName}</td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Fulfillment Metdod</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Tablet Subsidy Qualification</td>
                                                    {
                                                        cpData?.deviceEligibilty == true ? <td>Yes</td> :
                                                            <td>No</td>
                                                    }

                                                    <td>{cpData?.deviceEligibilty}</td>
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
                                                    <td>{cpData?.acpProgram?.name}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='p-3' >
                    <div className='grid'>

                        <div className="col-12 lg:col-4">
                            <div>
                                <div>
                                    <h4>Customer Notes</h4>
                                </div>
                                <hr className='m-0' />
                                <div className='flex justify-content-between pt-3 pb-3'>
                                    <Button label='View Archive Notes' size='small' />
                                    <Button label='Display Notes' size='small' />
                                </div>
                                <hr className='m-0' />
                                <div>
                                    <ScrollPanel style={{ width: '100%', height: '200px' }} className="custombar2">
                                        <ul className='pl-0'>
                                            <li className='flex justify-content-between align-items-center mb-3'>
                                                <div>
                                                    <h6 className='mb-2'>System</h6>
                                                    <p className='hide_text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                </div>
                                                <div>10-25-2023</div>
                                            </li>
                                            <li className='flex justify-content-between align-items-center mb-3'>
                                                <div>
                                                    <h6 className='mb-2'>System</h6>
                                                    <p className='hide_text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                </div>
                                                <div>10-25-2023</div>
                                            </li>
                                            <li className='flex justify-content-between align-items-center mb-3'>
                                                <div>
                                                    <h6 className='mb-2'>System</h6>
                                                    <p className='hide_text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                </div>
                                                <div>10-25-2023</div>
                                            </li>
                                            <li className='flex justify-content-between align-items-center mb-3'>
                                                <div>
                                                    <h6 className='mb-2'>System</h6>
                                                    <p className='hide_text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                </div>
                                                <div>10-25-2023</div>
                                            </li>
                                            <li className='flex justify-content-between align-items-center mb-3'>
                                                <div>
                                                    <h6 className='mb-2'>System</h6>
                                                    <p className='hide_text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                </div>
                                                <div>10-25-2023</div>
                                            </li>
                                            <li className='flex justify-content-between align-items-center mb-3'>
                                                <div>
                                                    <h6 className='mb-2'>System</h6>
                                                    <p className='hide_text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                </div>
                                                <div>10-25-2023</div>
                                            </li>
                                            <li className='flex justify-content-between align-items-center mb-3'>
                                                <div>
                                                    <h6 className='mb-2'>System</h6>
                                                    <p className='hide_text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                </div>
                                                <div>10-25-2023</div>
                                            </li>
                                            <li className='flex justify-content-between align-items-center mb-3'>
                                                <div>
                                                    <h6 className='mb-2'>System</h6>
                                                    <p className='hide_text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                </div>
                                                <div>10-25-2023</div>
                                            </li>
                                        </ul>
                                    </ScrollPanel>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 lg:col-4">
                            <div>
                                <div className='flex justify-content-between align-items-center mb-3'>
                                    <h4 className='m-0'>Add New Note (PC83)</h4>
                                    <span>
                                        <i className='pi pi-plus'></i> Add New Note (PC83)
                                    </span>
                                </div>
                                <hr className='m-0 mb-2' />
                                <Dropdown
                                    placeholder='Select Note Type'
                                    filter
                                    showClear
                                    filterBy="label"
                                    className='w-full mb-3'
                                />

                                <div className='mb-4'>
                                    <InputTextarea rows={5} cols={66} onChange={(e) => setNoteLength(e.target.value.length)} />
                                    <span className='counter_span mt-2'>{noteLength === null ? 0 : noteLength}</span>
                                </div>

                                <Button label='Do you want to create a ticket? (PC402)' icon="pi pi-plus" className='pl-0' link />

                                <hr className='m-0 mb-2' />

                                <div className='text-right'>
                                    <Button label='Add Note' />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
};

export default CustomerProfile;
