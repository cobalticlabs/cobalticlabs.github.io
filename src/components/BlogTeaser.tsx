import Link from "next/link";
import type { Route } from "next";
import { SectionHead } from "./SectionHead";
import { blogIntro } from "@/content/home";
import { posts } from "@/content/posts";
import { formatDate } from "@/lib/prose";

export function PostCard({ post }: { post: (typeof posts)[number] }) {
  return (
    <Link
      href={`/blog/${post.slug}/` as Route}
      className="post-card"
      data-cursor="Read"
      data-reveal=""
    >
      <p className="mono">
        {formatDate(post.date)} · {post.tags.join(" · ")}
      </p>
      <h3>{post.title}</h3>
      <p>{post.summary}</p>
      <span className="post-card__more">Read the note →</span>
    </Link>
  );
}

export function BlogTeaser() {
  if (posts.length === 0) return null;
  return (
    <section className="wrap" id="blog" aria-labelledby="blog-title">
      <SectionHead
        id="blog-title"
        kicker={blogIntro.kicker}
        title={blogIntro.title}
      >
        <Link href="/blog" className="head__link">
          All notes →
        </Link>
      </SectionHead>
      <div className="posts">
        {posts.slice(0, 2).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
