import "./globals.css";
import { Cormorant_Garamond } from 'next/font/google';

import Header from "@/components/header";

const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata = {
    title: "Entrelinhas",
    description: "Projeto de uma plataforma dedicada à valorização de autores e suas obras, oferecendo uma experiência interativa e educativa para os usuários.",
    icons: {
        icon: "/icons/icon.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html className={cormorantGaramond.className}>
            <body>
              <Header />
              {children}
              </body>
        </html>
    );
}
