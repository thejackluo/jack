import React from 'react'
import { Button } from '@/components/ui/Button'
import { getSiteSettings } from '@/lib/sanity'
import styles from '@/styles/index.module.css'

export default async function HomePage() {
  // Test Sanity data fetching
  let siteSettings = null
  try {
    siteSettings = await getSiteSettings()
  } catch (error) {
    console.log('Sanity not configured yet:', error)
  }

  return (
    <div className={styles.fullPage}>
      {/* Landing Section */}
      <section className={styles.landing}>
        <div className={styles.landingCity} />
        <div className={styles.landingAngularFilter} />
        
        <div className="container mx-auto px-4 h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-4 font-ppstellar">
              {siteSettings?.author?.name || 'Jack Luo'}
            </h1>
            <p className="text-xl text-white/80 mb-8 font-elianto">
              {siteSettings?.author?.bio || 'Frontend Developer & Designer'}
            </p>
            
            {/* Test CSS Modules with Button Components */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="primary" size="lg">
                View Projects
              </Button>
              <Button variant="outline" size="lg">
                Contact Me
              </Button>
              <Button variant="ghost" size="md">
                Download Resume
              </Button>
            </div>
            
            {/* Test different button sizes */}
            <div className="mt-8 flex gap-2 justify-center">
              <Button variant="secondary" size="sm">
                Small
              </Button>
              <Button variant="secondary" size="md">
                Medium
              </Button>
              <Button variant="secondary" size="lg">
                Large
              </Button>
            </div>
            
            {/* Test loading state */}
            <div className="mt-4">
              <Button variant="primary" loading>
                Loading...
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className={styles.about}>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-8 font-ppstellar">
              About Me
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto font-elianto">
              This is a test page to verify that CSS modules are working correctly 
              with Tailwind CSS and that Sanity CMS integration is ready.
            </p>
            
            {/* Display Sanity connection status */}
            <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-2">
                Sanity CMS Status
              </h3>
              {siteSettings ? (
                <div className="text-green-400">
                  ✅ Connected - Site Title: {siteSettings.siteTitle}
                </div>
              ) : (
                <div className="text-yellow-400">
                  ⚠️ Not configured yet - Add your Sanity project ID to .env.local
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Test CSS Module Styles */}
      <section className={styles.achievements}>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-8 font-ppstellar">
              CSS Modules Test
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Tailwind CSS
                </h3>
                <p className="text-white/80">
                  Utility classes working correctly
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  CSS Modules
                </h3>
                <p className="text-white/80">
                  Component-scoped styles working
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Custom Fonts
                </h3>
                <p className="text-white/80">
                  PP Stellar and Elianto fonts loaded
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white/60">
            <p>© 2024 Jack Luo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
