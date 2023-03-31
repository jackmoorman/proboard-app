import './globals.css';
import { Providers } from './providers';
import Header from './components/Header';

export const metadata = {
  title: 'proBoard',
  description: 'proBoard home page, welcome!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-200 flex flex-col items-center h-screen w-screen text-slate-800 relative">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
