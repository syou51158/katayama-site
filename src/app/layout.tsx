import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { defaultMetadata, generateBusinessStructuredData } from "@/lib/seo";
import { AccessibilityProvider, SkipToContent, AccessibilityControls } from "@/components/accessibility/AccessibilityProvider";
import { reportWebVitals } from "@/lib/performance";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = defaultMetadata;

// Web Vitals reporting
export { reportWebVitals } from "@/lib/performance";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = generateBusinessStructuredData();

  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${notoSans.variable} ${notoSerif.variable} font-sans antialiased`}
      >
        <AccessibilityProvider />
        <SkipToContent />
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <AccessibilityControls />
      </body>
    </html>
  );
}
