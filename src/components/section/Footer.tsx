type FooterProps = {
  dark: boolean;
};

export default function Footer({ dark }: FooterProps) {
  const black = dark ? "#000" : "#e0e0e0";
  const blue = "#0070f3";

  return (
    <footer
      style={{
        width: "100%",
        background: blue,
        borderTop: `4px solid ${black}`,
        padding: "1.5rem 0",
        fontFamily: "Inter, Arial, sans-serif",
        color: '#000000',
        fontWeight: 700,
        fontSize: "1rem",
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <style>
        {`
          @media (max-width: 600px) {
            .footer-inner {
              flex-direction: column !important;
              gap: 0.5rem !important;
              align-items: center !important;
            }
          }
        `}
      </style>
      <div className="footer-inner" style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', // Keep center if content is less than 1200px, but usually for "same width" we might want space-between or just max-width wrapper
        alignItems: 'center', 
        gap: '10rem',
        maxWidth: "1200px",
        width: "100%",
        margin: "0 auto", // Center the container itself
        padding: "0 1rem" // Add padding to prevent edge touching on smaller screens
      }}>
        <span>
          © 2025 LinkQR. All rights reserved.
        </span>
        <span>
          Developed by <a
            href="https://github.com/ObsCure9277"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#000000',
              textDecoration: 'none',
              fontWeight: 700,
              transition: 'color 0.2s',
            }}
               onMouseOver={e => {
                 e.currentTarget.style.color = '#fff';
               }}
               onMouseOut={e => {
                 e.currentTarget.style.color = '#000';
               }}
          >
            Ng Shen Zhi
          </a>
        </span>
      </div>
    </footer>
  );
}