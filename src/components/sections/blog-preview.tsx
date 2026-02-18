"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { fadeUp, SectionLabel } from "./shared";

export interface BlogPreviewProps {
  blog: {
    label: string;
    headline_before: string;
    headline_emphasis: string;
    posts: Array<{
      category: string;
      title: string;
      description: string;
      image: string;
      date: string;
    }>;
  };
}

export function BlogPreview({ blog }: BlogPreviewProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-16 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 max-w-2xl sm:mb-20">
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
            <SectionLabel>{blog.label}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
            className="font-serif text-[clamp(32px,4vw,51.2px)] leading-[1.1] tracking-tight text-stone-900"
          >
            {blog.headline_before}{" "}
            <em className="text-accent">{blog.headline_emphasis}</em>.
          </motion.h2>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blog.posts.map((post, i) => (
            <motion.article
              key={post.title}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              className="group rounded-2xl border border-stone-200/60 bg-white transition-all duration-500 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5"
            >
              {/* Mobile: horizontal layout */}
              <div className="flex sm:hidden">
                <div className="relative w-28 shrink-0 overflow-hidden rounded-l-2xl">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-4">
                  <span className="inline-block self-start rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                    {post.category}
                  </span>
                  <h3 className="mt-2 text-[15px] font-semibold leading-snug tracking-tight text-stone-900 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <a href="#" className="text-[12px] font-medium text-accent">
                      Lees meer &rarr;
                    </a>
                    <span className="text-[11px] text-stone-400">{post.date}</span>
                  </div>
                </div>
              </div>

              {/* Tablet+: vertical card layout */}
              <div className="hidden sm:block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 lg:p-8">
                  <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                    {post.category}
                  </span>
                  <h3 className="mt-4 text-[17px] font-semibold leading-snug tracking-tight text-stone-900">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-stone-500">
                    {post.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-[13px] font-medium text-accent transition-colors hover:text-accent-light"
                    >
                      Lees meer
                      <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                    </a>
                    <span className="text-[12px] text-stone-400">{post.date}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
