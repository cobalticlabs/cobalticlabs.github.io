import Link from "next/link";
import type { Metadata } from "next";
import { ElementTile } from "@/components/ElementTile";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="wrap missing">
        <ElementTile symbol="Nf" number={404} className="missing__tile" />
        <p className="mono">Element not found</p>
        <h1>This page doesn&apos;t exist.</h1>
        <p className="missing__body">
          The link may be old, or the address has a typo.
        </p>
        <Link className="btn btn--primary" href="/">
          Back to the home page
        </Link>
      </main>
      <Footer />
    </>
  );
}
