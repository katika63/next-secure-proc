'use client'

import { useEffect } from 'react'
import { initVanta } from '../../lib/vanta'
import { getAuthor } from '../../lib/authors'

export default function BlogHero({ 
  title, 
  category, 
  date, 
  authorSlug, 
  excerpt, 
  image 
}: {
  title: string;
  category: string;
  date: string;
  authorSlug: string;
  excerpt: string;
  image: string;
}) {
  useEffect(() => {
    initVanta()
  }, [])

  const author = getAuthor(authorSlug)

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div id="vanta-bg" className="absolute inset-0 z-0"></div>
      <div className="content-wrapper min-h-screen">
        <div className="relative z-10 text-center pt-32 pb-20">
          <div className="inline-block bg-blue-900 bg-opacity-50 text-blue-300 px-4 py-2 rounded-full text-sm mb-4">
            {category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl text-blue-200 mb-4 max-w-3xl mx-auto">
            {excerpt}
          </p>
          <div className="flex items-center justify-center space-x-4 text-gray-400">
            <span>{date}</span>
            <span>•</span>
            <span>3 mins read</span>
            <span>•</span>
            <span>By <a href="#" className="text-blue-400">{author.name}</a></span>
          </div>
        </div>
      </div>
    </section>
  )
}