import { PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'

/**
 * Custom renderers for Sanity Portable Text blocks.
 * Matches the existing BTM Security dark cyber glassmorphic design.
 */
export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-gray-300 mb-6 leading-relaxed text-base">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-4">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <div className="border-l-4 border-blue-500 pl-4 my-8 bg-[#070e1e]/60 py-3 rounded-r-lg">
        <p className="italic text-gray-300">{children}</p>
      </div>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-slate-200">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-black/40 text-green-300 px-1.5 py-0.5 rounded font-mono text-sm">
        {children}
      </code>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 space-y-2 my-4 text-gray-300">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 space-y-2 my-4 text-gray-300">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  types: {
    image: ({ value }) => {
      const src = value?.url || (value?.asset?._ref ? urlFor(value).width(800).url() : null)
      if (!src) return null
      return (
        <figure className="my-8">
          <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden border border-[#1e2942]">
            <Image
              src={src}
              alt={value.caption || 'Article image'}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-slate-400 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    callout: ({ value }) => {
      const styles: Record<string, string> = {
        info: 'bg-blue-950/40 border-blue-500/40 text-blue-200',
        warning: 'bg-amber-950/40 border-amber-500/40 text-amber-200',
        danger: 'bg-red-950/40 border-red-500/40 text-red-200',
        success: 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200',
      }
      const icons: Record<string, string> = {
        info: '💡',
        warning: '⚠️',
        danger: '🚨',
        success: '✅',
      }
      const style = styles[value.type] || styles.info
      return (
        <div className={`border rounded-xl p-5 my-6 ${style}`}>
          <span className="mr-2">{icons[value.type] || '💡'}</span>
          {value.text}
        </div>
      )
    },
  },
}
