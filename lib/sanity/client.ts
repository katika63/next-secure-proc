import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImage, SanityPost, SanityPostCard } from '@/types/sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8zacid9g',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

// ─── GROQ Queries ───────────────────────────────────────────────────────────

/**
 * Fetch all posts for the /blog index page (card view)
 * Ordered by most recent first
 */
export async function getAllPosts(): Promise<SanityPostCard[]> {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      category,
      excerpt,
      imageUrl,
      mainImage,
      publishedAt,
      readTime
    }
  `)
}

/**
 * Fetch a single post by slug for /blog/[slug]
 * Includes full body (Portable Text) and author reference
 */
export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      category,
      excerpt,
      imageUrl,
      mainImage,
      publishedAt,
      readTime,
      body,
      author-> {
        name,
        title,
        bio,
        photoUrl,
        photo
      }
    }
  `, { slug })
}

/**
 * Fetch all slugs — used by generateStaticParams() to pre-render all posts
 */
export async function getAllSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`
    *[_type == "post"] {
      "slug": slug.current
    }
  `)
}
