import { useEffect } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    //to fix the material-ui server side rendering issue.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles.parentElement);
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
