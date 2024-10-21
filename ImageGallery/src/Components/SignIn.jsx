import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Forget_Password from "./Forget_Password";
import useAuth from "../Hooks/useAuth";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid format").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character"
    )
    .required("Password is required"),
});

const SignIn = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate()
  const {Signin_axios}= useAuth()

  const handleForget=()=>{
   
    navigate('/auth',{state:'forget'} )
  }

  return (
    <div className="flex flex-col h-screen bg-black opacity-90">
      <div className="flex flex-grow flex-col md:flex-row">
      
        <div className="hidden md:block w-full md:w-1/2">
          <iframe
            className="h-full w-full object-cover"
            src="https://lottie.host/embed/c4e7ea19-d176-4757-a6e6-a8dae8a7b04a/aYg8fzPjX4.json"
            title="Lottie Animation"
          ></iframe>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SigninSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Signing in with:", values);

              Signin_axios(values,setSubmitting)
              
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col w-3/4 p-10">
                <h1 className="text-emerald-600 font-semibold text-3xl py-4">
                  Sign in to your account
                </h1>
                <label className="text-emerald-600 font-semibold text-lg py-2">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="py-3 rounded-2xl px-4 bg-gray-700 opacity-80 font-semibold border-2 border-gray-400 text-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-600" />

                <label className="text-emerald-600 font-semibold text-lg py-2">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="py-3 rounded-2xl px-4 bg-gray-700 opacity-80 border-2 border-gray-400 text-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-600" />
                
                <span
                  onClick={() => handleForget()}
                  className="text-emerald-600 text-center cursor-pointer hover:text-emerald-800 pt-2"
                >
                  Forgot password?
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white py-3 px-4 mt-6 hover:bg-emerald-600 bg-gray-500 rounded-3xl font-semibold text-lg flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <div className="border-t-4 border-emerald-600 border-solid rounded-full w-6 h-6 animate-spin"></div>
                  ) : (
                    "Log in"
                  )}
                </button>

                <span className="text-gray-700 text-center pt-5 text-lg font-semibold">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-emerald-600">Sign up</Link>{" "}
                </span>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
