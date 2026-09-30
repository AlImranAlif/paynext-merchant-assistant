import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PayNext Merchant Assistant',
  description: 'Merchant payment and settlement dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
