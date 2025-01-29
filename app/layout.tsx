import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'wahl.chat - Embed Example',
  description: 'Example implementation of wahl.chat on your website',
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
