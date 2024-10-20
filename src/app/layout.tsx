import '../styles/global.css';

export const metadata = {
  title: 'POS APPS',
  description: 'POS system built with Next.js and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

