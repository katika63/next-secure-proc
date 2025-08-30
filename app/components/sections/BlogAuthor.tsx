import { getAuthor } from '../../lib/authors'

import Image from 'next/image'

export default function BlogAuthor({ authorSlug }: { authorSlug: string }) {
  const author = getAuthor(authorSlug)
  
  return (
    <section className="py-16 px-6 bg-gray-900">
      <div className="max-w-4xl mx-auto border-t border-gray-800 pt-12">
        <h3 className="text-2xl font-bold mb-6 text-white">About the Author</h3>
        <div className="flex items-start">
          <Image 
            src={author.image} 
            alt={author.name} 
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover mr-6"
          />
          <div>
            <h4 className="text-xl font-bold text-white">{author.name}</h4>
            <p className="text-gray-400 mb-3">{author.title}</p>
            <p className="text-gray-300">
              {author.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}