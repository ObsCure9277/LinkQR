"use client";

import { useState } from "react";
import { FaLink, FaFont, FaEnvelope, FaPhone, FaSms, FaWifi, FaBitcoin } from "react-icons/fa";
import { getTheme } from "../../utils/theme";

export type QRType = "url" | "text" | "email" | "phone" | "sms" | "wifi" | "bitcoin";

interface QRTypeNavProps {
  activeType: QRType;
  setActiveType: (type: QRType) => void;
  dark?: boolean;
}

const buttons: { type: QRType; label: string; icon: React.ReactNode }[] = [
  { type: "url", label: "URL", icon: <FaLink /> },
  { type: "text", label: "Text", icon: <FaFont /> },
  { type: "email", label: "Email", icon: <FaEnvelope /> },
  { type: "phone", label: "Phone", icon: <FaPhone /> },
  { type: "sms", label: "SMS", icon: <FaSms /> },
  { type: "wifi", label: "WiFi", icon: <FaWifi /> },
  { type: "bitcoin", label: "Bitcoin", icon: <FaBitcoin /> },
];

export default function QRTypeNav({ activeType, setActiveType, dark }: QRTypeNavProps) {
  const [hoveredType, setHoveredType] = useState<QRType | null>(null);
  const theme = getTheme(dark);

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        overflowX: "auto",
        width: "100%",
        scrollbarWidth: "none", // Hide scrollbar for cleaner look
        msOverflowStyle: "none",
        flexWrap: "nowrap", // Allow horizontal scrolling
        background: theme.panelBackground,
      }}
      className="no-scrollbar"
    >
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {buttons.map((btn) => (
        <button
          key={btn.type}
          onClick={() => setActiveType(btn.type)}
          onMouseEnter={() => setHoveredType(btn.type)}
          onMouseLeave={() => setHoveredType(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1rem",
            background: activeType === btn.type ? theme.primary : "transparent",
            color: activeType === btn.type 
              ? theme.activeText 
              : (hoveredType === btn.type ? theme.primary : theme.panelText),
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "1rem",
            whiteSpace: "nowrap",
            transition: "all 0.2s ease",
          }}
        >
          {btn.icon}
          <span>{btn.label}</span>
        </button>
      ))}
    </div>
  );
}
