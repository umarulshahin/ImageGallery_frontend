import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[A-Za-z][A-Za-z0-9_]{2,}$/,
      "Username must start with a letter, cannot contain spaces or special characters, and must be at least 3 characters long"
    )
    .required("Username is required"),
  email: Yup.string().email("Invalid format").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character"
    )
    .required("Password is required"),
  con_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = () => {

    const { Signup_axios } = useAuth()
  return (
    <div className="flex flex-col h-screen bg-black opacity-90">
      <div className="flex flex-grow flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex  justify-center items-center relative">
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              con_password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmiting }) => {
              console.log("sign in vlaue", values);

              //   setSubmiting(false);
              Signup_axios(values)
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col w-3/4 p-10">
                <h1 className="text-emerald-600 font-semibold text-3xl py-4">
                  Create your account
                </h1>
                <span className="text-emerald-600 font-semibold text-lg py-1">
                  Username
                </span>
                <Field
                  type="text"
                  name="username"
                  className="py-3 rounded-2xl px-4 bg-gray-700 opacity-80 font-semibold border-2 border-gray-400 text-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <ErrorMessage
                  name="username"
                  className="text-red-600"
                  component="div"
                />
                <span className="text-emerald-600 font-semibold text-lg py-1">
                  Email
                </span>
                <Field
                  type="email"
                  name="email"
                  className="py-3 rounded-2xl px-4 bg-gray-700 opacity-80 font-semibold border-2 border-gray-400 text-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <ErrorMessage
                  name="email"
                  className="text-red-600"
                  component="div"
                />

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
                    "Log in"
                  )}
                </button>

                <span className="text-gray-700 text-center pt-5 text-lg font-semibold ">
                  Already have an account?{" "}
                  <Link to="/" className="text-emerald-600">
                    Sign up
                  </Link>{" "}
                </span>
              </Form>
            )}
          </Formik>
        </div>
        <div className="hidden md:block w-full md:w-1/2">
          <iframe
            className="h-full w-full object-cover"
            src="https://lottie.host/embed/c4e7ea19-d176-4757-a6e6-a8dae8a7b04a/aYg8fzPjX4.json"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
