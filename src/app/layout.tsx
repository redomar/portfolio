import type { Metadata } from "next";
import {
  Anton,
  Archivo_Black,
  Bebas_Neue,
  Geist,
  Geist_Mono,
  Permanent_Marker,
} from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { content } from "@/data/profile";

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

const { profile } = content;

export const metadata: Metadata = {
  metadataBase: new URL("https://redomar.co.uk"),
  title: {
    default: `${profile.name} · ${profile.headline}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.tagline,
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} · ${profile.headline}`,
    description: profile.tagline,
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: `${profile.name} · ${profile.headline}`,
    description: profile.tagline,
  },
};

// Runs before first paint so the saved (or default dark) theme is applied
// immediately instead of flashing light until ThemeProvider's effect runs.
// Keep the storage key and default in sync with <ThemeProvider> below.
const themeScript = `(function(){try{var t=localStorage.getItem("portfolio-theme")||"dark";if(t==="system"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.classList.add(t)}catch(e){document.documentElement.classList.add("dark")}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static inline theme script, no user input */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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
