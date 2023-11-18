import OtpInput from "react-otp-input";
import React, { useState } from "react";

function Otpbox({ otp, handleOtpChange }) {
  const isOtpFilled = otp.length === 6

  const handleSuccess = () => {
    console.log("Success!");
    // do something after successful OTP verification
  };

  const renderInput = (props, index) => {
    return (
      <input
        key={index}
        {...props}
        autoComplete="off"
        maxLength={1}
      />
    );
  };

  return (
    <div className="rounded-md p-4 text-lg text-center mx-auto">
      <div className="flex justify-center items-center space-x-4 px-10 mx-10">
        <OtpInput
          value={otp}
          onChange={(value) => handleOtpChange(value)}
          numInputs={6}
          separator={<span style={{ width: "8px" }}></span>}
          isInputNum={true}
          shouldAutoFocus={true}
          inputStyle={{
            border: "none",
            borderRadius: "20px",
            width: "45px",
            height: "45px",
            fontSize: "16px",
            color: "#000",
            fontWeight: "400",
            backgroundColor: "#F7FAFC",
            boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
            letterSpacing: "1.25rem",
            textAlign: "center"
          }}
          containerStyle={{
            justifyContent: "space-evenly",
            display: "flex",
            width: "100%",
            maxWidth: "240px",
            gap: "20px",
          }}
          focusStyle={{
            border: "px solid #CFD3DB",
            outline: "none"
          }}
          renderInput={renderInput}
          onComplete={handleSuccess}
        />
      </div>
    </div>
  );
}

export default Otpbox;