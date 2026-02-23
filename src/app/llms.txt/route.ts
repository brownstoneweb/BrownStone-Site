import { NextResponse } from "next/server";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "https://brownstoneltd.com";

function getLlmsTxt(): string {
  return `# Brownstone Construction Limited

> Premium construction and real estate development in Accra, Ghana. We deliver luxury, sustainable construction and master-planned communities that build Africa's future.

## Contact

- **Address:** 1 Airport Square, Accra, Ghana
- **Phone:** +233 244 028 8485
- **Email:** ghanaisthefuture@brownstoneltd.com
- **Website:** ${baseUrl}

## Main Pages

- [Home](${baseUrl}/)
- [About Us](${baseUrl}/about) — Our story, values, and team
- [Services](${baseUrl}/services) — Residential, master-planned communities, sustainable infrastructure, real estate development, project management, mixed-use spaces
- [Portfolio](${baseUrl}/portfolio) — Our projects and developments
- [Celestia](${baseUrl}/celestia) — Luxury residential development in Accra
- [Blog](${baseUrl}/blog) — News and insights
- [Contact](${baseUrl}/contact) — Get in touch
- [Privacy Policy](${baseUrl}/privacy-policy)
- [Terms of Use](${baseUrl}/terms-of-use)

## Services

- **Residential Construction** — Design and build high-quality homes and developments for luxury and longevity
- **Master-Planned Communities** — Holistic neighbourhoods with schools, clinics, retail, and parks
- **Sustainable Infrastructure** — Solar, EV charging, water management, smart technologies
- **Real Estate Development** — Build-to-sell or build-to-rent projects with investor support
- **Project Management** — End-to-end planning, budgeting, and delivery
- **Mixed-Use Spaces** — Residential, commerce, and tourism in harmony

## What We Do Not Do

We do not offer small-scale renovations, DIY consulting, or projects outside our core focus on premium construction and real estate development in Ghana and West Africa.

## Key Information

- **Location:** Accra, Ghana
- **Focus:** Luxury construction, sustainable development, master-planned communities
- **Tagline:** Building Africa's Future, Brick by Brick

## AI Discovery Files

- [Sitemap](${baseUrl}/sitemap.xml)
- [Robots](${baseUrl}/robots.txt)
`;
}

export function GET() {
  const content = getLlmsTxt();
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, sitemap",
    },
  });
}
