"use client";

import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { FaPaste, FaUpload } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";

export default function LinkQR({ dark }: { dark: boolean }) {
  const [link, setLink] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  // Color palette
  const black = dark ? "#000" : "#fff";
  const white = dark ? "#fff" : "#000";
  const blue = "#0070f3";
  const yellow = "#FFD600";

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, Arial, sans-serif",
        position: "relative",
        padding: "6rem 1rem",
      }}
    >
      <style>
        {`
          @media (max-width: 900px) {
            .linkqr-container {
              max-width: 100vw !important;
              padding: 1rem !important;
            }
            .linkqr-row {
              flex-direction: column !important;
              gap: 1.5rem !important;
            }
            .linkqr-form-panel, .linkqr-qr-panel {
              flex: unset !important;
              width: 100% !important;
              min-width: 0 !important;
            }
            .linkqr-qr-panel {
              align-items: stretch !important;
            }
            .linkqr-input {
              padding: 1rem !important;
              font-size: 1rem !important;
            }
            .linkqr-btn {
              padding: 1rem !important;
              font-size: 1rem !important;
            }
          }
          @media (max-width: 600px) {
            .linkqr-container {
              padding: 0.5rem !important;
            }
            .linkqr-title {
              font-size: 1.2rem !important;
              padding-bottom: 0.1rem !important;
            }
            .linkqr-row {
              gap: 1rem !important;
            }
            .linkqr-form-panel, .linkqr-qr-panel {
              padding: 0.5rem !important;
            }
            .linkqr-input {
              padding: 0.7rem !important;
              font-size: 0.9rem !important;
            }
            .linkqr-btn {
              padding: 0.7rem !important;
              font-size: 0.9rem !important;
            }
            .linkqr-info {
              margin-bottom: 1rem !important;
              font-size: 0.9rem !important;
            }
              .linkqr-info-container {
                flex-direction: column !important;
                gap: 0.1rem !important;
            }
          }
        `}
      </style>
      <div
        className="linkqr-container"
        style={{
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "72rem",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div style={{ width: "100%" }}>
          <h1
            className="linkqr-title"
            style={{
              fontWeight: 900,
              fontSize: "2rem",
              marginBottom: "1.5rem",
              color: black,
              borderBottom: `4px solid ${blue}`,
              display: "inline-block",
              paddingBottom: "0.25rem",
            }}
          >
            Generate your QR Code
          </h1>
        </div>
        <div
          className="linkqr-row"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            marginBottom: "1.5rem",
            width: "100%",
          }}
        >
          <div
            className="linkqr-form-panel"
            style={{
              background: blue,
              padding: "1rem",
              borderRadius: "12px",
              flex: 2.5,
              minWidth: 0,
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowQR(true);
              }}
            >
              <h1
                style={{
                  fontWeight: 900,
                  fontSize: "2rem",
                  marginBottom: "0.1rem",
                  marginRight: typeof window !== 'undefined' && window.innerWidth <= 600 ? '0' : '48rem',
                  color: "#000000",
                  borderBottom: `4px solid ${blue}`,
                  paddingBottom: "0.25rem",
                }}
              >
                Destination Link
              </h1>
              <input
                className="linkqr-input"
                type="url"
                placeholder="Paste your link here"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                  setShowQR(false);
                }}
                required
                style={{
                  width: "100%",
                  padding: "1.5rem",
                  fontSize: "1rem",
                  border: `3px solid ${black}`,
                  borderRadius: "8px",
                  marginBottom: "1rem",
                  background: blue,
                  color: "#ffffff",
                  fontWeight: 700,
                  outline: "none",
                  boxShadow: "none",
                }}
              />
              <button
                type="submit"
                className="linkqr-btn shadow-[3px_3px_0_white] active:translate-x-2 hover:translate-x-1 active:translate-y-2 hover:translate-y-1 hover:shadow-none"
                style={{
                  width: "100%",
                  padding: "1rem",
                  fontSize: "1rem",
                  fontWeight: 900,
                  background: white,
                  color: black,
                  border: `3px solid ${black}`,
                  borderRadius: "8px",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                  transition:
                    "background 0.2s, box-shadow 0.2s, transform 0.2s",
                }}
              >
                Generate QR Code
              </button>
              <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <label htmlFor="logo-upload"
                  className="linkqr-btn shadow-[3px_3px_0_white] active:translate-x-2 hover:translate-x-1 active:translate-y-2 hover:translate-y-1 hover:shadow-none"
                  style={{
                    width: "100%",
                    padding: "1rem",
                    fontSize: "1rem",
                    fontWeight: 900,
                    background: white,
                    color: black,
                    border: `3px solid ${black}`,
                    borderRadius: "8px",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                    transition: "background 0.2s, box-shadow 0.2s, transform 0.2s",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    textAlign: "center",
                  }}
                >
                  <FaUpload size={22} color={black}/>
                  <span style={{ flex: 1 }}>Upload Logo (optional)</span>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = ev => setLogo(ev.target?.result as string);
                        reader.readAsDataURL(file);
                      } else {
                        setLogo(null);
                      }
                    }}
                  />
                </label>
                {logo && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: '#0070f3', fontWeight: 700 }}>
                    Logo selected
                  </div>
                )}
              </div>
            </form>
            <div className="linkqr-info-container flex flex-col gap-4 sm:flex-row">
              <div
                className="linkqr-info flex items-center gap-4 w-full p-6 text-lg font-extrabold uppercase rounded-lg border-4"
                style={{ background: yellow, color: '#000000', borderColor: '#000000' }}
              >
                <FaPaste size={22} color="#000000" />
                Paste link here
              </div>
              <div
                className="linkqr-info flex items-center gap-4 w-full p-6 text-lg font-extrabold uppercase rounded-lg border-4"
                style={{ background: yellow, color: '#000000', borderColor: '#000000' }}
              >
                <FaDownload size={22} color="#000000" />
                Share to anyone !
              </div>
            </div>
          </div>
          {link && showQR && (
            <div
              className="linkqr-qr-panel"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                background: blue,
                padding: "1rem",
                borderRadius: "12px",
                flex: 1,
                minWidth: 0,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <div
                  style={{
                    border: `3px solid ${black}`,
                    borderRadius: "8px",
                    padding: "1rem",
                    background: blue,
                    display: "inline-block",
                  }}
                >
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <QRCodeCanvas
                      id="qr-canvas"
                      value={link}
                      size={245}
                      fgColor={"#ffffff"}
                      bgColor={blue}
                    />
                    {logo && (
                      <img
                        src={logo}
                        alt="Logo"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          width: "48px",
                          height: "48px",
                          transform: "translate(-50%, -50%)",
                          borderRadius: "8px",
                          background: "#fff",
                          objectFit: "contain",
                          boxShadow: "0 0 4px rgba(0,0,0,0.15)",
                          pointerEvents: "none"
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <button
                className="linkqr-btn shadow-[3px_3px_0_white] active:translate-x-2 hover:translate-x-1 active:translate-y-2 hover:translate-y-1 hover:shadow-none"
                style={{
                  marginTop: 0,
                  width: "100%",
                  padding: "1rem",
                  fontSize: "1rem",
                  fontWeight: 900,
                  background: white,
                  color: black,
                  border: `3px solid ${black}`,
                  borderRadius: "8px",
                  textTransform: "uppercase",
                  transition: "background 0.2s, box-shadow 0.2s, transform 0.2s",
                }}
                onClick={async () => {
                  const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
                  if (canvas) {
                    // If no logo, download as usual
                    if (!logo) {
                      const url = canvas.toDataURL("image/png");
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "qrcode.png";
                      a.click();
                      return;
                    }
                    // Draw logo onto a copy of the QR canvas
                    const tempCanvas = document.createElement("canvas");
                    tempCanvas.width = canvas.width;
                    tempCanvas.height = canvas.height;
                    const ctx = tempCanvas.getContext("2d");
                    if (ctx) {
                      ctx.drawImage(canvas, 0, 0);
                      // Draw logo in the center
                      const logoImg = new window.Image();
                      logoImg.src = logo;
                      await new Promise(resolve => {
                        logoImg.onload = resolve;
                      });
                      const logoSize = 48; // px
                      const x = (tempCanvas.width - logoSize) / 2;
                      const y = (tempCanvas.height - logoSize) / 2;
                      ctx.save();
                      ctx.beginPath();
                      ctx.roundRect(x, y, logoSize, logoSize, 8);
                      ctx.clip();
                      ctx.drawImage(logoImg, x, y, logoSize, logoSize);
                      ctx.restore();
                      // Download the combined image
                      const url = tempCanvas.toDataURL("image/png");
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "qrcode.png";
                      a.click();
                    }
                  }
                }}
              >
                Download QR Code
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
