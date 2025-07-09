import React from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import styles from '@/styles/landing.module.css'

export default function NotFound() {
  return (
    <div id="full-page">
      <section id="landing">
        <div className="landing-container container-fluid">
          {/* Navigation */}
          <Navigation />

          {/* 404 Content */}
          <div className="landing-main horizontal-align container-fluid">
            <div className="landing-main-center row landing-row text-center">
              <div className="max-w-2xl mx-auto">
                <h1 className="font-elianto text-white text-8xl font-bold mb-4">
                  404
                </h1>
                <h2 className="font-stellar text-white text-3xl font-bold mb-6">
                  Page Not Found
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
                  The page you're looking for doesn't exist or has been moved. 
                  Let's get you back on track.
                </p>
                
                <div className="space-y-4">
                  <Link 
                    href="/"
                    className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-stellar font-bold transition-all duration-300 mr-4"
                  >
                    Go Home
                  </Link>
                  <Link 
                    href="/writing"
                    className="inline-block border border-white/30 hover:border-white/50 text-white px-8 py-3 rounded-lg font-stellar font-bold transition-all duration-300"
                  >
                    Browse Blogs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="landing-city full"></div>
      </section>

      {/* Footer */}
      <Footer siteSettings={null} />
    </div>
  )
} 