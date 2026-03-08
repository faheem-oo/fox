import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Faheemudheen N — The Fox Developer",
  description:
    "Full Stack Developer portfolio — Building smart, efficient and scalable web applications.",
  keywords: [
    "Faheemudheen",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Portfolio",
  ],
  icons: {
    icon: "/faheemud.png",
    apple: "/faheemud.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${bebasNeue.variable} antialiased font-[family-name:var(--font-inter)]`}
      >
        {children}
      </body>
    </html>
  );
}
