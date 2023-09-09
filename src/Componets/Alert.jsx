import React, { useContext, useEffect } from 'react'

export default function Alert({ showAlert,setShowAlert}) {
useEffect(()=>{
  setTimeout(()=>{
    setShowAlert({enable:false,alertType:"danger",alertMessage:"i am defaul"})
  }
   ,1500)
},[showAlert.enable])
  return (<>
{showAlert.enable==true?
      <div className={`alert alert-${showAlert.alertType} `} role="alert">
        {showAlert.alertMessage}
      </div>:<></>
}</>
  )
}
