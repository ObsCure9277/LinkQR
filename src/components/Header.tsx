/* eslint-disable @next/next/no-img-element */
"use client";

import DarkModeToggle from "./Toggle";

type HeaderProps = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ dark, setDark }: HeaderProps) {
  const black = dark ? "#000" : "#fff";
  const white = dark ? "#fff" : "#000";

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
          <span>
            <DarkModeToggle dark={dark} setDark={setDark} black={black} white={white} />
          </span>
        </div>
      </div>
    </header>
  );
}