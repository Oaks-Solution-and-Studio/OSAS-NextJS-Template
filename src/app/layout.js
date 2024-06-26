import { Inter } from "next/font/google";
import "./globals.css";
import "./assets/css/master.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Oaks Solutions and Studio NextJS Template"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />

        <link rel="manifest" href="/manifest.json" />

        <title>Oaks Solutions and Studio NextJS Template</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
