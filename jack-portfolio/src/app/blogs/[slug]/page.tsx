import React from 'react'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { BlogLayout } from '@/components/BlogLayout'
import { getBlogPost, getSiteSettings, urlFor, type SanityBlogPost } from '@/lib/sanity'
import Image from 'next/image'

// Custom components for PortableText rendering
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlFor(value).width(800).height(400).url()}
          alt={value.alt || ''}
          width={800}
          height={400}
          className="rounded-lg w-full h-auto"
        />
        {value.caption && (
          <p className="text-center text-white/60 text-sm mt-2 italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
    code: ({ value }: any) => (
      <pre className="bg-black/20 rounded-lg p-4 my-6 overflow-x-auto">
        <code className="text-green-400 text-sm font-mono">
          {value.code}
        </code>
      </pre>
    ),
  },
  block: {
    normal: ({ children }: any) => (
      <p className="mb-4 text-white/90 leading-relaxed">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-white mt-8 mb-4 font-stellar">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-white mt-6 mb-3 font-stellar">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-white mt-6 mb-3 font-stellar">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold text-white mt-4 mb-2 font-stellar">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-white/30 pl-6 my-6 italic text-white/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-white/90">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-white/90">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-black/20 px-2 py-1 rounded text-green-400 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline transition-colors"
      >
        {children}
      </a>
    ),
  },
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Fetch the blog post and site settings
  const [blogPost, siteSettings] = await Promise.all([
    getBlogPost(params.slug),
    getSiteSettings().catch(() => null)
  ])

  // If blog post not found, show 404
  if (!blogPost) {
    notFound()
  }

  // Format the published date
  const publishedDate = new Date(blogPost.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <BlogLayout
      title={blogPost.title}
      author={siteSettings?.author?.name || 'Jack Luo'}
      readTime={`${blogPost.readingTime} minute read`}
      publishDate={publishedDate}
      siteSettings={siteSettings}
      coverImage={blogPost.coverImage ? urlFor(blogPost.coverImage).width(1200).height(600).url() : undefined}
      tags={blogPost.tags}
    >
      <div className="text-white space-y-6 max-w-4xl mx-auto">
        {/* Excerpt */}
        {blogPost.excerpt && (
          <div className="text-xl text-white/80 italic border-l-4 border-white/30 pl-6 mb-8">
            {blogPost.excerpt}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <PortableText 
            value={blogPost.content} 
            components={portableTextComponents}
          />
        </div>
      </div>
    </BlogLayout>
  )
}

// Generate static params for all blog posts (for static generation)
export async function generateStaticParams() {
  try {
    const blogPosts = await getBlogPost('').catch(() => [])
    
    // If we get a single post (which means slug was found), return empty array
    // If we get an array or null, we need to fetch all posts
    const allBlogPosts = Array.isArray(blogPosts) ? blogPosts : []
    
    return allBlogPosts.map((post: SanityBlogPost) => ({
      slug: post.slug.current,
    }))
  } catch (error) {
    console.log('Error generating static params for blog posts:', error)
    return []
  }
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const blogPost = await getBlogPost(params.slug)
    
    if (!blogPost) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
      }
    }

    const ogImage = blogPost.coverImage 
      ? urlFor(blogPost.coverImage).width(1200).height(630).url()
      : '/assets/images/jack/main.jpg'

    return {
      title: `${blogPost.title} | Jack Luo`,
      description: blogPost.excerpt,
      keywords: blogPost.tags,
      openGraph: {
        title: blogPost.title,
        description: blogPost.excerpt,
        type: 'article',
        publishedTime: blogPost.publishedAt,
        authors: ['Jack Luo'],
        tags: blogPost.tags,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: blogPost.title,
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: blogPost.title,
        description: blogPost.excerpt,
        images: [ogImage],
      },
    }
  } catch (error) {
    console.log('Error generating metadata for blog post:', error)
    return {
      title: 'Jack Luo - Blog',
      description: 'Personal blog by Jack Luo',
    }
  }
} 