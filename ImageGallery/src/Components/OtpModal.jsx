import React, { useState } from "react";

const OtpModal = ({ closeModal }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array to hold each digit of the OTP
  const [message, setMessage] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join(""); // Join the array to form the OTP string
    // Add your logic for verifying the OTP here.
    // For demonstration, we can just set a message.
    if (otpCode.length === 6) {
      setMessage("OTP verified successfully!");
    } else {
      setMessage("Please enter a valid OTP.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-11/12 md:w-1/3">
        <h2 className="text-emerald-600 font-semibold text-2xl mb-4">Enter OTP</h2>
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
          {message && <div className="text-green-500 mb-4">{message}</div>}
          <button
            type="submit"
            className="text-white py-3 px-4 bg-emerald-600 rounded-3xl font-semibold hover:bg-emerald-700"
          >
            Verify OTP
          </button>
          <span
            onClick={closeModal}
            className="text-emerald-600 cursor-pointer text-center mt-4 hover:text-emerald-800"
          >
            Cancel
          </span>
        </form>
      </div>
    </div>
  );
};

export default OtpModal;
