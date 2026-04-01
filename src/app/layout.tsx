import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import ExitIntentDynamic from "@/components/ExitIntentDynamic";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import Script from "next/script";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "https://brownstoneltd.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Brownstone Construction Firm Ltd | Luxury Construction in Accra",
    template: "%s | Brownstone Construction Firm Ltd",
  },
  description:
    "Brownstone Construction Firm Ltd delivers luxury construction and sustainable real estate development in Accra, Ghana. Explore our projects and build Africa's future, brick by brick.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    url: baseUrl,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Brownstone Construction Limited",
    url: baseUrl,
    logo: `${baseUrl}/BrownStoneW.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1 Airport Square",
      addressLocality: "Accra",
      addressCountry: "GH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+233-24-402-8485",
      email: "info@brownstoneltd.com",
      contactType: "customer service",
    },
    sameAs: [
      "https://x.com/brownstneltdgh",
      "https://facebook.com/brownstonelimited",
      "https://instagram.com/brownstone.ltd",
      "https://www.linkedin.com/company/brownstone-construction-firm/",
      "https://www.youtube.com/@brownstoneltd",
    ],
  };

  const heroImageUrl =
    "https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/lakehouse-wide.webp";

  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <head>
        <link rel="preload" as="image" href={heroImageUrl} />
        <link
          rel="alternate"
          type="text/plain"
          href={`${baseUrl}/llms.txt`}
          title="llms.txt"
        />

        {/* GOOGLE TAG MANAGER */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=GTM-M3JQFZPZ'+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M3JQFZPZ');
          `}
        </Script>
        {/* END GTM */}

        {/* GOOGLE ADS GLOBAL TAG */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17981782657"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17981782657');
          `}
        </Script>
        {/* END GOOGLE ADS TAG */}
      </head>

      <body className="min-h-screen bg-white text-dark-brown antialiased">
        {/* GTM NOSCRIPT */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3JQFZPZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />

        {children}

        <GoogleAnalytics />
        <ExitIntentDynamic />
      </body>
    </html>
  );
}