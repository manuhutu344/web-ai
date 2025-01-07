import { useState } from "react"
import {FaCheckCircle} from "react-icons/fa"
import axios from "axios"
import {loadStripe} from "@stripe/react-stripe-js"
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

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
          popular: true,
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
        const response = await axios.post('Dari Belakang', {
          planId: plan.name,
          planAmount: plan.amount,
          planCurrency: 'idr',
        })
        if(response.data && response.data.url){
          window.location.href = response.data.url
        } else{
          console.log("Gagal membuat pembayaran")
        }
      } catch (error) {
        console.log("Error Pada Pembuatan Sesion Pembayaran", error)
      }
    }
  return (
    <section className="bg-gray-100 py-16 px-6">
      <h3 className="text-3xl font-semibold text-center mb-4">
      Paket penetapan harga untuk tim dari semua ukuran
      </h3>
      <p className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan)=>(
          <div key={plan.name} className={`rounded-lg shadow-lg p-8 text-center border-2 ${plan.popular ? 'border-red-500 bg-red-50': 'border-gray-200 bg-white'} `}>
            {plan.popular && (
              <span className="text-sm font-semibold text-red-600 bg-red-200 rounded-full px-3 py-1 inline-block mb-3">
                Paling Populer
              </span>
            )}
            <h4 className="font-bold text-lg text-gray-700 mb-2">
              {plan.name}
            </h4>
            <p className="text-grey-500 text-sm mb-4">
              {plan.description}
            </p>
            <p className="text-4xl font-bold text-gray-800 mb-6">
                ${plan.amount / 100} <span className="text-lg text-gray-500 ">/Bulan</span>
            </p>
            <ul className="text-left text-gray-700 mb-6 space-y-2">
                {plan.features.map((feature, index)=>(
                  <li key={index} className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2"/>
                    {feature}
                  </li>
                ))}
            </ul>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition duration-200" onClick={()=>handleCheckout(plan)}>
                {plan.name === 'Coba' ? 'Coba Sekarang' : 'Beli Sekarang'}
            </button>
          </div>
        ))}
      </p>
    </section>
  )
}

export default PaymentPlaneSection