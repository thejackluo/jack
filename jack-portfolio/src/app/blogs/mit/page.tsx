import React from 'react'
import type { Metadata } from 'next'
import { BlogLayout } from '@/components/BlogLayout'
import { StructuredData } from '@/components/StructuredData'
import { getSiteSettings } from '@/lib/sanity'
import { 
  generateMetadata as generateSEOMetadata, 
  generateBlogSEO, 
  generateBlogStructuredData
} from '@/lib/seo'

// Mock blog post data (in a real implementation, this would come from Sanity)
const blogPost = {
  _id: 'mit-blog-post',
  _type: 'blogPost',
  _createdAt: '2023-03-14T00:00:00.000Z',
  _updatedAt: '2023-03-14T00:00:00.000Z',
  _rev: 'rev1',
  title: 'How to get a MIT education, outside of MIT?',
  slug: { _type: 'slug' as const, current: 'mit' },
  excerpt: 'Discover how you can form a world-class education wherever you go, even without attending a top-tier university. Learn strategies for self-education, building networks, and creating your own MIT-style learning experience.',
  content: [],
  publishedAt: '2023-03-14T00:00:00.000Z',
  tags: ['education', 'MIT', 'self-learning', 'college', 'personal-development'],
  featured: true,
  coverImage: {
    _type: 'image' as const,
    asset: {
      _ref: 'image-mit-blog',
      _type: 'reference' as const
    },
    alt: 'MIT education outside of MIT'
  },
  readingTime: 7
}

// Generate metadata for the blog post
export async function generateMetadata(): Promise<Metadata> {
  const seoData = generateBlogSEO(blogPost)
  return generateSEOMetadata(seoData)
}

export default async function MITBlogPage() {
  // Fetch Sanity data
  let siteSettings = null
  try {
    siteSettings = await getSiteSettings()
  } catch (error) {
    console.log('Sanity not configured yet:', error)
  }

  // Generate structured data for the blog post
  const blogStructuredData = generateBlogStructuredData(blogPost)

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={blogStructuredData} />
      
      <BlogLayout
        title="How to get a MIT education, outside of MIT?"
        author="Jack Luo"
        readTime="7 minute read"
        publishDate="Mar 2023"
        siteSettings={siteSettings}
      >
        <div className="text-white space-y-6 max-w-4xl mx-auto">
          <div>
            <p className="font-bold mb-4">Prologue</p>
            <p className="mb-4">
              03/14 (π day) is a big day for 45,000 people: it is the day when MIT decisions are coming out. 
              On this day, almost 43,000 of them are met with disappointment as they see the "We have regret 
              to inform you…" on their screens. The letter was short, a block of text that seemingly 
              "determine your future forever".
            </p>
            <p className="mb-4">
              On that day, shattered dreams and broken hearts were the only companions of the thousands who 
              dared to dream big, work hard, and hope for a better future, only to be crushed by a merciless 
              letter that reduced their worth to a mere number on a page and their efforts to a fleeting 
              memory of wasted youth.
            </p>
            <p className="mb-4">
              For many, college rejections are rejections that felt out of control for the first time: 
              something that could happen even if they are perfect. Some people get over this quickly, 
              while others take months, or even years.
            </p>
            <p className="mb-4">
              When I received these decisions letters. I felt lost, really lost. I was in a state of limbo, 
              doing things for the sake of doing things. I wasn't able to support my friends when I can, 
              nor am I able to enjoy the things I used to enjoy. The rejection felt worse than any rejection 
              I have received: it's like a fire slowly cooking me away. No matter how much water I poured, 
              the fire never subsided.
            </p>
            <p className="mb-4">
              But over time, I came to realize that college, and even a top-tier university like MIT, was 
              not the only path to success. I realized that there are ways you can form a world class 
              education wherever you go. In this blog, I will be exploring some ways you can reach your 
              goals, pave your path to the dream you want to reach.
            </p>
            <p className="mb-6">
              This blog is dedicated for those who may be feeling the sting of rejection, they too can find 
              solace in the fact that their future is not defined by any one institution, but rather by the 
              limitless potential within themselves.
            </p>
          </div>

          <div>
            <p className="font-bold mb-4">Part 1: Take a walk with me.</p>
            <p className="mb-4">
              I invite you to take a virtual walk with me. Take a second and imagine a place you want to be. 
              How about strolling through the park next door, basking in the freshness of the air? Or trekking 
              up the hill to observe the birds chirping while overseeing the city? Alternatively, we could 
              explore downtown, a vibrant hub for commerce and activity.
            </p>
            <p className="mb-4">
              If you're not ready for a walk, we can chat anytime you feel like it. Ready? Then let's start chatting.
            </p>
            <p className="mb-4">
              "What are five good things that happened today?" Take a moment to deeply reflect on the positive 
              moments in your life.
            </p>
            <p className="mb-4">
              Have your answer? You may wonder why I asked this question in the first place. Well, I want to 
              remind you of the importance of maintaining a positive mindset and gratitude for what you have. 
              Even if you have access to a world-class education, it's essential to be in the right frame of 
              mind to make the most of it.
            </p>
            <p className="mb-4">
              To obtain a MIT styled education, there are four things to consider:
            </p>
            <ol className="list-decimal list-inside mb-6 space-y-2">
              <li>You should have an internet connection.</li>
              <li>You should have a drive to learn and curiosity about the world.</li>
              <li>You should surround yourself with great people.</li>
              <li>You should have an optimistic attitude.</li>
            </ol>
            <p className="mb-6">
              If you are reading this article, you already met requirement 1. We will explore point 2–4 down below. 
              Let's dive in.
            </p>
          </div>

          <div>
            <p className="font-bold mb-4">Part 2: Drink from the right firehose</p>
            <p className="mb-4">
              When most people hear MIT, the first thing they think of is academic rigor and world-class education. 
              The key is not just having access to information, but learning how to drink from the firehose of 
              knowledge effectively.
            </p>
            <p className="mb-4">
              The internet has democratized access to information. MIT OpenCourseWare, Stanford's CS courses, 
              Harvard's CS50 - all are freely available online. The barrier isn't access; it's knowing how to 
              learn effectively and having the discipline to follow through.
            </p>
            <p className="mb-6">
              The secret is to create your own curriculum, set your own deadlines, and hold yourself accountable. 
              Treat your self-education with the same seriousness you would treat attending MIT.
            </p>
          </div>

          <div className="text-center mt-12 pt-8 border-t border-white/20">
            <p className="text-white/60 italic">
              This is a preview of the full blog post. The complete article continues with detailed strategies 
              for self-education, building networks, and creating your own world-class learning experience.
            </p>
          </div>
        </div>
      </BlogLayout>
    </>
  )
} 