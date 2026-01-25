/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import DarkModeToggle from "../ui/DarkMode";
import { FaBars, FaTimes } from "react-icons/fa";

type HeaderProps = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ dark, setDark }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const black = dark ? "#000" : "#e0e0e0";
  const white = dark ? "#e0e0e0" : "#000";

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
          .desktop-nav {
            display: flex;
            align-items: center;
            gap: 1.5rem;
          }
          .mobile-header-actions {
            display: none; /* Hidden on desktop */
            align-items: center;
            gap: 1rem;
            z-index: 201;
          }
          .mobile-menu-btn {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            color: ${black};
          }
          .mobile-menu-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0070f3;
            z-index: 200;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2rem;
          }
          @media (max-width: 600px) {
            .header-maxwidth-mobile {
              max-width: 98vw !important;
              width: 100vw !important;
              padding-left: 0.5rem !important;
              padding-right: 0.5rem !important;
            }
            .desktop-nav {
              display: none !important;
            }
            .mobile-header-actions {
              display: flex !important; /* Visible on mobile */
            }
            .mobile-menu-btn {
              display: block !important;
            }
            .mobile-menu-overlay.open {
              display: flex !important;
            }
          }
        `}
      </style>
      <div
        className="header-maxwidth-mobile"
        style={{
          maxWidth: "1200px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", zIndex: 201 }}>
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
          <h1
            className="linkqr-title"
            style={{
              color: "#000000",
              fontWeight: 900,
              fontSize: "2rem",
              letterSpacing: "-2px",
              margin: 0,
            }}
          >
            LinkQRCode
          </h1>
        </div>
        
        {/* Desktop Nav: Links + Toggle */}
        <div className="desktop-nav" style={{ gap: "3rem" }}>
          <nav style={{ display: "flex", gap: "3rem" }}>
            <a 
              href="#about" 
              style={{ 
                color: "#000", 
                textDecoration: "none", 
                fontWeight: 700,
                fontSize: "1.1rem",
                cursor: "pointer"
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About
            </a>
            <a 
              href="#faq" 
              style={{ 
                color: "#000", 
                textDecoration: "none", 
                fontWeight: 700,
                fontSize: "1.1rem",
                cursor: "pointer"
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              FAQ
            </a>
          </nav>
          <span>
            <DarkModeToggle dark={dark} setDark={setDark} black={black} white={white} />
          </span>
        </div>

        {/* Mobile Header Actions: Burger + Toggle */}
        <div className="mobile-header-actions">
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          
          <DarkModeToggle dark={dark} setDark={setDark} black={black} white={white} />
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
           <a 
              href="#about" 
              style={{ 
                color: "#000", 
                textDecoration: "none", 
                fontWeight: 900,
                fontSize: "2rem",
                cursor: "pointer"
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About
            </a>
            <a 
              href="#faq" 
              style={{ 
                color: "#000", 
                textDecoration: "none", 
                fontWeight: 900,
                fontSize: "2rem",
                cursor: "pointer"
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              FAQ
            </a>
        </div>
      </div>
    </header>
  );
}