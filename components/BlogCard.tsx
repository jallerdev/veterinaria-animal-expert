import { ArrowRight, Clock } from "lucide-react";
import type { Post } from "@/content";
import Reveal from "./Reveal";

export default function BlogCard({ post, delay }: { post: Post; delay?: number }) {
  return (
    <Reveal
      delay={delay}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      <a href={`/blog/${post.slug}`} className="flex h-full flex-col no-underline">
        {/* Banner bronce con la categoría */}
        <div className="flex h-36 items-end bg-[linear-gradient(135deg,#EAF7F7_0%,#CFEAEA_100%)] p-5">
          <span className="rounded-full bg-paper/70 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-label text-gold-deep">
            {post.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-3 font-body text-[12px] text-faint">
            <span>{post.dateLabel}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.readMin} min
            </span>
          </div>
          <h3 className="mt-2 font-display text-[20px] font-semibold leading-[1.25] text-ink">
            {post.title}
          </h3>
          <p className="mt-2 flex-1 font-body text-[14.5px] leading-[1.6] text-muted">
            {post.excerpt}
          </p>
          <span className="mt-4 flex items-center gap-1.5 font-body text-[13.5px] font-semibold text-gold-deep">
            Leer artículo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    </Reveal>
  );
}
