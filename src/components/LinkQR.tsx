/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRef, useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { createClient } from "@supabase/supabase-js";
import { FaPaste, FaShare, FaUpload, FaPalette } from "react-icons/fa";

export default function LinkQR({ dark }: { dark: boolean }) {
  const supabase =
    typeof window !== "undefined"
      ? createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
      : null;

  const [link, setLink] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [, setDownloadCount] = useState(0);
  const [logo, setLogo] = useState<string | null>(null);
  const [qrColor, setQrColor] = useState("#ffffff");
  const [downloadName, setDownloadName] = useState("qrcode");

  // Ref for QR code container
  const qrRef = useRef<HTMLDivElement>(null);

  async function fetchDownloadCount() {
    if (!supabase) return;
    const { count, error } = await supabase
      .from("download_counts")
      .select("*", { count: "exact", head: true });
    if (!error && typeof count === "number") setDownloadCount(count);
  }

  useEffect(() => {
    if (!supabase) return;
    fetchDownloadCount();
  }, [fetchDownloadCount, supabase]);

  async function handleDownload() {
    if (!supabase) return;
    if (qrRef.current) {
      const qrNode = qrRef.current;
      const width = 245;
      const height = 245;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const qrCanvas = qrNode.querySelector("canvas");
      if (qrCanvas) {
        ctx.drawImage(qrCanvas, 0, 0, width, height);
      }

      if (logo) {
        const img = new window.Image();
        img.src = logo;
        img.onload = () => {
          const logoSize = 60;
          ctx.drawImage(
            img,
            (width - logoSize) / 2,
            (height - logoSize) / 2,
            logoSize,
            logoSize
          );
          const url = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = url;
          a.download = `${downloadName || "qrcode"}.png`;
          a.click();
        };
      } else {
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `${downloadName || "qrcode"}.png`;
        a.click();
      }
    }
    await supabase.from("download_counts").insert([{ count: 1 }]);
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
        padding: "2.5rem 1rem",
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
              fontSize: "2.5rem",
              marginBottom: "1rem",
              color: blue,
              display: "inline-block",
            }}
          >
            QR Codes
          </h1>
          <h1
            className="linkqr-title"
            style={{
              fontWeight: 900,
              fontSize: "2rem",
              marginBottom: "1rem",
              color: black,
              display: "inline-block",
              marginLeft: "0.6rem",
            }}
          >
            to Boost Your Business
          </h1>
        </div>
        <span
          style={{
            fontWeight: 500,
            fontSize: "1.25rem",
            marginBottom: "1.5rem",
            color: black,
            display: "inline-block",
            paddingBottom: "1.5rem",
          }}
        >
          Spread the word about your business or personal website ! Simply
          generate a QR code that links to your desired URL, and share it on
          your marketing materials, social media, or even in-store displays.
        </span>
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
                  marginRight:
                    typeof window !== "undefined" && window.innerWidth <= 900
                      ? "0"
                      : "48rem",
                  color: "#000000",
                  borderBottom: `4px solid ${blue}`,
                  paddingBottom: "0.25rem",
                  textAlign:
                    typeof window !== "undefined" && window.innerWidth <= 900
                      ? "center"
                      : "left",
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
                  padding: "1rem",
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

              <>
                <h1
                  className="filename-title"
                  style={{
                    fontWeight: 900,
                    fontSize: "2rem",
                    marginBottom: "0.1rem",
                    marginRight:
                      typeof window !== "undefined" && window.innerWidth <= 900
                        ? "0"
                        : "48rem",
                    color: "#000000",
                    borderBottom: `4px solid ${blue}`,
                    paddingBottom: "0.25rem",
                    textAlign:
                      typeof window !== "undefined" && window.innerWidth <= 900
                        ? "center"
                        : "left",
                    width: "100%",
                  }}
                >
                  File Name
                </h1>
                {/* QR Code File Name Input with same design as link input */}
                <input
                  className="linkqr-input"
                  type="text"
                  value={downloadName}
                  onChange={(e) => setDownloadName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "1rem",
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
                  placeholder="Enter QR file name"
                  maxLength={32}
                  title="QR Code File Name"
                />
              </>
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
              {/* Upload Logo Button */}
              <label
                htmlFor="logo-upload"
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  transition:
                    "background 0.2s, box-shadow 0.2s, transform 0.2s",
                }}
              >
                <FaUpload style={{ marginRight: "0.5rem" }} />
                Upload Logo
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setLogo(ev.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </form>
            <div className="linkqr-info-container flex flex-col gap-4 sm:flex-row">
              <div
                className="linkqr-info flex items-center gap-4 w-full p-6 text-lg font-extrabold uppercase rounded-lg border-4"
                style={{
                  background: "#FFD600",
                  color: "#000000",
                  borderColor: "#000000",
                }}
              >
                <FaPaste size={24} />
                Paste link here
              </div>
              <div
                className="linkqr-info flex items-center gap-4 w-full p-6 text-lg font-extrabold uppercase rounded-lg border-4"
                style={{
                  background: "#FFD600",
                  color: "#000000",
                  borderColor: "#000000",
                }}
              >
                <FaShare size={24} />
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
                background: blue,
                padding: "1rem",
                borderRadius: "12px",
                flex: 1,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    border: `3px solid ${black}`,
                    borderRadius: "8px",
                    padding: "1rem",
                    background: blue,
                    display: "inline-block",
                  }}
                  ref={qrRef}
                >
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <QRCodeCanvas
                      id="qr-canvas"
                      value={link}
                      size={245}
                      fgColor={qrColor}
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
                          transform: "translate(-50%, -50%)",
                          width: "60px",
                          height: "60px",
                          borderRadius: "12px",
                          objectFit: "contain",
                          pointerEvents: "none",
                          background: "#fff",
                          boxShadow: "0 0 8px rgba(0,0,0,0.15)",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* Color Picker */}
              <div
                className="linkqr-btn"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: 900,
                  background: white,
                  color: black,
                  border: `3px solid ${black}`,
                  borderRadius: "8px",
                  textTransform: "uppercase",
                  margin: "1rem 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  boxShadow: "3px 3px 0 #fff",
                  transition:
                    "background 0.2s, box-shadow 0.2s, transform 0.2s",
                }}
              >
                <FaPalette size={22} style={{ marginRight: "0.5rem" }} />
                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    border: `3px solid ${black}`,
                    borderRadius: "8px",
                    background: white,
                    cursor: "pointer",
                    marginRight: "0.5rem",
                    boxShadow: "none",
                  }}
                  title="Pick QR color"
                />
                <input
                  type="text"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  style={{
                    width: "7rem",
                    padding: "0.7rem",
                    fontSize: "1rem",
                    fontWeight: 900,
                    background: white,
                    color: black,
                    border: `3px solid ${black}`,
                    borderRadius: "8px",
                    textTransform: "uppercase",
                    boxShadow: "none",
                    transition:
                      "background 0.2s, box-shadow 0.2s, transform 0.2s",
                  }}
                  placeholder="#ffffff"
                  maxLength={7}
                  title="Enter hex color"
                />
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
                  transition:
                    "background 0.2s, box-shadow 0.2s, transform 0.2s",
                }}
                onClick={handleDownload}
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
