"use client";

import { getTheme } from "../../utils/theme";
import { FaInfinity, FaImage, FaPalette, FaPrint, FaVectorSquare, FaBriefcase } from "react-icons/fa";

type AboutProps = {
  dark: boolean;
};

export default function About({ dark }: AboutProps) {
  const theme = getTheme(dark);

  const features = [
    {
      icon: <FaInfinity />,
      title: "Unlimited scans",
      text: "LinkQR also has no limitations. All generated QR codes will work forever, do not expire and have no scanning limits like you see at other commercial QR code generators. The created QR codes are static so the only limitation is that you can't edit the QR code again."
    },
    {
      icon: <FaImage />,
      title: "QR Codes with Logo",
      text: "Put a custom brand on your QR code. With LinkQR it is very simple and straightforward to add a logo to your QR Code. The QR codes are still readable. Every QR code can have an error correction up to 30%. This means 30% of the QR code (excluding the corner elements) can be removed and the QR code is still working."
    },
    {
      icon: <FaPalette />,
      title: "Custom Design and Colors",
      text: "Make your QR code look really unique with our design and color options. You can customize the shape and form of the corner elements and the body of the QR code. You can also set your own colors for all QR code elements. Add a gradient color to the QR code body and make it really stand out."
    },
    {
      icon: <FaPrint />,
      title: "High resolution QR Codes",
      text: "LinkQR offers print quality QR codes with high resolutions. When creating your QR code set the pixel size to the highest resolution to create .png files in print quality. You can also download vector formats like .svg, .eps, .pdf for best possible quality."
    },
    {
      icon: <FaVectorSquare />,
      title: "QR Code Vector Formats",
      text: "Most free QR code makers only allow creating QR codes in low resolutions and do not offer vector formats. Use the offered vector formats to print QR Codes in huge resolutions without losing quality. We recommend the .svg format for further editing."
    },
    {
      icon: <FaBriefcase />,
      title: "Free for commercial usage",
      text: "All generated QR Codes are 100% free and can be used for whatever you want. This includes all commercial purposes."
    }
  ];

  return (
    <section 
      style={{
        background: theme.panelBackground, 
        color: theme.panelText,
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div style={{ width: "100%" }}>
        <style>
          {`
            .features-grid {
              display: grid;
              grid-template-columns: 1fr;
            }
            .feature-icon { font-size: 2rem; }
            .feature-title { font-size: 1.25rem; }
            .feature-text { font-size: 1rem; }
            .about-card { padding: 2rem; }

            @media (min-width: 768px) {
              .about-card { padding: 4rem; } 
              .features-grid {
                grid-template-columns: 1fr 1fr;
              }
              .feature-icon { font-size: 60px; }
              .feature-title { font-size: 30px; }
              .feature-text { font-size: 20px; }
              .about-card:nth-child(odd) {
                border-right: 4px solid ${theme.panelText};
              }
            }
          `}
        </style>
        <div className="features-grid" style={{borderBottom: `4px solid ${theme.panelText}`,}}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="about-card"
              style={{ 
                // Padding handled by CSS class .about-card
                background: theme.panelBackground,
                borderTop: `4px solid ${theme.panelText}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.8rem" }}>
                <div 
                  className="feature-icon"
                  style={{ 
                    color: theme.primary,
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="feature-title" style={{ fontWeight: 600, margin: 0 }}>
                  {feature.title}
                </h3>
              </div>
              <p className="feature-text" style={{ lineHeight: "1.6", opacity: 0.9 }}>
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
