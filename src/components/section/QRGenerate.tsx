"use client";

import { useState } from "react";
import { Options } from "qr-code-styling";
import QRConfiguration from "../ui/QRConfiguration";
import QRPreview from "../ui/QRPreview";
import QRTypeNav, { QRType } from "../ui/QRTypeNav";
import { FaDownload, FaEdit, FaInfinity } from "react-icons/fa";

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "calc(100vh)",
      }}
    >
      <div className="hidden md:block" style={{ textAlign: "center", marginBottom: "3rem", marginTop: "3rem", width: "100%"}}>
        <h1 style={{ 
          fontSize: "3rem", 
          fontWeight: 900, 
          color: dark ? "#000" : "#e0e0e0",
          marginBottom: "2rem",
          letterSpacing: "-0.02em"
        }}>
          QR Codes Generator
        </h1>
        <div className="slogan-benefits" style={{ 
           display: "flex", 
           justifyContent: "center", 
           gap: "1.5rem", 
           flexWrap: "wrap",
           color: dark ? "#333" : "#ccc",
           fontSize: "1.1rem",
           fontWeight: 500
        }}>
           <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><FaDownload /> Free instant download</span>
           <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><FaEdit /> Easy customisation</span>
           <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><FaInfinity /> Lifetime validity</span>
        </div>
      </div>

      <div style={{ width: "100%", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
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
        @media (max-width: 600px) {
          .slogan-benefits {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
