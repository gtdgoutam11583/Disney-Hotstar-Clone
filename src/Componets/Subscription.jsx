import React from 'react'
import logo from './../assets/Images/logo.png'
import { FiX } from "react-icons/fi";
import SubscriptionTable from './SubscriptionTable';

export const Subscription = () => {
  return (
    <div class="d-flex justify-content-between bg-white">
    <div class="p-2 "><h1>Subscribe now and start streaming</h1></div>
    <div class="p-2 flex-grow-1">
      <SubscriptionTable />
    </div>
  </div>
  )
}
