import "./globals.css";
import { Cormorant_Garamond } from 'next/font/google';



const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata = {
    title: "Entrelinhas",
    description: "Projeto de uma plataforma dedicada à valorização de autores e suas obras, oferecendo uma experiência interativa e educativa para os usuários.",
};

export default function RootLayout({ children }) {
    return (
        <html className={cormorantGaramond.className}>
            <body>
          
              {children}
              </body>
        </html>
    );
}
