import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Analytics } from '@vercel/analytics/react';
import ByHousehold from '../components/ByHousehold'
import ByAmountUsed from '../components/ByAmountUsed'
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const WhereAmI: NextPage = () => {

  const router = useRouter()
  const { avg } = router.query

  const avgNum = parseInt(avg as string);

  return (
    <div className={styles.container}>
      <Head>
        <title>Christchurch Water Usage</title>
        <meta name="description" content="Christchurch Water Usage - Visualised" />
        <meta name="og:image" content="/preview.png"/>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💧</text></svg>">
        </link>
      </Head>

      <main >
        <Link style={{fontSize: '1.5rem', textDecoration: 'underline'}} href='/'>{`<<`} back to map</Link>
        <div>
          <ByHousehold markerLine={avgNum}/>
          <ByAmountUsed markerLine={avgNum}/>
          <Analytics/>
        </div>
        </main>
    </div>
  )
}

export default WhereAmI
