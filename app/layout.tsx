import type { Metadata } from "next";
import { Syne, Space_Grotesk, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "RFE Quest with Pennylane",
  description:
    "Maitrisez la reforme de la facturation electronique en jouant ! Un jeu d'apprentissage gamifie pour les experts-comptables et dirigeants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-neo-bg text-neo-black font-body antialiased">
        {children}
      </body>
    </html>
  );
}
