import type { GetStaticPropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getPostPages } from '../lib/api'
import styles from '../styles/Home.module.css'
import { IPost } from '../types/generated/contentful'
import { format } from 'date-fns'

const Home: NextPage<{ pages: IPost[] }> = ({ pages }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CookBook</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          🚧 This will be a CookBOOK! 🚧
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>

          {pages.map(page => (
            <a href={`/posts/${page.fields.name}`} className={styles.card} key={page.sys.id}>
              <h2>{page.fields.name} &rarr;</h2>
              <p>{page.fields.age}</p>
              <p>{"Created at: " + format(new Date(page.sys.createdAt), 'd.LL.y HH:mm:SS')}</p>
          </a>
          ))}

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

export async function getStaticProps(context: GetStaticPropsContext) {
  const pages = await getPostPages();
  return {
    props: { pages }, // will be passed to the page component as props
  }
}
