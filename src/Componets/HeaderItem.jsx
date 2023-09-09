import React from 'react'
import {  Link , useLocation } from "react-router-dom";
function HeaderItem({name,Icon,url}) {
  return (
    <div className='text-white flex items-center gap-3
    text-[15px] font-semibold cursor-pointer hover:underline
    underline-offset-8 mb-2'>
        <Icon className="w-[80px] object-cover"/>
        <Link  className="dropdown-item" to={url}>{name}</Link >
    </div>
  )
}

export default HeaderItem