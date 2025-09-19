import { Cinzel } from "next/font/google";
import { CartProvider } from "./context/CartContext";
import "./globals.css";
import { he } from "zod/v4/locales";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Souvenir Shop",
  description: "Online store with souvenirs",
  openGraph: {
    title: "Souvenir Shop",
    description: "Discover unique Ukrainian souvenirs and gifts.",
    url: "https://souvenir-shop-phi.vercel.app",
    siteName: "Souvenir Shop",
    images: [
      {
        url: "/og/cover.png",
        width: 1200,
        height: 630,
        alt: "Souvenir Shop Preview",
      },
    ],
    locale: "en_Us",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Souvenir Shop",
    description: "Discover unique Ukrainian souvenirs and gifts.",
    images: ["/og-cover.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cinzel.className}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
