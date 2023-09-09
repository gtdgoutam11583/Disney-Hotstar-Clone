import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Paymentsuccess({ setShowAlert }) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState("progress-bar w-10");
  const [currentProgress, setcurrentProgress] = useState(0);
  const [message, setMessage] = useState("Please wait while payment is progressing");

  // Simulate payment progress
  useEffect(() => {
    const timer = setInterval(() => {
      if (progress === "progress-bar w-100") {
        clearInterval(timer);
        setMessage("Congratulations! Payment is done");
        setShowAlert({ enable: true, alertType: "success", alertMessage: "Payment Successful, enjoy services" });

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setcurrentProgress(currentProgress + 10);
        setProgress(`progress-bar w-${currentProgress}`);
      }
    }, 250); // Adjust the interval as needed
    return () => clearInterval(timer);
  }, [progress]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 pb-5 mb-5" style={{ marginTop: '-50px' }}>
      <div className="bg-white px-5 mx-5">
        <div className="progress bg-white" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
          <div className={progress}></div>
        </div>

        <div className="bg-white px-5 mx-5">
          <div className="card text-center px-5 mx-5" style={{ width: "18rem" }}>
            <div className="card-header">
              {progress === "progress-bar w-100" ? "Done" : "Payment Progress"}
            </div>
            <div className="card-body">
              <p className="card-text">{message}</p>
              {progress === "progress-bar w-100" ? (
                <FaCheckCircle size="3em" color="green" />
              ) : (
                <div className="spinner-border text-primary" role="status"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
