import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import useAuth from '../Hooks/useAuth';

const NewPassword_Schema = Yup.object().shape({
    password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character"
    )
    .required("Password is required"),
  con_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required")
})


const New_Password = () => {

 const email = useSelector((state)=>state.userdata.email)
 const navigate = useNavigate()
 const {Newpassword_axios}=useAuth()

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    
      <div className="bg-gray-800 rounded-lg p-6 w-11/12 md:w-1/3">
        <h2 className="text-emerald-600 font-semibold text-2xl mb-4 text-center">New Password</h2>
        <Formik
        initialValues={{
            password:'',
            con_password:''
        }}
        validationSchema={NewPassword_Schema}
        onSubmit={(value,{setSubmitting})=>{
            console.log(value)
            if(!email){
                toast.error('Something is wrong. Try after some time');
            }else{
                Newpassword_axios({password:value.password,email:email})

            }
               
        }}>
        {({ isSubmitting }) => (
              <Form className="flex flex-col  p-10">
                
                <span className="text-emerald-600 font-semibold text-lg py-1">
                  Password
                </span>
                <Field
                  type="password"
                  name="password"
                  className="py-3 rounded-2xl px-4 bg-gray-700 opacity-80 border-2 border-gray-400 text-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <ErrorMessage
                  name="password"
                  className="text-red-600"
                  component="div"
                />
                <span className="text-emerald-600 font-semibold text-lg py-1">
                  Confirm Password
                </span>
                <Field
                  type="password"
                  name="con_password"
                  className="py-3 rounded-2xl px-4 bg-gray-700 opacity-80 border-2 border-gray-400 text-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <ErrorMessage
                  name="con_password"
                  className="text-red-600"
                  component="div"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white py-3 px-4 mt-6 hover:bg-emerald-600 bg-gray-500 rounded-3xl font-semibold text-lg flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <div className="border-t-4 border-emerald-600 border-solid rounded-full w-6 h-6 animate-spin"></div>
                  ) : (
                    "Change password"
                  )}
                </button>
                <span
                onClick={()=>navigate('/')}
                className="text-emerald-600 font-semibold text-lg cursor-pointer text-center mt-4 hover:text-emerald-800"
            >
                Cancel
            </span>
                
                
              </Form>
            )}
        </Formik>
      </div>
    </div>  )
}

export default New_Password