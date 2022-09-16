import { useEffect } from 'react';

// styules
import '../styles/globals.css'

// components
import Layout from '../components/layout';

// next components
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router'

// redux
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";

// google analytics
import * as ga from '../lib/analytics';

// loading bar -nprogress
import dynamic from 'next/dynamic';
 const ProgressBar = dynamic(() => import('../components/ProgressBar'), { ssr: false });

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
        <ProgressBar />
      </Layout>
    </Provider>
  )
}

export default wrapper.withRedux(MyApp);
