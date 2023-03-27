import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useEffect } from 'react'
import appAssets from '../../../../constants/appAssets';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CustomInputField from '../../../components/custom_input_field';
import { loginUser } from '../../../../redux/auth_slices/login_user_slice';
import { toast } from 'react-toastify';

export default function LoginScreen() {

  //redux
  const { success, error, loading } = useSelector((state) => state.loginUser);

  //hooks

  useEffect(() => {
    if (success !== undefined) {
      if (success === false) {
        toast.error(error)

      } else {

      }
    }
  }, [success]);

  const dispatch = useDispatch();

  //forms

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      dispatch(loginUser(data));

      console.log(data);

    },
  });


  const validationSchema = Yup.object().shape({

    password: Yup.string().required("Password is required.").min(8, 'Minimum length should be 8'),
    email: Yup.string().required("Email is required."),

  });


  return (
    <>
      <div className='background-wrapper-class'>

        <div className='form-wrapper'>
          <img src={appAssets.logo} />
          <h2 className='auth-heading'>WELCOME TO HLP</h2>
          <form style={{ width: '100%' }} className='grid p-fluid justify-content-center align-items-center' onSubmit={formik.handleSubmit}>
            


              <div className=' col-12 md:col-4'>


                <CustomInputField iden='email' formik={formik} placeHolder='Enter email' type='email' />
                <CustomInputField iden='password' formik={formik} placeHolder='Enter password' type='password' />


                <Button loading={loading} type='submit' className='customButton' label='NEXT' />
              </div>





         
          </form>

        </div>






      </div>


    </>
  )
}
