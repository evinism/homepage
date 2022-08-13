import dynamic from "next/dynamic";

// Because of annoying things.
const NoSSRApp = dynamic(() => import("./App"), { ssr: false });

export default NoSSRApp;
