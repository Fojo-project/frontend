import { Outfit, Cormorant_Garamond, Open_Sans } from 'next/font/google';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Providers from '@/lib/Providers';
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from '@/config';
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadingIndicatorProperties } from '@/utils/constant';
import './globals.css';


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
      <head>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='robots' content='max-image-preview:large, NOODP, NOYDIR' />
        <link rel='icon' href='/favicon/favicon.ico' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
        <link rel='apple-touch-icon' type='image/png' href='/favicon/apple-touch-icon.png' />
        <link rel='apple-touch-icon' type='image/png' sizes='192x192' href='/favicon/android-chrome-192x192.png' />
        <link rel='apple-touch-icon' type='image/png' sizes='512x512' href='/favicon/android-chrome-512x512.png' />
      </head>
      <body className="font-outfit dark:bg-gray-900">
        <NextTopLoader {...loadingIndicatorProperties} />
        {/* <GoogleOAuthProvider clientId={config.googleClientId ?? ''}> */}
        <GoogleOAuthProvider clientId="850457110173-4usmam6qqau4slkl3rhvdrkbvptsmpqq.apps.googleusercontent.com">
          <Providers>
            <ThemeProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </ThemeProvider>
          </Providers>
          <ToastContainer />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
