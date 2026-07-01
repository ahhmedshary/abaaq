import { CartProvider } from "@/lib/cart";
import "./globals.css";

export const metadata = {
  title: "عبق الشرق — بخور وعود فاخر",
  description: "متجر عبق الشرق للبخور والعود الفاخر",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
