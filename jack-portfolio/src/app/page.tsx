import React from 'react'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { Footer } from '@/components/Footer'
import { getSiteSettings } from '@/lib/sanity'

export default async function HomePage() {
  // Fetch Sanity data
  let siteSettings = null
  try {
    siteSettings = await getSiteSettings()
  } catch (error) {
    console.log('Sanity not configured yet:', error)
  }

  return (
    <div id="fullpage">
      {/* Hero/Landing Section */}
      <HeroSection siteSettings={siteSettings} />
      
      {/* About Section */}
      <AboutSection siteSettings={siteSettings} />
      
      {/* Projects Section */}
      <ProjectsSection />
      
      {/* Footer Section */}
      <Footer siteSettings={siteSettings} />
    </div>
  )
}
