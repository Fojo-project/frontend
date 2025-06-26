import { Outfit, Cormorant_Garamond, Open_Sans } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Providers from '@/lib/Providers';
import { GoogleOAuthProvider } from "@react-oauth/google";
import './globals.css';
import config from '@/config';


const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable} ${openSans.variable}`}>
      <body className="font-outfit dark:bg-gray-900">
        <GoogleOAuthProvider clientId={config.googleClientId ?? ''}>
          <Providers>
            <ThemeProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </ThemeProvider>
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
