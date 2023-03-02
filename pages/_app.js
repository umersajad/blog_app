import '../styles/globals.css'
import Page from '../components/Page';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  )
};

export default MyApp
