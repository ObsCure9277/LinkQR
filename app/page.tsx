'use client';

import { useState } from 'react';
import Header from '../components/Header';
import LinkQR from '../components/LinkQR';

export default function Home() {
  const [dark, setDark] = useState(false);
  return (
    <main style={{ minHeight: '100vh' , background: dark ? '#fff' : '#000' }}>
      <Header dark={dark} setDark={setDark} />
      <LinkQR dark={dark} setDark={setDark} />
    </main>
  );
}