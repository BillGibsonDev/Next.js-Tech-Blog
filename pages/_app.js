import '../styles/globals.css'

// components
import Layout from '../components/layout';

// context
import { AuthWrapper } from '../context/AuthContext.js';

function MyApp({ Component, pageProps }) {

  return (
    <AuthWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthWrapper>
  )
}

export default MyApp;
