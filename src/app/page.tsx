import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Founder } from "@/components/Founder";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { StackStrip } from "@/components/StackStrip";
import { Work } from "@/components/Work";
import { founder, services } from "@/content/home";
import { absoluteUrl, site } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/icon.svg"),
  email: site.email,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: "PK",
  },
  founder: {
    "@type": "Person",
    name: founder.name,
    url: founder.portfolio,
  },
  knowsAbout: services.map((s) => s.title),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero />
      <StackStrip />
      <main className="sections">
        <Services />
        <Work />
        <Process />
        <Founder />
      </main>
      <Contact />
      <Footer />
    </>
  );
}
