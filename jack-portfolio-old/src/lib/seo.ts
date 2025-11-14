import type { Metadata } from 'next'
import type { SanityProject, SanityBlogPost, SanitySiteSettings } from './sanity'

export interface SEOData {
  title: string
  description: string
  url: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
}

// Base URL for the site (you might want to make this configurable)
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jack-luo.com'

/**
 * Generates comprehensive metadata for Next.js pages
 */
export function generateMetadata(seoData: SEOData): Metadata {
  const {
    title,
    description,
    url,
    image,
    type = 'website',
    author,
    publishedTime,
    modifiedTime,
    tags
  } = seoData

  const fullUrl = `${BASE_URL}${url}`
  const siteName = 'Jack Luo Portfolio'

  return {
    title,
    description,
    keywords: tags?.join(', '),
    authors: author ? [{ name: author }] : undefined,
    creator: 'Jack Luo',
    publisher: 'Jack Luo',
    
    // Open Graph
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName,
      type,
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : undefined,
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      tags,
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
      creator: '@thejackluo',
      site: '@thejackluo',
    },
    
    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Canonical URL
    alternates: {
      canonical: fullUrl,
    },
    
    // Other metadata
    category: type === 'article' ? 'Technology' : undefined,
  }
}

/**
 * Generates SEO data for the homepage
 */
export function generateHomepageSEO(siteSettings?: SanitySiteSettings | null): SEOData {
  return {
    title: siteSettings?.siteTitle || 'Jack Luo - Full-Stack Developer & AI Engineer',
    description: siteSettings?.siteDescription || 'Passionate developer building the future of AI and automation. Explore my projects, journey, and insights in computer science and mathematics.',
    url: '/',
    image: '/assets/images/jack/main.jpg', // Add OG image
    type: 'profile',
    author: 'Jack Luo',
    tags: ['Jack Luo', 'Full-Stack Developer', 'AI Engineer', 'Computer Science', 'Mathematics', 'MIT']
  }
}

/**
 * Generates SEO data for blog posts
 */
export function generateBlogSEO(post: SanityBlogPost): SEOData {
  const imageUrl = post.coverImage ? 
    `${BASE_URL}/api/sanity/image/${post.coverImage.asset._ref}` : 
    '/assets/images/og-default.jpg'

  return {
    title: `${post.title} | Jack Luo`,
    description: post.excerpt || `Read ${post.title} by Jack Luo - insights on technology, AI, and development.`,
    url: `/blogs/${post.slug.current}`,
    image: imageUrl,
    type: 'article',
    author: 'Jack Luo',
    publishedTime: post.publishedAt,
    modifiedTime: post._updatedAt,
    tags: post.tags || []
  }
}

/**
 * Generates SEO data for project pages
 */
export function generateProjectSEO(project: SanityProject): SEOData {
  const imageUrl = project.image ? 
    `${BASE_URL}/api/sanity/image/${project.image.asset._ref}` : 
    '/assets/images/og-default.jpg'

  return {
    title: `${project.title} | Jack Luo Projects`,
    description: project.description || `Explore ${project.title} - one of Jack Luo's innovative projects showcasing cutting-edge technology.`,
    url: `/projects/${project.slug.current}`,
    image: imageUrl,
    type: 'website',
    author: 'Jack Luo',
    tags: project.technologies || []
  }
}

/**
 * Generates structured data (JSON-LD) for the homepage
 */
export function generateHomepageStructuredData(siteSettings?: SanitySiteSettings | null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jack Luo',
    jobTitle: 'Full-Stack Developer & AI Engineer',
    description: siteSettings?.author?.bio || 'Passionate developer building the future of AI and automation.',
    url: BASE_URL,
    image: `${BASE_URL}/assets/images/jack/main.jpg`,
    sameAs: [
      siteSettings?.socialLinks?.github || 'https://github.com/thejackluo',
      siteSettings?.socialLinks?.linkedin || 'https://linkedin.com/in/thejackluo',
      siteSettings?.socialLinks?.twitter || 'https://twitter.com/thejackluo'
    ].filter(Boolean),
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Massachusetts Institute of Technology',
      url: 'https://mit.edu'
    },
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Python',
      'Artificial Intelligence',
      'Machine Learning',
      'Computer Science',
      'Mathematics'
    ],
    email: siteSettings?.contact?.email || 'jack@hexahacks.com',
    telephone: siteSettings?.contact?.phone,
    address: siteSettings?.contact?.address ? {
      '@type': 'PostalAddress',
      addressLocality: siteSettings.contact.address
    } : undefined
  }
}

/**
 * Generates structured data for blog posts
 */
export function generateBlogStructuredData(post: SanityBlogPost) {
  const imageUrl = post.coverImage ? 
    `${BASE_URL}/api/sanity/image/${post.coverImage.asset._ref}` : 
    `${BASE_URL}/assets/images/og-default.jpg`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    author: {
      '@type': 'Person',
      name: 'Jack Luo',
      url: BASE_URL
    },
    publisher: {
      '@type': 'Person',
      name: 'Jack Luo',
      url: BASE_URL
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blogs/${post.slug.current}`
    },
    keywords: post.tags?.join(', '),
    articleSection: 'Technology',
    inLanguage: 'en-US'
  }
}

/**
 * Generates structured data for projects
 */
export function generateProjectStructuredData(project: SanityProject) {
  const imageUrl = project.image ? 
    `${BASE_URL}/api/sanity/image/${project.image.asset._ref}` : 
    `${BASE_URL}/assets/images/og-default.jpg`

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: imageUrl,
    url: project.liveUrl || `${BASE_URL}/projects/${project.slug.current}`,
    creator: {
      '@type': 'Person',
      name: 'Jack Luo',
      url: BASE_URL
    },
    dateCreated: project.startDate,
    dateModified: project.endDate,
    keywords: project.technologies?.join(', '),
    genre: project.category,
    codeRepository: project.githubUrl
  }
}

/**
 * Generates website structured data
 */
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Jack Luo Portfolio',
    description: 'Personal portfolio of Jack Luo - Full-Stack Developer & AI Engineer',
    url: BASE_URL,
    author: {
      '@type': 'Person',
      name: 'Jack Luo',
      url: BASE_URL
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Person',
      name: 'Jack Luo'
    }
  }
} 