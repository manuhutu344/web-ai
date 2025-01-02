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
            description: "Coba Saja Baru Coba",
            features: [
              'Project Slot Hanya Satu',
              'Analisis Basic',
              'Support Email'
            ]
        },
        {
          name: 'Coba 1',
          amount: 2500,
          description: "Coba Saja Baru Coba",
          features: [
            'Project Slot Hanya Satu',
            'Analisis Basic',
            'Support Email'
          ]
      },
      {
        name: 'Coba 2',
        amount: 3500,
        description: "Coba Saja Baru Coba",
        features: [
          'Project Slot Hanya Satu',
          'Analisis Basic',
          'Support Email'
        ]
    }
    ]
    async function handleCheckout(plan){
      const stripe = await stripePromise
      if(!stripe){
        console.error('Stripe gagal muncul')
        return
      }
      try {
        const response = await axios.post('Dari Backend'),{
          planId: plan.name,
          planAmount: plan.amount,
          planCurrency: 'idr',
        }
      } catch (error) {
        
      }
    }
  return (
    <div>PaymentPlaneSection</div>
  )
}

export default PaymentPlaneSection