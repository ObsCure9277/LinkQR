'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';

// Provide a fallback while LinkQR is loading
const LinkQR = dynamic(() => import('../components/LinkQR'), {
  ssr: false,
  loading: () => <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading QR Generator...</div>,
});

export default function Home() {
  const [dark, setDark] = useState(false);

  return (
    <main
      >
      <Header dark={dark} setDark={setDark} />
      <LinkQR dark={dark} />
      <Footer dark={dark} />
    </main>
  );
}