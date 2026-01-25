"use client";

import { Options } from "qr-code-styling";
import { useState, useEffect } from "react";
import { FaLink, FaPalette, FaImage, FaShapes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { QRType } from "./QRTypeNav";

import { getTheme } from "../../utils/theme";

interface QRConfigurationProps {
  options: Options;
  setOptions: React.Dispatch<React.SetStateAction<Options>>;
  dark?: boolean;
  qrType: QRType;
}

type Section = "content" | "colors" | "logo" | "design";

export default function QRConfiguration({ options, setOptions, dark, qrType }: QRConfigurationProps) {
  const [activeSection, setActiveSection] = useState<Section>("content");
  const theme = getTheme(dark);
  
  // Local state for complex types fields to construct the final data string
  const [url, setUrl] = useState("https://example.com");
  const [text, setText] = useState("Enter your text");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [smsPhone, setSmsPhone] = useState("");
  const [smsMessage, setSmsMessage] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");
  const [btcAddress, setBtcAddress] = useState("");
  const [btcAmount, setBtcAmount] = useState("");

  // Update QR data when fields or type change
  useEffect(() => {
    let data = "";
    switch (qrType) {
      case "url":
        data = url;
        break;
      case "text":
        data = text;
        break;
      case "email":
        data = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        break;
      case "phone":
        data = `tel:${phone}`;
        break;
      case "sms":
        data = `smsto:${smsPhone}:${smsMessage}`;
        break;
      case "wifi":
        data = `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;
        break;
      case "bitcoin":
        data = `bitcoin:${btcAddress}?amount=${btcAmount}`;
        break;
      default:
        data = url;
    }
    setOptions((prev) => ({ ...prev, data }));
  }, [qrType, url, text, email, subject, message, phone, smsPhone, smsMessage, wifiSsid, wifiPassword, wifiEncryption, btcAddress, btcAmount, setOptions]);


  const updateOptions = (newOptions: Partial<Options>) => {
    setOptions((prev) => ({
      ...prev,
      ...newOptions,
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateOptions({
            image: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const renderSectionHeader = (id: Section, title: string, icon: React.ReactNode) => {
    const isActive = activeSection === id;
    return (
      <div
        onClick={() => setActiveSection(isActive ? id : id)}
        style={{
          padding: "1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: isActive ? theme.inputBg : "transparent",
          color: isActive ? theme.primary : theme.panelText,
          fontWeight: "bold",
          borderBottom: `1px solid ${theme.border}`,
          borderLeft: isActive ? `4px solid ${theme.primary}` : "4px solid transparent",
          transition: "all 0.2s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {icon}
          <span>{title}</span>
        </div>
        {isActive ? <FaChevronUp color={theme.primary} /> : <FaChevronDown />}
      </div>
    );
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0",
    border: "none",
    background: theme.inputBg,
    color: theme.panelText,
    outline: "none",
    fontSize: "1rem",
    marginBottom: "1rem",
    transition: "border-color 0.2s",
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = theme.primary;
  };

  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = theme.inputBorder;
  };

  const labelStyle = {
      display: "block", marginBottom: "0.5rem", color: theme.panelText, fontWeight: 600, fontSize: "0.9rem" 
  };

  return (
    <div
      style={{
        background: theme.panelBackground,
        boxShadow: theme.panelShadow,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingTop: "1rem",
      }}
    >
      {/* Content Section */}
      {renderSectionHeader("content", "Enter Content", <FaLink />)}
      {activeSection === "content" && (
        <div style={{ padding: "1.5rem"}}>
          {qrType === "url" && (
            <>
                <label style={labelStyle}>Your URL</label>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </>
          )}

          {qrType === "text" && (
            <>
                <label style={labelStyle}>Your Text</label>
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your text here" rows={4} style={{...inputStyle, resize: "vertical"}} onFocus={focusStyle} onBlur={blurStyle} />
            </>
          )}

          {qrType === "email" && (
            <>
                <label style={labelStyle}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                 <label style={labelStyle}>Subject</label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Email subject" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                 <label style={labelStyle}>Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Email body" rows={4} style={{...inputStyle, resize: "vertical"}} onFocus={focusStyle} onBlur={blurStyle} />
            </>
          )}

          {qrType === "phone" && (
            <>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1234567890" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </>
          )}

          {qrType === "sms" && (
             <>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" value={smsPhone} onChange={(e) => setSmsPhone(e.target.value)} placeholder="+1234567890" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                 <label style={labelStyle}>Message</label>
                <textarea value={smsMessage} onChange={(e) => setSmsMessage(e.target.value)} placeholder="SMS body" rows={4} style={{...inputStyle, resize: "vertical"}} onFocus={focusStyle} onBlur={blurStyle} />
            </>
          )}

          {qrType === "wifi" && (
             <>
                <label style={labelStyle}>Network Name (SSID)</label>
                <input type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="SSID" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                <label style={labelStyle}>Password</label>
                <input type="text" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} placeholder="Password" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                <label style={labelStyle}>Encryption</label>
                 <select value={wifiEncryption} onChange={(e) => setWifiEncryption(e.target.value)} style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}>
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">No Encryption</option>
                 </select>
            </>
          )}

            {qrType === "bitcoin" && (
             <>
                <label style={labelStyle}>Bitcoin Address</label>
                <input type="text" value={btcAddress} onChange={(e) => setBtcAddress(e.target.value)} placeholder="Bitcoin Address" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
                <label style={labelStyle}>Amount (BTC)</label>
                <input type="number" step="0.00000001" value={btcAmount} onChange={(e) => setBtcAmount(e.target.value)} placeholder="0.00" style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </>
          )}
        </div>
      )}

      {/* Colors Section */}
      {renderSectionHeader("colors", "Set Colors", <FaPalette />)}
      {activeSection === "colors" && (
        <div style={{ padding: "1.5rem", display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", color: theme.panelText, fontSize: "0.9rem" }}>Foreground Color</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
               <input 
                  type="color" 
                  value={options.dotsOptions?.color || "#000000"} 
                  onChange={(e) => updateOptions({ dotsOptions: { ...options.dotsOptions, color: e.target.value } })}
                  style={{ borderRadius: "0", border: "none", width: "40px", height: "40px", cursor: "pointer" }}
               />
               <span style={{ color: theme.panelText }}>{options.dotsOptions?.color || "#000000"}</span>
            </div>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", color: theme.panelText, fontSize: "0.9rem" }}>Background Color</label>
             <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
               <input 
                  type="color" 
                  value={options.backgroundOptions?.color || "#ffffff"} 
                  onChange={(e) => updateOptions({ backgroundOptions: { ...options.backgroundOptions, color: e.target.value } })}
                  style={{ borderRadius: "0", border: "none", width: "40px", height: "40px", cursor: "pointer" }}
               />
               <span style={{ color: theme.panelText }}>{options.backgroundOptions?.color || "#ffffff"}</span>
            </div>
          </div>
        </div>
      )}

      {/* Logo Section */}
      {renderSectionHeader("logo", "Add Logo Image", <FaImage />)}
      {activeSection === "logo" && (
        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
           <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            style={{ color: theme.panelText }}
          />
          {options.image && (
             <button
                onClick={() => updateOptions({ image: undefined })}
                style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.9rem",
                    borderRadius: "0",
                    border: "none",
                    background: "transparent",
                    color: theme.panelText,
                    cursor: "pointer",
                    alignSelf: "start"
                }}
             >
                Remove Logo
             </button>
          )}
        </div>
      )}

      {/* Design Section */}
      {renderSectionHeader("design", "Customize Design", <FaShapes />)}
      {activeSection === "design" && (
        <div style={{ padding: "1.5rem", display: "grid", gap: "1.5rem" }}>
           {/* Body Shape */}
           <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: theme.panelText, fontSize: "0.9rem" }}>Body Shape</label>
              <select
                value={options.dotsOptions?.type || "square"}
                onChange={(e) => updateOptions({ dotsOptions: { ...options.dotsOptions, type: e.target.value as any } })}
                style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0",
                    border: "none",
                    background: theme.inputBg,
                    color: theme.panelText,
                    outline: "none"
                }}
                onFocus={focusStyle} 
                onBlur={blurStyle}
              >
                  <option value="square">Square</option>
                  <option value="dots">Dots</option>
                  <option value="rounded">Rounded</option>
                  <option value="extra-rounded">Extra Rounded</option>
                  <option value="classy">Classy</option>
                  <option value="classy-rounded">Classy Rounded</option>
              </select>
           </div>
           
           {/* Eye Frame Shape */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: theme.panelText, fontSize: "0.9rem" }}>Eye Frame Shape</label>
              <select
                value={options.cornersSquareOptions?.type || "square"}
                onChange={(e) => updateOptions({ cornersSquareOptions: { ...options.cornersSquareOptions, type: e.target.value as any } })}
                style={{
                   width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0",
                    border: "none",
                    background: theme.inputBg,
                    color: theme.panelText,
                    outline: "none"
                }}
                onFocus={focusStyle} 
                onBlur={blurStyle}
              >
                  <option value="square">Square</option>
                  <option value="dot">Dot</option>
                  <option value="extra-rounded">Extra Rounded</option>
              </select>
           </div>

           {/* Eye Ball Shape */}
           <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: theme.panelText, fontSize: "0.9rem" }}>Eye Ball Shape</label>
              <select
                value={options.cornersDotOptions?.type || "square"}
                onChange={(e) => updateOptions({ cornersDotOptions: { ...options.cornersDotOptions, type: e.target.value as any } })}
                 style={{
                   width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0",
                    border: "none",
                    background: theme.inputBg,
                    color: theme.panelText,
                    outline: "none"
                }}
                onFocus={focusStyle} 
                onBlur={blurStyle}
              >
                  <option value="square">Square</option>
                  <option value="dot">Dot</option>
              </select>
           </div>
        </div>
      )}
    </div>
  );
}
