import dynamic from "next/dynamic";
import Head from "next/head";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import styles from "./index.module.css";
import MetronomeComponent from "./components/metronome";
import profilePic from "../../assets/images/ttb.png";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <>
      <Head>
        <title>🌮🌮🌯</title>
        <meta
          name="description"
          content="A simple metronome for not-so-simple times"
        />
        <meta property="og:url" content="https://tacotacoburrito.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TacoTacoBurrito" />
        <meta
          property="og:description"
          content="A simple metronome for not-so-simple times"
        />
        <meta property="og:image" content={profilePic.src} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <div className={styles.App}>
          <div className={styles.Background} />
          <MetronomeComponent />
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
