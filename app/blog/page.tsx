import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BlogCard from "@/components/BlogCard";
import { BLOG, SITE } from "@/content";

export const metadata: Metadata = {
  title: `Blog · Salud y bienestar animal | ${SITE.name}`,
  description:
    "Consejos de salud para mascotas, vacunación, esterilización y cuidados preventivos: tips para llegar mejor preparado a tu cita y cuidar a tu mascota en casa.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <main className="relative">
      <Nav />

      <section className="bg-paper px-4 pb-6 pt-14 sm:px-6 sm:pb-8 sm:pt-16 lg:pt-20">
        <div className="mx-auto max-w-[1240px] text-center">
          <p className="gold-rule mx-auto flex items-center justify-center gap-3 font-body text-[11px] font-semibold uppercase tracking-label text-gold-deep">
            {BLOG.eyebrow}
          </p>
          <h1 className="mx-auto mt-4 max-w-[760px] font-display text-[clamp(28px,5vw,52px)] font-semibold leading-[1.1] text-ink">
            {BLOG.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] font-body text-[15px] leading-[1.7] text-muted sm:text-[16px]">
            {BLOG.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-paper px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:pb-28">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
          {BLOG.posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} delay={(i % 3) * 60} />
          ))}
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
