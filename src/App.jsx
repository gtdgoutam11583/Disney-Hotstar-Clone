import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Componets/Header'
import Slider from './Componets/Slider'
import ProductionHouse from './Componets/ProductionHouse'
import GenreMovieList from './Componets/GenreMovieList'
import Home from './Home';
import Login from './Componets/Login'
import Signup from './Componets/Signup'
import MovieList from './Componets/MovieList'
import { Subscription } from './Componets/Subscription';
import Payment from './Componets/Payment';
import Paymentsuccess from './Componets/Paymentsuccess';
import Alert from './Componets/Alert';
import Moviedetail from './Componets/Moviedetail';




function App() {
  const [userName, setusername] = useState("")
  const [data,setData]=useState({});
  const [showAlert,setShowAlert]=useState({enable:false,alertType:"danger",alertMessage:"i am defaul"});
  const [movie,setMovie]=useState({show:false,movie:{}})
  useEffect(
    ()=>{
      const existingData = getExistingUserData();
      // Find the currently logged-in user
      const userIndex = existingData.findIndex((user) => user.isLogin === true);
      if (userIndex !== -1) {
          const user = existingData[userIndex];
          setData(user);
          setusername(user.name)
      }
    },[]
  );

  function getExistingUserData() {
    const existingData = localStorage.getItem('userData');
   
    return existingData ? JSON.parse(existingData) : [];
  } 
  return (
    <div  >
      <BrowserRouter >
        <Header userName={userName} setusername={setusername}  setShowAlert={setShowAlert}/>
       <Alert showAlert={showAlert} setShowAlert={setShowAlert} />
        <Routes>
          <Route path="/" element={<> <Home movie={movie} setMovie={setMovie}/></>} />
          <Route path="/login" element={<Login setusername={setusername} setShowAlert={setShowAlert}/>} />
          <Route path="/signup" element={<Signup setusername={setusername} setShowAlert={setShowAlert}/>} />
          <Route path="/subscription" element={<Subscription setShowAlert={setShowAlert}/>} />
          <Route path="/movies" element={ <MovieList movie={movie} setMovie={setMovie}/>} />
          <Route path="/payment" element={<Payment setShowAlert={setShowAlert}/>} />
          <Route path="/paymentsuccess" element={<Paymentsuccess setShowAlert={setShowAlert}/>} />
          <Route path="/moviedetails" element={<Moviedetail movie={movie} setMovie={setMovie} setShowAlert={setShowAlert}/>} />
        </Routes>


      </BrowserRouter>


    </div>
  )
}

export default App
