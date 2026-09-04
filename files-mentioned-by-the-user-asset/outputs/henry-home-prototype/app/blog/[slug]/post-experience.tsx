"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { blogCategories, getAdjacentBlogPosts, type BlogPost } from "../../blog-data";
import { SiteFooter } from "../../components/site-footer";
import { SiteNavigation } from "../../components/site-navigation";
import styles from "./post.module.css";

const dateFormatter = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" });
const easing = [0.22, 1, 0.36, 1] as const;

export function PostExperience({ post }: { post: BlogPost }) {
  const { previous, next } = getAdjacentBlogPosts(post.slug);

  return (
    <main className={styles.page}>
      <SiteNavigation />

      <article>
        <motion.header
          className={styles.hero}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
        >
          <Link href="/blog" className={styles.back}>
            ← Blog
          </Link>
          <span className={styles.meta}>
            {blogCategories[post.category]} · {dateFormatter.format(new Date(post.date))} · {post.readingTime}
          </span>
          <h1>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>
        </motion.header>

        <motion.div
          className={styles.heroImage}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: easing, delay: 0.15 }}
        >
          <img src={post.coverImage} alt="" />
        </motion.div>

        <motion.div
          className={styles.body}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easing, delay: 0.35 }}
        >
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </motion.div>

        <nav className={styles.pager}>
          {previous ? (
            <Link href={`/blog/${previous.slug}`} className={styles.pagerItem} data-direction="prev">
              <span>← Poprzedni</span>
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/blog/${next.slug}`} className={styles.pagerItem} data-direction="next">
              <span>Następny →</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>

      <SiteFooter />
    </main>
  );
}
