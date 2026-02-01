import type { Metadata } from "next";
import { Dela_Gothic_One, Space_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const delaGothic = Dela_Gothic_One({
  weight: "400",
  variable: "--font-dela",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tabularis - Extract tables from PDF",
  description: "Extract tables automatically. Turn fixed documents into editable data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${delaGothic.variable} ${spaceMono.variable} bg-paper font-mono antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
