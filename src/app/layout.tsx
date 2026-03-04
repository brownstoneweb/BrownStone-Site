import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import ExitIntentDynamic from "@/components/ExitIntentDynamic";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { createClient } from "@/lib/supabase/server";
import { getUserRoles, isAdmin } from "@/lib/supabase/auth";
import { headers } from "next/headers";
import Link from "next/link";

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
  const h = await headers();
  const pathname = h.get("x-pathname") || "";
  const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const roles = user ? await getUserRoles() : [];
  const adminBypass = isAdmin(roles);

  const { data: settings } = await supabase
    .from("site_settings")
    .select("emergency_lock_enabled, emergency_lock_message")
    .eq("id", 1)
    .maybeSingle();

  const emergencyLockEnabled = settings?.emergency_lock_enabled === true;
  const lockMessage =
    (typeof settings?.emergency_lock_message === "string" && settings.emergency_lock_message.trim()) ||
    "Access to this site is currently restricted. Please check back later.";

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

  const heroImageUrl = "https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/lakehouse-wide.webp";

  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <head>
        <link rel="preload" as="image" href={heroImageUrl} />
        <link rel="alternate" type="text/plain" href={`${baseUrl}/llms.txt`} title="llms.txt" />
      </head>
      <body className="min-h-screen bg-white text-dark-brown antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {emergencyLockEnabled && !adminBypass && !isAdminPath ? (
          <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-[#0b0b0b] text-white">
            <div className="max-w-2xl w-full text-center">
              <p className="text-primary font-bold uppercase tracking-[0.25em] text-xs mb-4">
              Access Restricted
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-serif mb-6">
              Payment Required by Client (Brownstone)
              </h1>
              <p className="text-white/80 leading-relaxed text-base sm:text-lg mb-10">
                {lockMessage}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="bg-primary text-white px-8 py-3.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-widest hover:opacity-90 transition-all"
                >
                  Contact
                </Link>
                <Link
                  href="/admin/login"
                  className="border border-white/20 text-white px-8 py-3.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </main>
        ) : (
          <>
            {emergencyLockEnabled && adminBypass && (
              <div className="bg-red-50 text-red-800 border-b border-red-200 px-4 py-2 text-sm">
                Access restricted. Visitors are blocked. Manage it in{" "}
                <Link href="/admin/security" className="underline font-medium hover:no-underline">
                  Admin → Security
                </Link>
                .
              </div>
            )}
            {children}
          </>
        )}
        <GoogleAnalytics />
        <ExitIntentDynamic />
      </body>
    </html>
  );
}
