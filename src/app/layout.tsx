import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Transcription APP',
  description: 'App for audio transcriptions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} inset-0 min-h-screen h-full w-full mx-auto [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]`}>
          {children}   
      </body>
    </html>
  );
}
