import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/Cursor";
import { Intro, introScript } from "@/components/Intro";
import { Motion } from "@/components/Motion";
import { absoluteUrl, site } from "@/content/site";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

const ogImage = {
  url: absoluteUrl("/og.png"),
  width: 1200,
  height: 630,
  alt: `${site.name}: ${site.shortDescription}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.shortDescription,
    url: absoluteUrl("/"),
    locale: site.locale,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.shortDescription,
    images: [ogImage.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#06080f",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <Intro />
        <div className="backdrop" aria-hidden="true" />
        {children}
        <Motion />
        <Cursor />
      </body>
    </html>
  );
}
