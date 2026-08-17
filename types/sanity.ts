export interface SanityAuthor {
  name: string
  title: string
  bio: string
  photoUrl?: string | null
  photo?: SanityImage | null
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
  }
}

export interface SanityPost {
  title: string
  slug: string
  category: string
  excerpt: string
  imageUrl?: string | null
  mainImage?: SanityImage | null
  publishedAt: string
  readTime: string
  body?: any[] // Portable Text blocks
  author?: SanityAuthor
}

export interface SanityPostCard {
  title: string
  slug: string
  category: string
  excerpt: string
  imageUrl?: string | null
  mainImage?: SanityImage | null
  publishedAt: string
  readTime: string
}
