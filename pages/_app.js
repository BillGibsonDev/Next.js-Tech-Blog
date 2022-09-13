import '../styles/globals.css'

// components
import Layout from '../components/layout';

// redux
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";

import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import * as ga from '../lib/analytics';

function MyApp({ Component, pageProps }) {

const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} key={route}/>
      </Layout>
    </Provider>
  )
}

export default wrapper.withRedux(MyApp);
