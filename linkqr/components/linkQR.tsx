'use client';

import { useState } from 'react';
import DarkModeToggle from './toggle';
import { QRCodeCanvas } from 'qrcode.react';

export default function LinkQR() {
  const [link, setLink] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [dark, setDark] = useState(false);

  // Color palette
  const black = dark ? '#000' : '#fff';
  const white = dark ? '#fff' : '#000';
  const blue = '#0070f3';

  return (
    <main
      style={{
        minHeight: '100vh',
        background: white,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, Arial, sans-serif',
        position: 'relative',
      }}
    >
      <DarkModeToggle dark={dark} setDark={setDark} black={black} white={white} />
      <div
        style={{
          background: white,
          border: `4px solid ${black}`,
          borderRadius: '16px',
           className: "shadow-lg",
          padding: '2rem',
          maxWidth: '350px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontWeight: 900,
            fontSize: '2rem',
            marginBottom: '1.5rem',
            color: black,
            letterSpacing: '-2px',
            borderBottom: `4px solid ${blue}`,
            display: 'inline-block',
            paddingBottom: '0.25rem',
          }}
        >
          LinkQR
        </h1>
        <div style={{ background: blue, padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
          <form
            onSubmit={e => {
              e.preventDefault();
              setShowQR(true);
            }}
          >
            <input
              type="url"
              placeholder="Paste your link here"
              value={link}
              onChange={e => {
                setLink(e.target.value);
                setShowQR(false);
              }}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: `3px solid ${black}`,
                borderRadius: '8px',
                marginBottom: '1rem',
                background: blue,
                color: '#ffffff',
                fontWeight: 700,
                outline: 'none',
                boxShadow: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                fontWeight: 900,
                background: white,
                color: black,
                border: `3px solid ${black}`,
                borderRadius: '8px',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
              }}
              className={`shadow-[4px_4px_0_white] active:translate-x-2 hover:translate-x-1 active:translate-y-2 hover:translate-y-1 hover:shadow-none`}
            >
              Generate QR Code
            </button>
          </form>
        </div>
        {showQR && link && (
          <div
            style={{
              marginTop: '1rem',
              padding: '1rem',
              background: blue,
              border: `3px solid ${black}`,
              borderRadius: '8px',
             className: "shadow-lg",
              display: 'inline-block',
            }}
          >
            <QRCodeCanvas id="qr-canvas" value={link} size={235} fgColor={'#ffffff'} bgColor={blue} />
            <button
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                fontWeight: 900,
                background: white,
                color: black,
                border: `3px solid ${black}`,
                borderRadius: '8px',
                className: "shadow-lg",
                textTransform: 'uppercase',
                transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
              }}
              className={`shadow-[4px_4px_0_white] active:translate-x-2 hover:translate-x-1 active:translate-y-2 hover:translate-y-1 hover:shadow-none`}
              onClick={() => {
                const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
                if (canvas) {
                  const url = canvas.toDataURL('image/png');
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'qrcode.png';
                  a.click();
                }
              }}
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </main>
  );
}