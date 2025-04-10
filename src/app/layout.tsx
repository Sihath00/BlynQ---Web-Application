import './globals.css';

export const metadata = {
  title: 'BlynQ Vehicle Management System',
  description: 'Generated by Next.js',
  icons: {
    icon: '/blynq.png',  
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}