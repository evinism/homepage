import "../styles/global.css";
import { GoogleAnalytics } from "nextjs-google-analytics";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  );
}
