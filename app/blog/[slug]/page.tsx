import { getPostBySlug, getAllSlugs, urlFor } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/lib/sanity/portable-text'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// ─── Static Params: pre-render all posts at build time ──────────────────────
export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((s) => ({ slug: s.slug }))
}

// ─── Dynamic Metadata per post ───────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found | BTM Security' }
  return {
    title: `${post.title} | BTM Security Blog`,
    description: post.excerpt,
  }
}

// ─── Page Component ──────────────────────────────────────────────────────────
export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return notFound()

  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <>
      {/* Back to Blog */}
      <div className="pt-10 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-cyan-300 font-mono transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <section className="py-10 px-6 bg-transparent">
        <div className="max-w-3xl mx-auto">
          <article className="bg-[#070e1e]/80 backdrop-blur-md rounded-2xl p-8 sm:p-10 border border-[#1e2942] shadow-2xl">

            {/* Header */}
            <header className="mb-10 text-center">
              <div className="inline-block bg-blue-950/60 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-xs font-semibold font-mono tracking-wider mb-5">
                {post.category}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-snug">
                {post.title}
              </h1>
              <p className="text-blue-200 text-base mb-5 leading-relaxed">{post.excerpt}</p>
              <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400 text-sm font-mono">
                {publishDate && <span>{publishDate}</span>}
                {post.readTime && (
                  <>
                    <span className="text-slate-600">•</span>
                    <span>{post.readTime}</span>
                  </>
                )}
                <>
                  <span className="text-slate-600">•</span>
                  <span>By <span className="text-blue-400">BTM Security</span></span>
                </>
              </div>
            </header>

            {/* Cover Image */}
            {(post.imageUrl || post.mainImage) && (
              <div className="relative h-56 sm:h-72 rounded-xl overflow-hidden mb-10 border border-[#1e2942]">
                <Image
                  src={post.imageUrl || (post.mainImage ? urlFor(post.mainImage).width(800).height(400).url() : '')}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Portable Text Body */}
            {post.body && (
              <div className="blog-content">
                <PortableText value={post.body} components={portableTextComponents} />
              </div>
            )}

          </article>
        </div>
      </section>
    </>
  )
}
