import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/client-portal/'],
      },
    ],
    sitemap: 'https://www.btmsec.com/sitemap.xml',
    host: 'https://www.btmsec.com',
  }
}
