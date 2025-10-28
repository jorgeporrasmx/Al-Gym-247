/**
 * Monday.com Blog Integration
 *
 * This module handles fetching blog posts from Monday.com board via GraphQL API.
 *
 * Monday.com Board Structure (expected columns):
 * - name: Blog post title (text)
 * - slug: URL-friendly slug (text)
 * - content: Post content in markdown/HTML (long text)
 * - excerpt: Short description (text)
 * - author: Author name (text)
 * - publish_date: Publication date (date)
 * - featured_image: Image URL (text/link)
 * - category: Post category (text/dropdown)
 * - status: Published/Draft (status column)
 * - seo_title: SEO title (text)
 * - seo_description: SEO description (text)
 */

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  publishDate: string
  featuredImage?: string
  category?: string
  status: 'published' | 'draft'
  seoTitle?: string
  seoDescription?: string
}

interface MondayColumnValue {
  id: string
  text?: string
  value?: string
}

interface MondayItem {
  id: string
  name: string
  column_values: MondayColumnValue[]
}

interface MondayResponse {
  data: {
    boards: Array<{
      items_page: {
        items: MondayItem[]
      }
    }>
  }
}

/**
 * Makes a GraphQL request to Monday.com API
 */
async function mondayQuery(query: string): Promise<any> {
  const apiToken = process.env.MONDAY_API_TOKEN

  if (!apiToken) {
    console.error('MONDAY_API_TOKEN is not configured')
    return null
  }

  try {
    const response = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiToken,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 } // Cache for 60 seconds
    })

    if (!response.ok) {
      console.error('Monday.com API error:', response.status, response.statusText)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching from Monday.com:', error)
    return null
  }
}

/**
 * Extracts column value from Monday.com item
 */
function getColumnValue(item: MondayItem, columnId: string): string {
  const column = item.column_values.find(col => col.id === columnId)
  return column?.text || column?.value || ''
}

/**
 * Transforms Monday.com item to BlogPost
 */
function transformToBlogPost(item: MondayItem): BlogPost {
  // Parse status value (Monday returns JSON string)
  let status: 'published' | 'draft' = 'draft'
  try {
    const statusValue = getColumnValue(item, 'status')
    const statusObj = statusValue ? JSON.parse(statusValue) : null
    status = statusObj?.label?.toLowerCase() === 'published' ? 'published' : 'draft'
  } catch (e) {
    // Default to draft if parsing fails
  }

  // Parse date value
  let publishDate = new Date().toISOString()
  try {
    const dateValue = getColumnValue(item, 'publish_date')
    if (dateValue) {
      const dateObj = JSON.parse(dateValue)
      publishDate = dateObj.date || publishDate
    }
  } catch (e) {
    // Use current date if parsing fails
  }

  return {
    id: item.id,
    title: item.name,
    slug: getColumnValue(item, 'slug') || item.name.toLowerCase().replace(/\s+/g, '-'),
    content: getColumnValue(item, 'content'),
    excerpt: getColumnValue(item, 'excerpt'),
    author: getColumnValue(item, 'author') || 'Algym247',
    publishDate,
    featuredImage: getColumnValue(item, 'featured_image'),
    category: getColumnValue(item, 'category'),
    status,
    seoTitle: getColumnValue(item, 'seo_title'),
    seoDescription: getColumnValue(item, 'seo_description'),
  }
}

/**
 * Fetches all published blog posts from Monday.com
 * @param limit Maximum number of posts to fetch (default: 50)
 * @returns Array of published blog posts, sorted by publish date (newest first)
 */
export async function getBlogPosts(limit = 50): Promise<BlogPost[]> {
  const boardId = process.env.MONDAY_BLOG_BOARD_ID

  if (!boardId) {
    console.error('MONDAY_BLOG_BOARD_ID is not configured')
    return []
  }

  const query = `
    query {
      boards(ids: [${boardId}]) {
        items_page(limit: ${limit}) {
          items {
            id
            name
            column_values {
              id
              text
              value
            }
          }
        }
      }
    }
  `

  const response: MondayResponse = await mondayQuery(query)

  if (!response?.data?.boards?.[0]?.items_page?.items) {
    return []
  }

  const posts = response.data.boards[0].items_page.items
    .map(transformToBlogPost)
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

  return posts
}

/**
 * Fetches a single blog post by slug
 * @param slug URL slug of the blog post
 * @returns Blog post or null if not found
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts()
  return posts.find(post => post.slug === slug) || null
}

/**
 * Fetches blog posts by category
 * @param category Category name
 * @param limit Maximum number of posts
 * @returns Array of published blog posts in the category
 */
export async function getBlogPostsByCategory(category: string, limit = 50): Promise<BlogPost[]> {
  const posts = await getBlogPosts(limit)
  return posts.filter(post => post.category?.toLowerCase() === category.toLowerCase())
}

/**
 * Fetches all unique categories from blog posts
 * @returns Array of category names
 */
export async function getBlogCategories(): Promise<string[]> {
  const posts = await getBlogPosts()
  const categories = new Set(posts.map(post => post.category).filter(Boolean) as string[])
  return Array.from(categories).sort()
}
