import 'bootstrap/dist/css/bootstrap.css';
import 'styles/globals.css';
import { useEffect } from 'react';
import Layout from 'src/components/layout/Layout';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle');
  }, []);

  return (
    <>
      <Head>
        <title>WebApp</title>
        <meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
      </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  );
}
