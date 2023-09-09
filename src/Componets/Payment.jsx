import React, { useEffect, useState } from 'react';
import './payment.css';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom'
export default function Payment({setShowAlert}) {
  const navigate=useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [userName, setusername] = useState("")
  const [data,setData]=useState({});
  
  useEffect(
    ()=>{
      const existingData = getExistingUserData();
      // Find the currently logged-in user
      const userIndex = existingData.findIndex((user) => user.isLogin === true);
      if (userIndex === -1) {
        navigate('/login')
      }
      else{
        const user = existingData[userIndex];
        setData(user);
        setusername(user.name)
        if(data.subscription==2)
            navigate('/')
      }
    },[]
  );
  function getExistingUserData() {
    const existingData = localStorage.getItem('userData');
   
    return existingData ? JSON.parse(existingData) : [];
  } 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      // Remove non-numeric characters from card number
      const cleanedValue = value.replace(/\D/g, '');
      setCardNumber(cleanedValue);
    } else if (name === 'expiryDate') {
      setExpiryDate(value);
    } else if (name === 'cardName') {
      setCardName(value);
    } else if (name === 'cvv') {
      setCvv(value);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate card number (16 digits)
    if (cardNumber.length !== 16) {
      setShowAlert({enable:true,alertType:"warning",alertMessage:"Card number must be 16 digits"})
      console.log("card length")
      errors.cardNumber = 'Card number must be 16 digits';
    }

    // Validate expiry date (greater than current date)
    const currentDate = new Date();
    const [expiryMonth, expiryYear] = expiryDate.split('/');
    const expiry = new Date(`${expiryYear}`, expiryMonth - 1);
    if (expiry <= currentDate) {
      console.log("expiry")
      setShowAlert({enable:true,alertType:"warning",alertMessage:"Expiry date must be greater than the current date"})
    
      errors.expiryDate = 'Expiry date must be greater than the current date';
    }
    else if(cvv.length!=3) 
    {
      console.log("cvv")
      setShowAlert({enable:true,alertType:"warning",alertMessage:"cvv must be of 3 digit"})
    
      errors.expiryDate = 'cvv must be of 3 digit';
    }
    // You can add more validation rules as needed

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Form is valid if there are no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   if (validateForm()) {
    const existingData = getExistingUserData();
    // Find the currently logged-in user
    const userIndex = existingData.findIndex((user) => user.isLogin === true);
    const user = existingData[userIndex];
    console.log(user)
    if(user.subscription=="no")
      user.subscription="1"
    else if(user.subscription=="1")
      user.subscription="2"
    console.log(user)
    console.log(existingData)
    localStorage.setItem('userData', JSON.stringify(existingData));

      navigate('/paymentsuccess') 
      // Implement your payment processing logic here
      //alert('Payment processed successfully!');
    } else {
     
     //alert('Please correct the form errors.');
    }
  };

  return (
    <div className='bg-white'>
      <MDBContainer fluid className="py-5 gradient-custom">
        <MDBRow className="d-flex justify-content-center py-5">
          <MDBCol md="7" lg="5" xl="4">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4">
                <form onSubmit={handleSubmit}>
                  <MDBInput
                    label="Card Number"
                    name="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3457"
                    value={cardNumber}
                    onChange={handleInputChange}
                    className={validationErrors.cardNumber ? 'is-invalid' : ''}
                  />
                  {validationErrors.cardNumber && (
                    <div className="invalid-feedback">{validationErrors.cardNumber}</div>
                  )}

                  <MDBInput
                    label="Cardholder's Name"
                    name="cardName"
                    type="text"
                    placeholder="Cardholder's Name"
                    value={cardName}
                    onChange={handleInputChange}
                  />

                  <MDBInput
                    label="Expiration (MM/YYYY)"
                    name="expiryDate"
                    type="text"
                    placeholder="MM/YYYY"
                    value={expiryDate}
                    onChange={handleInputChange}
                    className={validationErrors.expiryDate ? 'is-invalid' : ''}
                  />
                  {validationErrors.expiryDate && (
                    <div className="invalid-feedback">{validationErrors.expiryDate}</div>
                  )}

                  <MDBInput
                    label="CVV"
                    name="cvv"
                    type="text"
                    placeholder="&#9679;&#9679;&#9679;"
                    value={cvv}
                    onChange={handleInputChange}
                  />

                  <MDBBtn
                    color="primary"
                    className="w-100 bg-primary"
                    type="submit"
                  >
                    Proceed
                  </MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
