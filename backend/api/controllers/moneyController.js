// const stripe = require('stripe')(process.env.STRIPE_KEY_TEST);

exports.moneyWithdraw = (req, res) => {
    console.log(req.user);
}

exports.moneyPay = async (req, res) => {
    // try {
    //     const currency = 'RUB';
    //     const amount = 10000;
    //     const name = 'Product Name';

    //     const session = await stripe.checkout.sessions.create({
    //         mode: 'payment',
    //         line_items: [
    //             {
    //                 price_data: {
    //                     currency: currency,
    //                     product_data: {
    //                         name: name,
    //                     },
    //                     unit_amount: amount,
    //                 },
    //                 quantity: 1,
    //             },
    //         ],
    //         success_url: 'http://localhost:3000/customer?pay=true',
    //         cancel_url: 'http://localhost:3000/customer/order/create?pay=false',
    //     });
    //     console.log(session.url);
    //     res.json({ url: session.url });
    // } catch (error) {
    //     console.error('Error creating Stripe session:', error);
    //     res.status(500).json({ error: 'Failed to create payment session' });
    // }
}