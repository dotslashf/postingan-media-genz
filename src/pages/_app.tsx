import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { Bebas_Neue, Heebo } from "next/font/google";

export const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

export const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${bebas.variable} ${heebo.variable}`}>
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
}
