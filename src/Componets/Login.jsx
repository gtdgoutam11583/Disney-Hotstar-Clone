import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
function Login({setusername,setShowAlert}) {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  function getExistingUserData() {
    const existingData = localStorage.getItem('userData');
   
    return existingData ? JSON.parse(existingData) : [];
  } 
  // Function to validate user login and set isLogin to true
  function validateLogin(data) {
    const email = data.email;
    const password = data.password;
    const existingData = getExistingUserData();

    // Find a user with the provided email
    const userIndex = existingData.findIndex((user) => user.email === email);

    if (userIndex === -1) {
      // User with the provided email does not exist
      setShowAlert({enable:true,alertType:"warning",alertMessage:"Incorrect password"})
      return { success: false, message: "User not found" };
    }

    const user = existingData[userIndex];

    if (user.password !== password) {
      // Incorrect password
      setShowAlert({enable:true,alertType:"warning",alertMessage:"Incorrect password"})
      return { success: false, message: "Incorrect ID or password" };
    }

    // Set isLogin to true for the user
    user.isLogin = true;
    // Update the user data in the array
    existingData[userIndex] = user;
    // Save the updated array back to localStorage
    localStorage.setItem('userData', JSON.stringify(existingData));

    // Successful login
    setShowAlert({enable:true,alertType:"success",alertMessage:"Login successfull"})
    return { success: true, message: "Login successful", user };
  }

  const validatForm = () => {
    const email = formData.email;
    const password = formData.password;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (password.length < 6) return { status: false, message: "password must be of 6 digit" }
    if (emailRegex.test(email) == false) return { status: false, message: "either email or password is wrong" };
    const data = {
      email: email,
      password: password,
    }
    return { status: true, data }
  }
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleSubmitt = (event) => {
    event.preventDefault();
    const result = validatForm();
    if (result.status === true) {
      console.log(result.data)
      const loginresponse=validateLogin(result.data);
      console.log(loginresponse)
      if(loginresponse.success==true)
      {
       
        setusername(loginresponse.user.name);
        navigate('/') 
      }
    }
    else {
      console.log(result.message)
    }
  }

  return (
    <div className="container-sm p-5">
      <form className='bg-white p-5' onSubmit={handleSubmitt}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input required type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input required type="password" className="form-control" name="password" id="password" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary bg-primary">Submit</button>
      </form>
    </div>
  );
}

export default Login;