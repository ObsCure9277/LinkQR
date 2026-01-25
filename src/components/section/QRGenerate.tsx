"use client";

import { useState } from "react";
import { Options } from "qr-code-styling";
import QRConfiguration from "../ui/QRConfiguration";
import QRPreview from "../ui/QRPreview";
import QRTypeNav, { QRType } from "../ui/QRTypeNav";

export default function LinkQR({ dark }: { dark: boolean }) {
  const [activeType, setActiveType] = useState<QRType>("url");
  const [options, setOptions] = useState<Options>({
    width: 300,
    height: 300,
    type: "svg",
    data: "https://example.com",
    image: "",
    margin: 5,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 5,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#000000",
      type: "square",
    },
    backgroundOptions: {
      color: "#e0e0e0",
    },
    cornersSquareOptions: {
      color: "#000000",
      type: "square",
    },
    cornersDotOptions: {
      color: "#000000",
      type: "square",
    },
  });

  return (
    <div
      className="linkqr-container"
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "calc(100vh - 200px)",
      }}
    >
      <QRTypeNav activeType={activeType} setActiveType={setActiveType} dark={dark} />

      <div
        className="linkqr-layout"
        style={{
          display: "flex",
          gap: "2rem",
          width: "100%",
          alignItems: "flex-start",
          backgroundColor: dark ? "#fff" : "#000",
        }}
      >
        {/* Left Panel: Configuration */}
        <div style={{ flex: 2, width: "100%" }}>
          <QRConfiguration qrType={activeType} options={options} setOptions={setOptions} dark={dark} />
        </div>

        {/* Right Panel: Preview */}
        <div style={{ flex: 1, width: "100%", minWidth: "300px", display: "flex", justifyContent: "center" }}>
          <QRPreview options={options} dark={dark} />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .linkqr-layout {
            flex-direction: column !important;
            align-items: center !important;
          }
          .linkqr-layout > div {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
