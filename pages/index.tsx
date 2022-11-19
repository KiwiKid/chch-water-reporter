import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MapContainer from '../components/MyMapContainer'
import { Analytics } from '@vercel/analytics/react';

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Christchurch Water Usage</title>
        <meta name="description" content="Christchurch water usage visualised" />
        <meta name="google-site-verification" content="n16jJwjABkgf8P-Js7ofLvyXSdA4Y7jdMGytnGoGIM0" />
        <meta property="og:image" content="/preview.png"/>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💧</text></svg>">
        </link>
      </Head>

      <main >
        <div>
          <MapContainer/>
          <Analytics/>
        </div>
        </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
