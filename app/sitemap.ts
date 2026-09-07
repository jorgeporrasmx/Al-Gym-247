import { MetadataRoute } from 'next'
import { guides } from '@/lib/guides'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.algym247.com'

  // Static pages
  const routes = [
    '',
    '/franquicias',
    '/blog',
    '/guias',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Add location-specific pages when created
  const locations = [
    '/ubicaciones/azcapotzalco',
    '/ubicaciones/polanco',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const guidePages = guides.map(({ slug }) => ({
    url: `${baseUrl}/guias/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...routes, ...locations, ...guidePages]
}
