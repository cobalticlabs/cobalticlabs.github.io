export const site = {
  name: "Cobaltic Labs",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL || "https://cobalticlabs.github.io"
  ).replace(/\/$/, ""),
  title: "Cobaltic Labs · Websites, mobile apps and AI automations",
  description:
    "Cobaltic Labs is a software studio in Lahore, Pakistan. We design and build websites, mobile apps and AI automations for startups and growing businesses.",
  shortDescription:
    "Websites, mobile apps and AI automations, built in Lahore.",
  email: "hello@cobalticlabs.com",
  callUrl: "https://cal.com/abdul-basit-jcbhuk/30min",
  city: "Lahore",
  country: "Pakistan",
  coordinates: "31.52° N, 74.36° E",
  locale: "en_US",
} as const;

export const element = {
  symbol: "Co",
  number: 27,
  mass: "58.933 u",
} as const;

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
] as const;

export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${clean}`;
}
