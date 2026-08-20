import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, MessageCircle } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { BLOG, getPost, SITE } from "@/content";

export function generateStaticParams() {
  return BLOG.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Artículo no encontrado" };
  return {
    title: `${post.title} | ${SITE.name}`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="relative">
      <Nav />

      <article className="bg-paper px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:pb-28">
        <div className="mx-auto max-w-[720px]">
          <a
            href="/blog"
            className="inline-flex items-center gap-1.5 font-body text-[13.5px] font-semibold text-gold-deep no-underline hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al blog
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-body text-[12.5px] text-faint">
            <span className="rounded-full bg-gold-tint px-3 py-1 font-semibold uppercase tracking-label text-gold-deep">
              {post.category}
            </span>
            <span>{post.dateLabel}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readMin} min de lectura
            </span>
          </div>

          <h1 className="mt-4 font-display text-[clamp(28px,4.5vw,44px)] font-semibold leading-[1.15] text-ink">
            {post.title}
          </h1>

          <div className="mt-8 space-y-5">
            {post.content.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="pt-3 font-display text-[24px] font-semibold text-ink">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="space-y-2.5 pl-1">
                    {block.items.map((it) => (
                      <li key={it} className="flex gap-3 font-body text-[17px] leading-[1.7] text-ink-soft">
                        <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                        {it}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="font-body text-[17px] leading-[1.8] text-ink-soft">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-3xl border border-gold-soft/50 bg-gold-tint p-6 text-center sm:p-8">
            <h3 className="font-display text-[24px] font-semibold text-ink">
              ¿Listo para tu próxima cita?
            </h3>
            <p className="mx-auto mt-2 max-w-[420px] font-body text-[15px] text-muted">
              Agenda tu cita en {SITE.name} y cuida la salud de tu mascota. Te esperamos en{" "}
              {SITE.address.short}.
            </p>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-4 font-body text-[15px] font-semibold text-white no-underline shadow-gold transition-colors hover:bg-gold-deep"
            >
              <MessageCircle className="h-[18px] w-[18px]" /> Agenda por WhatsApp
            </a>
          </div>
        </div>
      </article>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
