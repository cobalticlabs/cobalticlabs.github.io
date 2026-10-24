import { AiDemo } from "@/components/AiDemo";
import { BlogTeaser } from "@/components/BlogTeaser";
import { CobaltStage } from "@/components/CobaltStage";
import { Contact } from "@/components/Contact";
import { Engagements } from "@/components/Engagements";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Founder } from "@/components/Founder";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PeriodicTable } from "@/components/PeriodicTable";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { StackStrip } from "@/components/StackStrip";
import { Testimonials } from "@/components/Testimonials";
import { Work } from "@/components/Work";
import { faqs, founder, services } from "@/content/home";
import { absoluteUrl, site } from "@/content/site";

const organization = {
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

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organization, faqPage]),
        }}
      />
      <CobaltStage />
      <Header />
      <Hero />
      <StackStrip />
      <main className="sections">
        <Services />
        <PeriodicTable />
        <AiDemo />
        <Work />
        <Process />
        <Engagements />
        <Testimonials />
        <Faq />
        <Founder />
        <BlogTeaser />
      </main>
      <Contact />
      <Footer />
    </>
  );
}
