"use client";

import { getTheme } from "../../utils/theme";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type FAQProps = {
  dark: boolean;
};

export default function FAQ({ dark }: FAQProps) {
  const theme = getTheme(dark);
  
  const faqs = [
    {
       question: "What is a QR code?",
       answer: "QR code stands for Quick Response Code and is barcode type that was invented by Denso Wave in 1994."
    },
    {
       question: "Can I use the generated QR Codes for commercial purposes?",
       answer: "Yes, all QR codes you created with this QR generator are free and can be used for whatever you want."
    },
    {
       question: "Are the created qr codes expiring?",
       answer: "They do not expire and will work forever! QR Codes created with LinkQR are static and do not stop working after a certain time. You just can’t edit the content of the QR Codes again."
    },
    {
       question: "Is there a scan limit for the QR codes?",
       answer: "There is no limit and the created QR code will work forever. Scan it is many times as you wish!"
    },
    {
       question: "Is LinkQR saving my data?",
       answer: "We do not save or reuse your data in any form. We cache your qr code image files for 24h on our server to optimize the performance of LinkQR."
    },
    {
       question: "My QR code is not working, what can I do?",
       answer: "There are many reasons why a QR code is not working correctly. At first check your entered data. Sometimes there are little typos in your URL that break your QR code. Some QR codes (like vCard) contain a lot of data. Try reducing the data you entered for your QR code when possible. This can make it easier for QR code scanner apps to read your code. Try to remove the logo in your QR code and check if this helps. Also make sure that there is enough contrast between the background and foreground of the QR code. The foreground should always be darker than the background."
    },
    {
       question: "Does LinkQR work in all browsers?",
       answer: "LinkQR needs a modern HTML5 capable browser and is officially supporting Chrome, Firefox, Safari, Edge and Internet Explorer 11."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
     setActiveIndex(activeIndex === index ? null : index);
  }

  return (
    <section 
      id="faq"
      style={{ 
        padding: "4rem 1rem", 
        color: theme.panelText,
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div style={{ maxWidth: "800px", width: "100%" }}>
         <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
            Frequently Asked Questions
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
           {faqs.map((faq, index) => (
              <div 
                key={index} 
                style={{ 
                    background: theme.panelBackground,
                    border: `2px solid ${theme.panelText}`,
                    boxShadow: `4px 4px 0px 0px ${theme.panelText}`,
                    marginBottom: "1rem", // Add space for the shadow
                    transition: "all 0.2s ease-in-out",
                }}
                className="faq-item"
              >
                 <button
                    onClick={() => toggleFAQ(index)}
                    style={{
                       width: "100%",
                       padding: "1.5rem",
                       display: "flex",
                       justifyContent: "space-between",
                       alignItems: "center",
                       background: "transparent",
                       border: "none",
                       color: theme.panelText,
                       fontWeight: 600,
                       fontSize: "1.1rem",
                       cursor: "pointer",
                       textAlign: "left"
                    }}
                 >
                    {faq.question}
                    {activeIndex === index ? <FaChevronUp color={theme.primary} /> : <FaChevronDown />}
                 </button>
                 {activeIndex === index && (
                    <div style={{ padding: "0 1.5rem 1.5rem 1.5rem", lineHeight: "1.6", opacity: 0.9 }}>
                       {faq.answer}
                    </div>
                 )}
              </div>
           ))}
        </div>
      </div>
    </section>
  );
}
