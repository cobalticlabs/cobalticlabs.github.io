import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Prose } from "@/components/Prose";
import { SplitWords } from "@/components/SplitWords";
import { founder } from "@/content/home";
import { getPost, posts } from "@/content/posts";
import { absoluteUrl, site } from "@/content/site";
import { formatDate, readingMinutes } from "@/lib/prose";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = absoluteUrl(`/blog/${post.slug}/`);
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: site.name,
      title: post.title,
      description: post.summary,
      url,
      publishedTime: post.date,
      images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    url: absoluteUrl(`/blog/${post.slug}/`),
    author: { "@type": "Person", name: founder.name, url: founder.portfolio },
    publisher: { "@id": absoluteUrl("/#organization") },
  };

  return (
    <>
      <Header />
      <main className="wrap page article">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Link href="/blog" className="page__back">
          ← All notes
        </Link>
        <p className="mono">
          {formatDate(post.date)} · {readingMinutes(post.body)} min read ·{" "}
          {post.tags.join(" · ")}
        </p>
        <h1 data-split="">
          <SplitWords text={post.title} />
        </h1>
        <p className="page__lede">{post.summary}</p>
        <Prose source={post.body} />
        <aside className="article__cta">
          <p>Want help putting AI to work in your business?</p>
          <Link href="/#contact" className="btn btn--primary">
            Talk to us
          </Link>
        </aside>
      </main>
      <Footer />
    </>
  );
}
