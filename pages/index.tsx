import Head from "next/head";
import { getSortedPostsData } from "../lib/posts";
import dynamic from "next/dynamic";

const App = dynamic(() => import("../evinos/src"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=VT323"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="EvinOS v1.0. Definitely secure with no vulnerabilities."
        />
        <meta property="og:image" content="/images/og.png" />
        <meta name="og:title" content="Evin Sellin's Homepage" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/images/og.png" />
        <title>Evin OS</title>
        <style>{'body: {backgroundColor: "black"}'}</style>
      </Head>
      <App />
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
