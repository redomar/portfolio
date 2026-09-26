import type { Metadata } from "next";
import { Bebas_Neue, Geist, Geist_Mono, Anton, Archivo_Black, Permanent_Marker } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-permanent-marker",
});

export const metadata: Metadata = {
  title: "Mohamed Omar - Software Engineer & Cloud Engineer",
  description: "Portfolio of Mohamed Omar - Senior Cloud Engineer specializing in React, TypeScript, Kubernetes, and AWS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${anton.variable} ${archivoBlack.variable} ${permanentMarker.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
