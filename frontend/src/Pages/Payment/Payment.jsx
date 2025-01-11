import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const PaymentSuccess = () => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to "/" if the payment is not successful
  useEffect(() => {
    try {
      const status = location.state.PaymentSuccess;
      console.log("Payment Status:", status);
      if (status) {
        setIsPaymentSuccessful(true);
      } else {
        navigate("/");
      }
    } catch (e) {
      navigate("/");
    }
  }, [location.state, navigate]);

  // Render JSX based on payment status
  return isPaymentSuccessful ? (
    <div className="payment-container">
      <div className="payment-card">
        <h1 className="payment-title"> Payment Successful! <i class="fa fa-check-circle" style={{fontSize:"36px",color:"green"}}></i> </h1>
        <p className="payment-message">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>
        <button
          className="payment-button"
          onClick={() => (window.location.href = "/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  ) : null; // Return null if `isPaymentSuccessful` is false to avoid rendering anything
};

export default PaymentSuccess;
