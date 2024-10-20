import React, { useState } from "react";
import OtpModal from "./OtpModal";

const Forget_Password = ({ close }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [OpenOtp , setOpenOtp] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for sending the reset password email here.
    // For demonstration, we can just set a message.
   
    setOpenOtp(true)
    setMessage("Password reset link sent to your email!");
  };
  const handleClose=()=>{
    setOpenOtp(false)

  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
     { OpenOtp && (
        <div>

         <OtpModal closeModal={handleClose} />
        </div>)
     }
      <div className="bg-gray-800 rounded-lg p-6 w-11/12 md:w-1/3">
        <h2 className="text-emerald-600 font-semibold text-2xl mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-emerald-600 font-semibold text-lg mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-3 rounded-2xl px-4 bg-gray-700 border-2 border-gray-400 text-white focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
            required
          />
          {message && <div className="text-green-500 mb-4">{message}</div>}
          <button
            type="submit"
            className="text-white py-3 px-4 bg-emerald-600 rounded-3xl font-semibold hover:bg-emerald-700"
          >
            Send Reset OTP
          </button>
          <span
            onClick={close}
            className="text-emerald-600 cursor-pointer text-center mt-4 hover:text-emerald-800"
          >
            Cancel
          </span>
        </form>
      </div>
    </div>
  );
};

export default Forget_Password;
