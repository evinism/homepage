import dynamic from 'next/dynamic';


export default dynamic(() => import('../lib/color'), { ssr: false });
