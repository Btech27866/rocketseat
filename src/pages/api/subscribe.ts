import { NextApiRequest, NextApiResponse } from "next";
import {query as q} from 'faunadb'
import { getSession } from "next-auth/react";
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";

type User = {
    ref: {
        id: string;
    }
    data: {
        stripe_costumer_id: string;
    }
}

export default async (req:NextApiRequest, res:NextApiResponse) => {
    if(req.method === 'POST') {
        const session = await getSession({req})
        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('ignews-users-email'),
                    q.Casefold(session.user.email)
                )
            )
        )
        let custumerId = user.data.stripe_costumer_id
        if(!custumerId){
            const stripeConstumer = await stripe.customers.create({
                email: session.user.email,
                //metadata
            })
            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),
                    {
                        data: {
                            stripe_costumer_id: stripeConstumer.id,
                        }
                    }
                )
            )
            custumerId = stripeConstumer.id
        }
        
        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: custumerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1KYfwKGqKSUnn73xWMqMjxh8', quantity: 1 }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })
        return res.status(200).json({ sessionId: stripeCheckoutSession.id })
    }else{
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}