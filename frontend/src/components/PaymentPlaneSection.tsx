import { useState } from "react"
import {FaCheckCircle} from "react-icons/fa"
import axios from "axios"
import {loadStripe} from "@stripe/react-stripe-js"

function PaymentPlaneSection() {
    const [billingCycle, setBillingCycle] = useState('monthly')
    const plans = [
        {
            name: 'Coba',
            amount: 1500,
            
        }
    ]
  return (
    <div>PaymentPlaneSection</div>
  )
}

export default PaymentPlaneSection