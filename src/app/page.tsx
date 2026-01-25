'use client';

import { useState } from 'react';
import Header from '../components/section/Header';
import Footer from '../components/section/Footer';
import dynamic from 'next/dynamic';

const QRGenerate = dynamic(() => import('../components/section/QRGenerate'), {
  ssr: false,
});
const About = dynamic(() => import('../components/section/About'), { ssr: false });
const FAQ = dynamic(() => import('../components/section/FAQ'), { ssr: false });

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
      <QRGenerate dark={dark} />
      <About dark={dark} />
      <FAQ dark={dark} />
      <Footer dark={dark} />
    </main>
  );
}