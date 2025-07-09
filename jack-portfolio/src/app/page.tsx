import React from 'react'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { Footer } from '@/components/Footer'
import { getSiteSettings, getProjects, isSanityConfigured, getMockData } from '@/lib/sanity'

export default async function HomePage() {
  // Fetch Sanity data with fallback to mock data
  let siteSettings = null
  let projects = []

  try {
    siteSettings = await getSiteSettings()
  } catch (error) {
    console.log('Sanity not configured yet:', error)
  }

  try {
    if (isSanityConfigured()) {
      projects = await getProjects()
    } else {
      // Use mock projects when Sanity is not configured
      projects = [
        {
          title: "Calend.ai - AI Scheduler",
          slug: { current: "calendai" },
          description: "Chrome extension that leverages modern NLP techniques and prompt engineering to automatically schedule and manage events within a user's Google calendar.",
          longDescription: [],
          image: { 
            asset: { _ref: "image-calendai" },
            alt: "Calend.ai AI Scheduler"
          },
          technologies: ["TypeScript", "Chrome Extension API", "OpenAI GPT", "Google Calendar API"],
          category: "ai",
          status: "completed",
          featured: true,
          liveUrl: "https://bit.ly/calendai",
          githubUrl: "https://github.com/thejackluo/calendai",
          startDate: "2023-01-15",
          endDate: "2023-06-30",
          teamSize: 2,
          role: "Lead Developer",
          sortOrder: 1
        },
        {
          title: "Vigama - Automation Assistant",
          slug: { current: "vigama" },
          description: "AI-driven productivity app that automates low-level tasks and generates schedules based on user preferences.",
          longDescription: [],
          image: { 
            asset: { _ref: "image-vigama" },
            alt: "Vigama Automation Assistant"
          },
          technologies: ["React", "Node.js", "OpenAI", "Speech Recognition"],
          category: "ai",
          status: "completed",
          featured: true,
          liveUrl: "https://vigama.tech",
          githubUrl: "https://github.com/thejackluo/vigama",
          startDate: "2022-09-01",
          endDate: "2023-05-15",
          teamSize: 3,
          role: "Full Stack Developer",
          sortOrder: 2
        },
        {
          title: "Lingua Scan - Computer Vision",
          slug: { current: "linguascan" },
          description: "Innovative, immersive language learning platform that leverages computer vision to enable dynamic and nuanced language learning.",
          longDescription: [],
          image: { 
            asset: { _ref: "image-linguascan" },
            alt: "Lingua Scan Computer Vision"
          },
          technologies: ["Python", "OpenCV", "TensorFlow", "React Native"],
          category: "mobile",
          status: "completed",
          featured: true,
          liveUrl: null,
          githubUrl: "https://github.com/thejackluo/lingua-scan",
          startDate: "2022-03-01",
          endDate: "2022-12-15",
          teamSize: 4,
          role: "AI Engineer",
          sortOrder: 3
        },
        {
          title: "Q Hacker House",
          slug: { current: "qhackerhouse" },
          description: "Hosted a hacker house in downtown SF for 10 people to build startups, do research, and learn from others.",
          longDescription: [],
          image: { 
            asset: { _ref: "image-hackerhouse" },
            alt: "Q Hacker House"
          },
          technologies: ["Community Building", "Event Management", "Mentorship"],
          category: "other",
          status: "completed",
          featured: false,
          liveUrl: "https://prodicity.org",
          githubUrl: null,
          startDate: "2023-06-01",
          endDate: "2023-08-31",
          teamSize: 1,
          role: "Organizer",
          sortOrder: 4
        }
      ]
    }
  } catch (error) {
    console.log('Error fetching projects:', error)
    projects = []
  }

  return (
    <div id="fullpage">
      {/* Hero/Landing Section */}
      <HeroSection siteSettings={siteSettings} />
      
      {/* About Section */}
      <AboutSection siteSettings={siteSettings} />
      
      {/* Projects Section */}
      <ProjectsSection projects={projects} />
      
      {/* Footer Section */}
      <Footer siteSettings={siteSettings} />
    </div>
  )
}
