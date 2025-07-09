'use client'

import React from 'react'
import Image from 'next/image'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { urlFor, type SanitySiteSettings } from '@/lib/sanity'
import styles from '@/styles/blog.module.css'
import landingStyles from '@/styles/landing.module.css'

interface BlogLayoutProps {
  title: string
  author?: string
  readTime?: string
  publishDate?: string
  coverImage?: string
  tags?: string[]
  siteSettings?: SanitySiteSettings | null
  children: React.ReactNode
}

export const BlogLayout: React.FC<BlogLayoutProps> = ({
  title,
  author = "Jack Luo",
  readTime = "5 min read",
  publishDate,
  coverImage,
  tags,
  siteSettings,
  children
}) => {
  return (
    <div id="full-page">
      <div id="landing">
        <div className="container">
          {/* Navigation */}
          <Navigation />

          {/* Blog Content */}
          <div className="container-fluid">
            {/* Cover Image */}
            {coverImage && (
              <div className="mb-8">
                <Image
                  src={coverImage}
                  alt={title}
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-lg object-cover max-h-96"
                />
              </div>
            )}

            {/* Header */}
            <div className="landing-main-center row">
              <h2 className="font-stellar text-white text-4xl font-bold mb-8 text-center">
                {title}
              </h2>
              
              {/* Author Card */}
              <div className={styles.blogCard}>
                <img
                  className={styles.blogCardImg}
                  src={siteSettings?.author?.profileImage 
                    ? urlFor(siteSettings.author.profileImage).width(100).height(100).url()
                    : "/assets/images/jack/main.jpg"
                  }
                  alt={author}
                />
                <div className={styles.blogCardText}>
                  <h3 className="font-stellar text-white text-lg font-bold">{author}</h3>
                  <h4 className="font-stellar text-white/60 text-sm">
                    {readTime}
                    {publishDate && ` • ${publishDate}`}
                  </h4>
                </div>
              </div>

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="mb-8 text-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Blog Content */}
              <div className={styles.blogContent}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer siteSettings={siteSettings} />
    </div>
  )
} 