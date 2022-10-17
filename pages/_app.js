import "../styles/global.css";
import { GoogleAnalytics } from "nextjs-google-analytics";


export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  );
}
