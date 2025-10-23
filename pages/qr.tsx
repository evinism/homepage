import { Button, Input, InputLabel } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import styles from "./qr.module.css";
import Head from "next/head";

const QR = () => {
  const [text, setText] = useState("");
  return (
    <>
      <Head>
        <title>QR Code Generator</title>
        <meta
          name="description"
          content="Generate raw QR codes. No tracking, no data collection."
        />
        <meta property="og:title" content="QR Code Generator" />
        <meta
          property="og:description"
          content="Generate raw QR codes. No tracking, no data collection."
        />
      </Head>
      <main className={styles.page}>
        <h1>QR Code Generator</h1>
        <Input
          type="text"
          value={text}
          placeholder="Enter text to encode"
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />
        {text && (
          <>
            <DisplayQR text={text} />
            <div>
              <Button
                onClick={async () => {
                  const dataURL = await QRCode.toDataURL(text);
                  const a = document.createElement("a");
                  a.href = dataURL;
                  a.download = "qrcode.png";
                  a.click();
                }}
              >
                Download
              </Button>
            </div>
          </>
        )}
      </main>
    </>
  );
};

const DisplayQR = ({ text }: { text: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current && text) {
      QRCode.toCanvas(canvasRef.current, text, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log('success!');
        }
      });
      console.log(QRCode.toDataURL(text));
    }
  }, [text]);
  return (
    <div>
      <canvas ref={canvasRef}/>
    </div>
  );
};

export default QR;