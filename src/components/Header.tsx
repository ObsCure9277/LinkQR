"use client";

import { useEffect, useState } from "react";
import DarkModeToggle from "./Toggle";
import { FaDownload } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type HeaderProps = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ dark, setDark }: HeaderProps) {
  const black = dark ? "#000" : "#fff";
  const white = dark ? "#fff" : "#000";
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    async function fetchDownloadCount() {
      const { count, error } = await supabase
        .from("download_counts")
        .select("*", { count: "exact", head: true });
      if (!error && typeof count === "number") setDownloadCount(count);
    }
    fetchDownloadCount();
  }, []);

  return (
    <header
      style={{
        width: "100%",
        background: "#0070f3",
        borderBottom: `4px solid ${black}`,
        padding: "1rem 0",
        position: "sticky",
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, Arial, sans-serif",
        zIndex: 100,
      }}
    >
      <style>
        {`
          @media (max-width: 600px) {
            .linkqr-btn-mobile {
              padding: 0.1rem 0.7rem !important;
              font-size: 1rem !important;
              border-radius: 0.75rem !important;
              gap: 0.5rem !important;
              height: 2.5rem !important;
            }
            .download-icon-mobile {
              width: 1rem !important;
              height: 1rem !important;
            }
            .header-maxwidth-mobile {
              max-width: 98vw !important;
              width: 100vw !important;
              padding-left: 0.5rem !important;
              padding-right: 0.5rem !important;
            }
          }
        `}
      </style>
      <div
        className="header-maxwidth-mobile"
        style={{
          maxWidth: "68rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <h1
            className="linkqr-title"
            style={{
              color: "#000000",
              fontWeight: 900,
              fontSize: "2rem",
              letterSpacing: "-2px",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            LinkQR
          </h1>
          <img
            src="/linkqr_favicon.svg"
            alt="LinkQR Logo"
            style={{
              width: "2.2rem",
              height: "2.2rem",
              marginLeft: "0.25rem",
              verticalAlign: "middle",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span
            className="linkqr-btn linkqr-btn-mobile shadow-[3px_3px_0_white] active:translate-x-2 hover:translate-x-1 active:translate-y-2 hover:translate-y-1 hover:shadow-none"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.3rem 1rem",
              fontSize: "1rem",
              fontWeight: 900,
              background: black,
              color: white,
              border: `3px solid ${white}`,
              borderRadius: "8px",
              textTransform: "uppercase",
              transition: "background 0.2s, box-shadow 0.2s, transform 0.2s",
              cursor: "default",
              userSelect: "none",
            }}
          >
            <FaDownload className="download-icon-mobile" size={18} color={white} />
            {downloadCount}
          </span>
          <span>
            <DarkModeToggle dark={dark} setDark={setDark} black={black} white={white} />
          </span>
        </div>
      </div>
    </header>
  );
}