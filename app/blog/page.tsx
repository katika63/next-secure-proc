import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/client'
import { SanityPostCard } from '@/types/sanity'
import NewsletterForm from '@/app/components/ui/NewsletterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cybersecurity Blog | BTM Security',
  description: 'Stay informed with the latest cybersecurity trends, threat analysis, and expert insights from our security professionals.',
}

// Revalidate every 60 seconds — new Sanity posts appear automatically
export const revalidate = 60

export default async function BlogPage() {
  // Fetch live from Sanity Content Lake
  const blogPosts: SanityPostCard[] = await getAllPosts()

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-transparent text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block text-xs font-bold tracking-widest text-blue-400 uppercase font-mono bg-blue-950/40 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
            CYBERSECURITY JOURNAL
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Cybersecurity{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400">
              Insights
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Stay informed with the latest cybersecurity trends, threat analysis, and expert insights
            from our security professionals.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-6 bg-transparent">
        <div className="max-w-7xl mx-auto">
          {blogPosts.length === 0 ? (
            // Empty state — shown until first post is published in Sanity
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-full bg-blue-950/60 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">No posts yet</h2>
              <p className="text-slate-400 text-sm">
                Publish your first post in Sanity Studio to see it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article
                  key={post.slug}
                  className="bg-[#070e1e]/80 border border-[#1e2942] rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col justify-between group"
                  style={{
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  <div>
                    {/* Cover Image */}
                    <div className="relative h-48 overflow-hidden">
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage).width(600).height(300).url()}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-950 to-[#030712] flex items-center justify-center">
                          <svg className="w-10 h-10 text-blue-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                      )}
                      {post.category && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-blue-600/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        {post.publishedAt && (
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                        )}
                        {post.readTime && (
                          <>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </>
                        )}
                      </div>

                      <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>

                      {post.excerpt && (
                        <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Read More link */}
                  <div className="p-6 pt-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-cyan-300 font-mono tracking-wide transition-colors"
                    >
                      Read Article
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[#070e1e]/90 border border-[#1e2942] rounded-2xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Stay Updated with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Security Insights
              </span>
            </h2>
            <p className="text-slate-300 text-sm mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter for the latest cybersecurity trends, threat intelligence,
              and expert analysis delivered directly to your inbox.
            </p>
            <NewsletterForm />
            <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
              By subscribing, you agree to receive our cybersecurity newsletter. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}