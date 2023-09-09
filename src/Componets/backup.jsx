import React, { useEffect, useState } from 'react'
import logo from './../assets/Images/logo.png'
import { Link, useLocation } from "react-router-dom";
import {
    HiHome,
    HiMagnifyingGlass,
    HiStar,
    HiPlayCircle,
    HiTv
} from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import HeaderItem from './HeaderItem';
import { useNavigate } from 'react-router-dom'
function Header({userName,setusername,setShowAlert}) {
    const navigate=useNavigate();
    const [toggle, setToggle] = useState(false);
    
    const menu = [
        {
            name: 'HOME',
            icon: HiHome,
            url: '/'
        },
        /*
        {
            name: 'SEARCH',
            icon: HiMagnifyingGlass,
            url: '/search'
        },*.
       /* {
            name: 'WATCH LIST',
            icon: HiPlus,
            url: '/watchlist'
        },
        {
            name: 'ORIGINALS',
            icon: HiStar,
            url: '/originals'
        },*/
        {
            name: 'MOVIES',
            icon: HiPlayCircle,
            url: '/movies'
        }
        /*,
        {
            name: 'SERIES',
            icon: HiTv,
            url: '/series'
        }*/
    ]
    function getExistingUserData() {
        const existingData = localStorage.getItem('userData');
       
        return existingData ? JSON.parse(existingData) : [];
      } 
    const handleLogout = (event) => {
        event.preventDefault();
        const existingData = getExistingUserData();
        // Find the currently logged-in user
        const userIndex = existingData.findIndex((user) => user.isLogin === true);
        if (userIndex === -1) {
            // No user is currently logged in
            return { success: false, message: "No user is logged in" };
        }
        const user = existingData[userIndex];
        // Set isLogin to false for the user
        user.isLogin = false;
        // Update the user data in the array
        existingData[userIndex] = user;
        // Save the updated array back to localStorage
        localStorage.setItem('userData', JSON.stringify(existingData));
        // Successful logout
        setusername("");
        navigate("/")
        setShowAlert({enable:true,alertType:"success",alertMessage:"You are logged out"})
        return { success: true, message: "Logout successful" };
    }

    return (
        <div className='flex items-center justify-between p-5 bg-dark'>
            <div className='flex  gap-8 items-center'>
                <img src={logo} className='w-[80px] 
        md:w-[115px] object-cover' />
                <div className='hidden md:flex gap-8'>
                    {menu.map((item, index) => (
                        <HeaderItem key={index} name={item.name} Icon={item.icon} url={item.url} />
                    ))}
                </div>
                <div className='flex md:hidden gap-5'>
                    {menu.map((item, index) => index < 3 && (
                        <HeaderItem key={index} name={''} Icon={item.icon} />
                    ))}
                    <div className='md:hidden' onClick={() => setToggle(!toggle)}>
                        <HeaderItem name={''} Icon={HiDotsVertical} />
                        {toggle ? <div className='absolute mt-3 bg-[#121212] 
            border-[1px] border-gray-700 p-3 px-5 py-4'>
                            {menu.map((item, index, e) => index > 2 && (
                                <HeaderItem key={e} name={item.name} Icon={item.icon} />
                            ))}
                        </div> : null}
                    </div>
                </div>
            </div>
            <div className="btn-group">
                <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                        className='w-[20px] rounded-full' />
                </button>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" >hii{userName.length==0?" user":" "+userName}</Link ></li>
                    {userName.length===0?<><li><Link className="dropdown-item" to="/login">Login</Link ></li>
                    <li><Link className="dropdown-item" to="/signup">Signup</Link ></li></>:
                    <> <li><Link className="dropdown-item" onClick={handleLogout}>Logout</Link ></li>
                    <li><Link className="dropdown-item" to="/subscription">Subscription</Link ></li>
                    </>}
                    
                   
                </ul>
            </div>

        </div>
    )
}

export default Header