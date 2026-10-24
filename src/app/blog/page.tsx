import type { Metadata } from "next";
import { PostCard } from "@/components/BlogTeaser";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SplitWords } from "@/components/SplitWords";
import { blogIntro } from "@/content/home";
import { posts } from "@/content/posts";
import { absoluteUrl } from "@/content/site";

export const metadata: Metadata = {
  title: "Blog",
  description: blogIntro.lede,
  alternates: { canonical: absoluteUrl("/blog/") },
};

export default function Blog() {
  return (
    <>
      <Header />
      <main className="wrap page">
        <p className="mono">{blogIntro.kicker}</p>
        <h1 data-split="">
          <SplitWords text={blogIntro.title} />
        </h1>
        <p className="page__lede">{blogIntro.lede}</p>
        <div className="posts posts--page">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
