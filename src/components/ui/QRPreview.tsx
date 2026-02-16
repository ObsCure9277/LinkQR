"use client";

import { useEffect, useRef, useState } from "react";
import QRCodeStyling, { Options } from "qr-code-styling";
import { FaDownload, FaImage, FaFileCode } from "react-icons/fa";
import { getTheme } from "../../utils/theme";

interface QRPreviewProps {
  options: Options;
  dark?: boolean;
}

export default function QRPreview({ options, dark }: QRPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const theme = getTheme(dark);

  useEffect(() => {
    // Re-initialize the QR code instance whenever options change
    // This ensures that structural changes (shapes, etc.) are correctly applied
    // adhering to the user's request for full regeneration.
    const qr = new QRCodeStyling(options);
    setQrCode(qr);
    if (ref.current) {
      ref.current.innerHTML = "";
      qr.append(ref.current);
    }
  }, [options]);

  const handleDownload = (extension: "png" | "jpeg" | "webp" | "svg") => {
    if (!qrCode) return;
    qrCode.download({ extension });
  };

  return (
    <div
      style={{
        background: theme.panelBackground,
        boxShadow: theme.panelShadow,
        borderRadius: "0",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        border: "none",
        color: theme.panelText,
        width: "100%",
        maxWidth: "400px",
        position: "sticky",
        top: "2rem",
      }}
    >
      <div 
        ref={ref} 
        style={{ 
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
        }} 
      />
      
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <button
          onClick={() => handleDownload("png")}
          style={{
            background: theme.primary,
            color: theme.activeText,
            border: "none",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "0",
            cursor: "pointer",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transition: "all 0.2s",
            boxShadow: "0 4px 14px 0 rgba(0,118,255,0.39)"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,118,255,0.23)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px 0 rgba(0,118,255,0.39)"; }}
        >
          <FaDownload /> Download PNG
        </button>
        
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "space-between" }}>
            <button
                onClick={() => handleDownload("svg")}
                style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    color: theme.panelText,
                    padding: "0.5rem",
                    borderRadius: "0",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    gap: "0.25rem",
                    transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.color = theme.primary; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.panelText; }}
            >
                <FaFileCode /> SVG
            </button>
            <button
                onClick={() => handleDownload("jpeg")}
                style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    color: theme.panelText,
                    padding: "0.5rem",
                    borderRadius: "0",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    gap: "0.25rem",
                    transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.color = theme.primary; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.panelText; }}
            >
                <FaImage /> JPG
            </button>
            <button
                onClick={() => handleDownload("webp")}
                style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    color: theme.panelText,
                    padding: "0.5rem",
                    borderRadius: "0",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                     display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    gap: "0.25rem"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.color = theme.primary; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.panelText; }}
            >
                <FaImage /> WEBP
            </button>
        </div>
      </div>
    </div>
  );
}
