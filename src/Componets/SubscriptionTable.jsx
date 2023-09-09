import React, { useEffect, useState } from 'react'
import {  Link , useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'


export default function SubscriptionTable() {
    const navigate=useNavigate();
    const [userName, setusername] = useState("")
    const [data,setData]=useState({});
    const [selection, setSelection]=useState(1);
    
    useEffect(
      ()=>{
        const existingData = getExistingUserData();
        // Find the currently logged-in user
        const userIndex = existingData.findIndex((user) => user.isLogin === true);
        if (userIndex !== -1) {
            const user = existingData[userIndex];
            setData(user);
            setusername(user.name)
            console.log(user);
            user.subscription==="no" ? setSelection(1) : setSelection(2)
        }
        else{
            navigate('/login')
        }
      },[]
    );
    useEffect(()=>{
      console.log("selection"+selection)
    })
    function getExistingUserData() {
      const existingData = localStorage.getItem('userData');
     
      return existingData ? JSON.parse(existingData) : [];
    } 
    return (
        <div>
            <table className="table-primary px-5 py-1">
                <thead>
                    <tr>
                        <th className="table-primary px-5 py-1" scope="col"></th>
                       {selection==1 ? <th className='table-primary px-5 py-1 bg-success}' scope="col">Super</th> :<th className='table-primary px-5 py-1}' scope="col">Super</th>}
                       {selection>=2 ? <th className="table-primary px-5 py-1 bg-success" scope="col">PREMIUM</th>:<th className="table-primary px-5 py-1" scope="col">PREMIUM</th>}
                    </tr>
                </thead>
                <tr className="table-primary px-5 py-1">
                    <td className="table-primary px-5 py-1">All content</td>
                    {selection==1 ? <td className="table-primary px-5 py-1 bg-success" >YES</td>: <td className="table-primary px-5 py-1 " >YES</td>}
                    {selection>=2 ? <td className="table-primary px-5 py-1 bg-success">YES</td>:<td className="table-primary px-5 py-1">YES</td>}
                </tr>
                <tr className="table-primary px-5 py-1">
                    <td className="table-primary px-5 py-1">Watch on TV or Laptop</td>
                    {selection==1 ?<td className="table-primary px-5 py-1 bg-success">YES</td>:<td className="table-primary px-5 py-1">YES</td>}
                     {selection>=2 ?<td className="table-primary px-5 py-1 bg-success">YES</td>:<td className="table-primary px-5 py-1">YES</td>}
                </tr>
                <tr className="table-primary px-5 py-1">
                    <td className="table-primary px-5 py-1">Ads free movies and shows (except sports)</td>
                    {selection==1 ?<td className="table-primary px-5 py-1 bg-success">NO</td>:<td className="table-primary px-5 py-1 ">NO</td>}
                    {selection>=2 ?<td className="table-primary px-5 py-1 bg-success">YES</td>:<td className="table-primary px-5 py-1">YES</td>}
                </tr>
                <tr className="table-primary px-5 py-1">
                    <td className="table-primary px-5 py-1">Max video quality</td>
                    {selection==1 ?<td className="table-primary px-5 py-1 bg-success">1024p</td>:<td className="table-primary px-5 py-1">1024p</td>}
                    {selection>=2 ?<td className="table-primary px-5 py-1 bg-success">2048p</td>:<td className="table-primary px-5 py-1">2048p</td>}
                </tr>
                <tr className="table-primary px-5 py-1">
                    <td className="table-primary px-5 py-1">Max audio quality</td>
                    {selection==1 ?<td className="table-primary px-5 py-1 bg-success">Dolby Atmos</td>:<td className="table-primary px-5 py-1">Dolby Atmos</td>}
                    {selection>=2 ?<td className="table-primary px-5 py-1 bg-success">Dolby Atmos</td>:<td className="table-primary px-5 py-1">Dolby Atmos</td>}
                </tr>
            </table>

            <div className="d-flex justify-content-between" >
               {selection==1? <div className="card bg-success" style={{ width: "13rem", height: "6rem" , hover:"cursor-pointer" }} onClick={()=>{console.log("hii");setSelection(1)}}>
                    <div className="card-body py-0 my-0 ">
                        <h5 className="card-title">Super</h5>
                        <p className="card-text">899/year</p>
                    </div>
                </div>:<div className="card" style={{ width: "13rem", height: "6rem" , hover:"cursor-pointer" }} onClick={()=>{console.log("hii");setSelection(1)}}>
                    <div className="card-body py-0 my-0 ">
                        <h5 className="card-title">Super</h5>
                        <p className="card-text">899/year</p>
                    </div>
                </div>}
                {selection==2? 
                <div className="card bg-success" style={{ width: "13rem", height: "6rem" , hover:"cursor-pointer"}} onClick={()=>{console.log("hii");setSelection(2)}}>
                    <div className="card-body py-0 my-0 ">
                        <h5 className="card-title">Premium</h5>
                        <p className="card-text">1499/year</p>
                    </div>
                </div>:
                 <div className="card" style={{ width: "13rem", height: "6rem" , hover:"cursor-pointer"}} onClick={()=>{console.log("hii");setSelection(2)}}>
                 <div className="card-body py-0 my-0 ">
                     <h5 className="card-title">Premium</h5>
                     <p className="card-text">1499/year</p>
                 </div>
             </div>}
             {selection==3? 
                <div className="card bg-success" style={{ width: "13rem", height: "6rem" , hover:"cursor-pointer" }} onClick={()=>{console.log("hii");setSelection(3)}} >
                    <div className="card-body py-0 my-0 ">
                        <h5 className="card-title">Premium</h5>
                        <p className="card-text">299/month</p>
                    </div>
                </div>:
                 <div className="card " style={{ width: "13rem", height: "6rem" , hover:"cursor-pointer" }} onClick={()=>{console.log("hii");setSelection(3)}} >
                 <div className="card-body py-0 my-0 ">
                     <h5 className="card-title">Premium</h5>
                     <p className="card-text">299/month</p>
                 </div>
             </div>}
            </div>
            

            <div className="d-grid gap-2 mt-2 bg-primary">
           { data.subscription==="no"?<Link className="btn btn-primary " role="button" aria-disabled="true" to="/payment">Continue With Super</Link>:<></>}
           { data.subscription==="1"?<Link className="btn btn-primary " role="button" aria-disabled="true" to="/payment">Upgrade to premium</Link>:<></>}
            
            </div>
        </div>
    )
}
