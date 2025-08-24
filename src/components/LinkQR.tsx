"use client";

import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LinkQR({ dark }: { dark: boolean }) {
  const [link, setLink] = useState("");
  const [showQR, setShowQR] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [downloadCount, setDownloadCount] = useState(0);

  // Fetch total number of rows on mount
  useEffect(() => {
    fetchDownloadCount();
  });

  async function fetchDownloadCount() {
    const { count, error } = await supabase
      .from("download_counts")
      .select("*", { count: "exact", head: true });
    if (!error && typeof count === "number") setDownloadCount(count);
  }

  // Insert a new row and fetch count
  async function handleDownload() {
    const { error } = await supabase
      .from("download_counts")
      .insert([{ count: 1 }]);
    if (error) {
      console.error("Supabase insert error:", error);
    }
    await fetchDownloadCount();
  }

  // Color palette
  const black = dark ? "#000" : "#fff";
  const white = dark ? "#fff" : "#000";
  const blue = "#0070f3";

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
          @media (max-width: 600px) {
            .destination-link-title {
              text-align: center !important;
              margin-right: 0 !important;
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
                className="destination-link-title"
                style={{
                  fontWeight: 900,
                  fontSize: "2rem",
                  marginBottom: "0.1rem",
                  marginRight: typeof window !== 'undefined' && window.innerWidth <= 900 ? '0' : '48rem',
                  color: "#000000",
                  borderBottom: `4px solid ${blue}`,
                  paddingBottom: "0.25rem",
                  textAlign: typeof window !== 'undefined' && window.innerWidth <= 900 ? 'center' : 'left',
                  width: "100%",
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
            </form>
            <div className="linkqr-info-container flex flex-col gap-4 sm:flex-row">
              <div
                className="linkqr-info flex items-center gap-4 w-full p-6 text-lg font-extrabold uppercase rounded-lg border-4"
                style={{ background: "#FFD600", color: '#000000', borderColor: '#000000' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 10h8l3-10h4M4 10V7a2 2 0 012-2h12a2 2 0 012 2v3M4 10h16" />
                </svg>
                Paste link here
              </div>
              <div
                className="linkqr-info flex items-center gap-4 w-full p-6 text-lg font-extrabold uppercase rounded-lg border-4"
                style={{ background: "#FFD600", color: '#000000', borderColor: '#000000' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 10h8l3-10h4M4 10V7a2 2 0 012-2h12a2 2 0 012 2v3M4 10h16" />
                </svg>
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
                    const url = canvas.toDataURL("image/png");
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "qrcode.png";
                    a.click();
                    await handleDownload();
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
