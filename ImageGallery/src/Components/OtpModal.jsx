import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { Forget_password_URL, OTP_validation_URL } from "../Utils/Constance";

const OtpModal = () => {
  const email = useSelector((state)=>state.userdata.email)
  const [timer, setTimer] = useState(30); 
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array to hold each digit of the OTP
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  const {Forget_Password_axios}=useAuth()
  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow digits (0-9)
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on the next input if the current input is filled
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // Handle backspace
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  useEffect(()=>{

    let interval;
    if (isButtonDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsButtonDisabled(false);
            return 30; // Reset timer to 30 seconds
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);

  },[isButtonDisabled])

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join(""); 
    if (otpCode.length === 6) {
       
      Forget_Password_axios(OTP_validation_URL,{otp:otpCode,email:email})
      
    } else {
      setMessage("Please enter a valid OTP.");
    }
  };
 
  const handleResendOtp=()=>{

    Forget_Password_axios(Forget_password_URL,{email:email})
    setTimer(30); 
    setIsButtonDisabled(true);
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-11/12 md:w-1/3">
      <div className="flex flex-col items-center">

        <h2 className="text-emerald-600 font-semibold text-2xl mb-4 text-center">Enter OTP</h2>
        <span className='pt-2 text-white text-center'>One Time Password (OTP) has been sent via mail to 
          </span>
          <span className='pb-4 text-emerald-600 font-semibold text-center'>{email.slice(0,3)+"* * * * *"+email.slice(-3,email.length)}</span>
          </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex space-x-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                maxLength="1" // Limit to one character
                className="w-12 h-12 text-center text-white bg-gray-700 border-2 border-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-2xl"
              />
            ))}
          </div>
          {message && <div className="text-red-600 mb-4">{message}</div>}
          <button
            type="submit"
            className="text-white py-3 px-4 bg-emerald-600 rounded-3xl font-semibold hover:bg-emerald-700"
          >
            Verify OTP
          </button>
          <span
             onClick={()=>navigate('/')}
            className="text-emerald-600 cursor-pointer text-center mt-4 hover:text-emerald-800"
          >
            Cancel
          </span>
        </form>
        <div className="mt-4 text-center text-emerald-600">
           {
            isButtonDisabled ?
              <span className='text-gree' > Resend OTP in <span className='text-red-500'>{timer}</span> s</span>
                           :
               <a href="#" className='px-4 text-blue-500 ' onClick={handleResendOtp} > Resend OTP</a>
           }
        
  
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
