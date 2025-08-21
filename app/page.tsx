'use client';

import { useState } from 'react';
import Header from '../components/Header';
import LinkQR from '../components/LinkQR';
import Footer from '@/components/Footer';

export default function Home() {
  const [dark, setDark] = useState(false);
  return (
    <main
      style={{
        minHeight: '100vh',
        background: dark ? '#fff' : '#000',
        position: 'relative',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
          backgroundImage:
            dark
              ? `repeating-linear-gradient(0deg, #e0e0e0 0px, #e0e0e0 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, #e0e0e0 0px, #e0e0e0 1px, transparent 1px, transparent 64px)`
              : `repeating-linear-gradient(0deg, #222 0px, #222 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, #222 0px, #222 1px, transparent 1px, transparent 64px)`,
        }}
      />
      <Header dark={dark} setDark={setDark} />
      <LinkQR dark={dark} />
      <Footer dark={dark} />
    </main>
  );
}