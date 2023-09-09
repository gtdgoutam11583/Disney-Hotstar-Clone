import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
function Signup({setusername ,setShowAlert}) {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  // Function to retrieve existing user data from localStorage
  function getExistingUserData() {
    const existingData = localStorage.getItem('userData');
   
    return existingData ? JSON.parse(existingData) : [];
  }

  // Function to check for duplicate email or phone numbers
  function isDuplicate(userData, email, mobile) {
    return userData.some((user) => user.email === email || user.mobile === mobile);
  }

  // Function to add a new user to the array
  function addUserToLocalStorage(data) {
    const existingData = getExistingUserData();
    existingData.forEach((user) => {
      user.isLogin = false;
    });
    // Check for duplicates
    if (isDuplicate(existingData, data.email, data.mobile)) {
      setShowAlert({enable:true,alertType:"warning",alertMessage:"User with the same email or phone number already exists!"})
      return;
    }

    // Add the new user data to the array
    existingData.push(data);

    // Save the updated array back to localStorage
    localStorage.setItem('userData', JSON.stringify(existingData));
    setShowAlert({enable:true,alertType:"success",alertMessage:"Account created"})
    
    return { success: true, message: "Account create"};
  }


  

  const validatForm = () => {
    const firstName = formData.firstName
    const lastName = formData.lastName
    const email = formData.email;
    const mobile = formData.mobile;
    const password = formData.password;
    const cpassword = formData.confirmPassword;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (firstName.length == 0) {
      setShowAlert({enable:true,alertType:"warning",alertMessage:"first Name shoud not empty"})
      return { status: false, message: "first Name shoud not empty" }}
    if (lastName.length == 0) {
      setShowAlert({enable:true,alertType:"warning",alertMessage:"last Name shoud not empty"})
      return { status: false, message: "last Name shoud not empty" }}
    if (emailRegex.test(email) == false) {
      setShowAlert({enable:true,alertType:"warning",alertMessage:"Invalid Email"})
      return { status: false, message: "Invalid Email" };}
    if (mobile.length !== 10) {
      setShowAlert({enable:true,alertType:"warning",alertMessage:"Invalid mobile number"})
      return { status: false, message: "Invalid mobile number" }}
    if (password.length < 6 || cpassword.length < 6) {
      setShowAlert({enable:true,alertType:"warning",alertMessage:"Password length should be atleast 6 chars"})
      return { status: false, message: "Password length should be atleast 6 chars" }}
    if (password != cpassword) {
      setShowAlert({enable:true,alertType:"warning",alertMessage:"PPassword is not matching"})
      return { status: false, message: "Password should match" }}
    const data = {
      name: firstName + lastName,
      email: email,
      mobile: mobile,
      password: password,
      isLogin: true,
      subscription: "no"
    }
    return { status: true, data }
  }
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleSubmitt = async (event) => {
    event.preventDefault();
    const result = validatForm();
    if (result.status === true) {
      console.log(result.data)
      const signupresult=addUserToLocalStorage(result.data);
      console.log(signupresult)
      console.log("signupresult")
      if(signupresult.success==true){

        setusername(formData.firstName+" "+formData.lastName);
        navigate('/') 
      }
      
    }
    else {
      console.log(result.message)
    }
  }

  return (
    <div className="container-sm p-5">
      <form className="row g-3 bg-white p-5 " onSubmit={handleSubmitt}>
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input required type="text" className="form-control" id="firstName" name="firstName" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input required type="text" className="form-control" id="lastName" name="lastName" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input required type="email" className="form-control" id="email" name="email" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="mobile" className="form-label">Mobile</label>
          <input required type="number" className="form-control" id="mobile" name="mobile" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">Password</label>
          <input required type="password" className="form-control" id="password" name="password" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
          <input required type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={handleChange} />
        </div>
        <div className="col-12  ">
          <button type="submit" className="btn btn-primary bg-primary" >Sign Up</button>
        </div>

      </form>
    </div>
  );
}

export default Signup;