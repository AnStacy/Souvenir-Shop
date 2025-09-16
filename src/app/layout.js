import { Cinzel } from "next/font/google";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Souvenir Shop",
  description: "Online store with souvenirs",
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
