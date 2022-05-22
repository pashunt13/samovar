import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../src/components/layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Самовар</title>
        <meta
          name="description"
          content="В Самоваре можно заказать банкет в Ростове-на-Дону, у нас просторный банкетный зал, где можно отметить юбилей, сыграть свадьбу, уютное кафе, русская баня на дровах, автомойка."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h3 className={styles.h3}>кафе</h3>
          <h1 className={styles.title}>САМОВАР</h1>
        </main>
      </div>
    </Layout>
  );
}
