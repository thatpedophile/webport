import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sylvrixs Inspired Portfolio',
  description: 'High-end video editing and creative assets portfolio built with Next.js, Tailwind, and MongoDB.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black text-zinc-100 selection:bg-purple-500 selection:text-white scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
