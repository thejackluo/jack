import React from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { getBlogPosts, getSiteSettings, isSanityConfigured, getMockData } from '@/lib/sanity'
import styles from '@/styles/landing.module.css'
import writingStyles from '@/styles/writing.module.css'

export default async function WritingPage() {
  // Fetch Sanity data with fallback to mock data
  let siteSettings = null
  let blogPosts = []

  try {
    siteSettings = await getSiteSettings()
  } catch (error) {
    console.log('Sanity not configured yet:', error)
  }

  try {
    if (isSanityConfigured()) {
      blogPosts = await getBlogPosts()
    } else {
      // Use mock data when Sanity is not configured
      const mockData = getMockData()
      blogPosts = [
        {
          title: "MIT Education anywhere",
          slug: { current: "mit" },
          publishedAt: "2023-03-14",
          readingTime: 7,
          featured: true,
          excerpt: "How to get a world-class education outside traditional institutions"
        },
        {
          title: "Space, time and philosophy", 
          slug: { current: "time" },
          publishedAt: "2023-05-15",
          readingTime: 7,
          featured: false,
          excerpt: "Exploring the intersection of physics and philosophy"
        },
        {
          title: "18 things learned at 18",
          slug: { current: "18" }, 
          publishedAt: "2022-06-01",
          readingTime: 2,
          featured: false,
          excerpt: "Life lessons from eighteen years of existence"
        },
        {
          title: "Life in 21st century",
          slug: { current: "21th" },
          publishedAt: "2022-02-15", 
          readingTime: 6,
          featured: false,
          excerpt: "Thoughts on modern life and technology"
        },
        {
          title: "Hackerhouse",
          slug: { current: "hackerhouse" },
          publishedAt: null,
          readingTime: null,
          featured: false,
          excerpt: "Coming soon - Stories from hosting a hacker house in SF"
        }
      ]
    }
  } catch (error) {
    console.log('Error fetching blog posts:', error)
    blogPosts = []
  }

  // Format blog posts for display
  const formattedBlogPosts = blogPosts.map((post: any) => {
    const publishedDate = post.publishedAt 
      ? new Date(post.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short'
        })
      : 'Coming Soon'

    return {
      title: post.title,
      slug: post.slug.current,
      date: publishedDate,
      readTime: post.readingTime ? `${post.readingTime} min` : '',
      isComingSoon: !post.publishedAt,
      excerpt: post.excerpt || ''
    }
  })

  return (
    <div id="full-page">
      <section id="landing">
        <div className="landing-container container-fluid">
          {/* Navigation */}
          <Navigation />

          {/* Landing main */}
          <div className="landing-main horizontal-align container-fluid">
            <div className="landing-main-center row landing-row">
              <h1 className="landing-name font-elianto text-white text-6xl font-bold">
                FEATURED BLOGS
              </h1>
            </div>
            
            <div className={writingStyles.blogList}>
              {formattedBlogPosts.length > 0 ? (
                formattedBlogPosts.map((post: any, index: number) => (
                  <div key={post.slug} className="row mb-4">
                    {post.isComingSoon ? (
                      <div className={writingStyles.blogButton}>
                        <h3 className={`${writingStyles.buttonText} font-stellar text-white text-xl`}>
                          {post.title}
                        </h3>
                        <p className="text-white/60">{post.date}</p>
                        {post.excerpt && (
                          <p className="text-white/40 text-sm mt-2">{post.excerpt}</p>
                        )}
                      </div>
                    ) : (
                      <Link href={`/blogs/${post.slug}`}>
                        <div className={writingStyles.blogButton}>
                          <h3 className={`${writingStyles.buttonText} font-stellar text-white text-xl hover:text-white/80 transition-colors`}>
                            {post.title}
                          </h3>
                          <p className="text-white/60">
                            {post.date} {post.readTime && `| ${post.readTime}`}
                          </p>
                          {post.excerpt && (
                            <p className="text-white/40 text-sm mt-2">{post.excerpt}</p>
                          )}
                        </div>
                      </Link>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <p className="text-white/60 text-lg">No blog posts available yet.</p>
                  <p className="text-white/40 text-sm mt-2">Check back soon for new content!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="landing-city full"></div>
      </section>

      {/* Footer */}
      <Footer siteSettings={siteSettings} />
    </div>
  )
} 