import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "../../blog-data";
import { PostExperience } from "./post-experience";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | HENRY Blog`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.coverImage] },
    twitter: { title: post.title, description: post.excerpt, images: [post.coverImage] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return <PostExperience post={post} />;
}
