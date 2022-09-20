import dynamic from "next/dynamic";

// Because of annoying things.
const NoSSRApp = dynamic(() => import("../lib/jarquest"), { ssr: false });

export default NoSSRApp;
