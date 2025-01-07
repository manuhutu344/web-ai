import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config()
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.use(cors());
app.use(express.json());

app.post('/pembayaran', async (req, res) => {
    const { planId, planAmount, planCurrency } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price_data: {
              currency: planCurrency || 'usd',
              product_data: {
                name: planId,
              },
              unit_amount: planAmount,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
      });
  
      res.json({ url: session.url });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  });

app.listen(3000, () =>{
    console.log('Server Jalan', 3000)
})
