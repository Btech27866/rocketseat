import styles from '../style/home.module.scss'
import {SubscribeButton} from '../components/SubscribeButton'
import Head from 'next/head'
import {GetStaticProps} from 'next'
import {stripe} from '../services/stripe'

interface Homeprops{
  product:{
    priceId: string;
    amount: number;
  }
}

export default function Home({product}:Homeprops) {
  return (
    <>
      <Head>
        <title> Start | ignews</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏️ Hey, welcome</span>
          <h1>News about the <span>React </span>world.</h1>
          <p>
            Get access to all the publications <br/>
            <span> for {product.amount} month </span>
          </p>
        <SubscribeButton priceId={product.priceId}/>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </> 
  )
}

export const getStaticProps : GetStaticProps  =async() =>{
  const price=await stripe.prices.retrieve('price_1KYfwKGqKSUnn73xWMqMjxh8')
  const product={
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  }

  return{
    props:{
      product
    },
    revalidate: 60 * 60 * 24 //a revalidação irá ocorrer a cada 24 horas
  }
}