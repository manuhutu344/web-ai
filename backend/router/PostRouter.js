const router = require('express').Router()
require('dotenv').config()
const stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



module.exports = router