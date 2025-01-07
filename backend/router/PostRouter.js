const router = require('express').Router()
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.post('/pembayaran', async (req,res)=>{
    const {planId, planAmount, planCurrency} = req.body
    try {
        const session = await stripe.checkout.session.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [
                {
                    price_data: {
                        currency: planCurrency || 'idr',
                        product_data: {
                            name: planId,
                        },
                        unit_amount: planAmount,
                        recurring: {
                            interval: 'month'
                        },
                    },
                    quantity: 1
                },
            ],
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
        })
    } catch (error) {
        console.log(error)
    }
})



module.exports = router