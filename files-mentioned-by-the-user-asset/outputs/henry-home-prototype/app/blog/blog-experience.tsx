"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { blogCategories, blogPosts, type BlogCategoryKey } from "../blog-data";
import { SiteFooter } from "../components/site-footer";
import { SiteNavigation } from "../components/site-navigation";
import styles from "./blog.module.css";

type FilterKey = "wszystkie" | BlogCategoryKey;

const dateFormatter = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" });

const easing = [0.22, 1, 0.36, 1] as const;

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
};

export function BlogExperience() {
  const categoryKeys = Object.keys(blogCategories) as BlogCategoryKey[];
  const [selected, setSelected] = useState<FilterKey>("wszystkie");

  const visiblePosts = useMemo(
    () => (selected === "wszystkie" ? blogPosts : blogPosts.filter((post) => post.category === selected)),
    [selected],
  );

  return (
    <main className={styles.page}>
      <SiteNavigation />

      <motion.section
        className={styles.intro}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easing }}
      >
        <p>Rzemiosło, materiały, wnętrza</p>
        <h1>Blog</h1>
        <p className={styles.introText}>
          Historie z pracowni HENRY, przewodniki po materiałach i inspiracje wnętrzarskie — od pojedynczego
          fotela po całą salę kinową.
        </p>
      </motion.section>

      <div className={styles.filters}>
        <button
          type="button"
          className={styles.filterItem}
          data-active={selected === "wszystkie"}
          onClick={() => setSelected("wszystkie")}
        >
          Wszystkie
        </button>
        {categoryKeys.map((key) => (
          <button
            key={key}
            type="button"
            className={styles.filterItem}
            data-active={selected === key}
            onClick={() => setSelected(key)}
          >
            {blogCategories[key]}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={selected} className={styles.grid} variants={gridVariants} initial="hidden" animate="show">
          {visiblePosts.map((post) => (
            <motion.div key={post.slug} variants={cardVariants}>
              <Link href={`/blog/${post.slug}`} className={styles.card}>
                <div className={styles.cardImage}>
                  <img src={post.coverImage} alt="" loading="lazy" />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardMeta}>
                    {blogCategories[post.category]} · {dateFormatter.format(new Date(post.date))}
                  </span>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <span className={styles.cardLink} aria-hidden="true">
                    Czytaj →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}

          {visiblePosts.length === 0 && <p className={styles.empty}>Brak wpisów w tej kategorii.</p>}
        </motion.div>
      </AnimatePresence>

      <SiteFooter />
    </main>
  );
}
