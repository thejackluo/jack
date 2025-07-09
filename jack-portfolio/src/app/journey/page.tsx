import React from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { getSiteSettings } from '@/lib/sanity'
import styles from '@/styles/landing.module.css'
import journeyStyles from '@/styles/journey.module.css'

export default async function JourneyPage() {
  // Fetch Sanity data
  let siteSettings = null
  try {
    siteSettings = await getSiteSettings()
  } catch (error) {
    console.log('Sanity not configured yet:', error)
  }

  return (
    <div id="full-page">
      <section id="landing">
        <div className="landing-container container-fluid">
          {/* Navigation */}
          <Navigation />

          {/* Landing main */}
          <div className="landing-main container-fluid">
            <div className="row landing-row journey-container">
              <h3 className="font-stellar text-white text-3xl mb-8">Projects</h3>
              
              {/* Projects Grid */}
              <div className="row mb-8">
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className={journeyStyles.projectCard}>
                    <h3 className={journeyStyles.projectHeader}>Calend.ai - AI scheduler</h3>
                    <img
                      src="/assets/images/projects/calendai.png"
                      className={journeyStyles.projectImage}
                      alt="Calend.ai"
                    />
                    <p className="text-white/80">
                      <a href="https://bit.ly/calendai" className="text-white underline hover:text-white/80">
                        Calend.ai
                      </a>
                      {" "}is a chrome extension that leverages modern nlp
                      techniques and prompt engineering to automatically
                      schedule and manage events within a user's google
                      calendar. It learns behaviors of user scheduled events and
                      provides personalized descriptions.
                    </p>
                  </div>
                </div>
                
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className={journeyStyles.projectCard}>
                    <h3 className={journeyStyles.projectHeader}>Vigama - Automation assistant</h3>
                    <img
                      src="/assets/images/projects/vigama.gif"
                      className={journeyStyles.projectImage}
                      alt="Vigama"
                    />
                    <p className="text-white/80">
                      <a href="https://vigama.tech" className="text-white underline hover:text-white/80">
                        Vigama
                      </a>
                      {" "}is an AI-driven productivity app that automates low level
                      tasks and generates schedule based on user preferences.
                      Vigama captures language either through text or speech
                      from the user and outputs both text/speech and executes
                      commands.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className={journeyStyles.projectCard}>
                    <h3 className={journeyStyles.projectHeader}>Lingua Scan - Computer Vision</h3>
                    <img
                      src="/assets/images/projects/linguascan.png"
                      className={journeyStyles.projectImage}
                      alt="Lingua Scan"
                    />
                    <p className="text-white/80">
                      Developed{" "}
                      <a
                        href="https://github.com/thejackluo/lingua-scan"
                        className="text-white underline hover:text-white/80"
                      >
                        Lingua Scan
                      </a>
                      , an innovative, immersive language learning platform
                      that leverages computer vision to enable dynamic and
                      nuanced language learning, bringing the power of
                      category-based learning, real-time object scanning and
                      translation.
                    </p>
                  </div>
                </div>
                
                <div className="col-sm-12 col-md-6 col-lg-4">
                  <div className={journeyStyles.projectCard}>
                    <h3 className={journeyStyles.projectHeader}>Q Hacker House</h3>
                    <img
                      src="/assets/images/projects/hackerhouse.jpg"
                      className={journeyStyles.projectImage}
                      alt="Q Hacker House"
                    />
                    <p className="text-white/80">
                      In 2023 summer, hosted a hacker house in downtown SF for 10
                      people to build startups, do research, and learn from
                      others. Help coordinated logistics for the house while
                      created{" "}
                      <a href="https://prodicity.org" className="text-white underline hover:text-white/80">
                        Prodicity
                      </a>
                      {" "}- AI mentorship for 20+ high school students.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="landing-angular-filter full">
          <div className="landing-city full"></div>
        </div>
      </section>
      
      <section id="creative">
        <div className="creative-container container-fluid">
          <div className="landing-main container-fluid">
            <div className="landing-row row">
              <h3 className="font-stellar text-white text-3xl mb-8">Creative</h3>
              <p className="text-white/80 text-lg max-w-4xl mx-auto">
                Coming soon - A space for my creative projects, experiments, and explorations 
                in art, music, and interactive experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer siteSettings={siteSettings} />
    </div>
  )
} 