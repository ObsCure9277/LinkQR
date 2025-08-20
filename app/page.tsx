'use client';

import LinkQR from '../components/linkQR';
import DarkModeToggle from '../components/toggle';

export default function Home() {
  return (
    <main>
      <DarkModeToggle />
      <LinkQR />
    </main>
  );
}