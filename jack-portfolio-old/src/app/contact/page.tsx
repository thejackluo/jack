'use client'

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { ContactForm } from '@/components/ContactForm'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { getSiteSettings, type SanitySiteSettings } from '@/lib/sanity'
import styles from '@/styles/landing.module.css'
import Image from 'next/image';

export default function ContactPage() {
  const [siteSettings, setSiteSettings] = useState<SanitySiteSettings | null>(null)

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const settings = await getSiteSettings()
        setSiteSettings(settings)
      } catch (error) {
        console.log('Sanity not configured yet:', error)
      }
    }

    fetchSiteSettings()
  }, [])

  return (
    <>
      <Head>
        <title>Contact | Jack Luo</title>
        <meta name="description" content="Get in touch with Jack Luo - Available for freelance projects, collaborations, and exciting opportunities." />
        <meta property="og:title" content="Contact Jack Luo" />
        <meta property="og:description" content="Get in touch with Jack Luo - Available for freelance projects, collaborations, and exciting opportunities." />
        <meta property="og:url" content="/contact" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Jack Luo" />
        <meta name="twitter:description" content="Get in touch with Jack Luo - Available for freelance projects, collaborations, and exciting opportunities." />
      </Head>
      
      <div className={styles.landingContainer}>
        {/* Background Elements */}
        <div className={styles.bgOverlay}></div>
        <div className={styles.bgCity}></div>
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="min-h-screen flex flex-col justify-center py-20">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-stellar text-5xl md:text-7xl lg:text-8xl text-white mb-6">
              Let's <span className="font-bold">Connect</span>
            </h1>
            <p className="font-dual text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Whether you have a project idea, want to collaborate, or just want to say hi — 
              I'd love to hear from you.
            </p>
          </motion.div>

          {/* Contact Information Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Response Time */}
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-stellar text-xl text-white mb-2">Quick Response</h3>
              <p className="font-dual text-white/70">Usually respond within 24 hours</p>
            </div>

            {/* Availability */}
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-stellar text-xl text-white mb-2">Open to Opportunities</h3>
              <p className="font-dual text-white/70">
                {siteSettings?.contact?.availability === 'available' 
                  ? 'Available for new projects'
                  : siteSettings?.contact?.availability === 'open'
                  ? 'Open to opportunities'
                  : 'Currently building something awesome'
                }
              </p>
            </div>

            {/* Location */}
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="font-stellar text-xl text-white mb-2">Remote Friendly</h3>
              <p className="font-dual text-white/70">Open to remote collaboration worldwide</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ContactForm />
          </motion.div>

          {/* Alternative Contact Methods */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="font-stellar text-2xl text-white mb-8">
              Prefer other ways to connect?
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4">
              {/* Email */}
              <a
                href={`mailto:${siteSettings?.contact?.email || 'jack@hexahacks.com'}`}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 text-white hover:text-white"
              >
                <Image src="/assets/icons/sm/mail.png" alt="Email" width={20} height={20} className="w-5 h-5" />
                <span className="font-dual">Email</span>
              </a>

              {/* Calendly */}
              <a
                href="https://calendly.com/jackluo/20-minute-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 text-white hover:text-white"
              >
                <Image src="/assets/icons/sm/calendar.png" alt="Calendar" width={20} height={20} className="w-5 h-5" />
                <span className="font-dual">Schedule a Call</span>
              </a>

              {/* LinkedIn */}
              {siteSettings?.socialLinks?.linkedin && (
                <a
                  href={siteSettings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 text-white hover:text-white"
                >
                  <Image src="/assets/icons/sm/linkedin.png" alt="LinkedIn" width={20} height={20} className="w-5 h-5" />
                  <span className="font-dual">LinkedIn</span>
                </a>
              )}

              {/* Twitter */}
              {siteSettings?.socialLinks?.twitter && (
                <a
                  href={siteSettings.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 text-white hover:text-white"
                >
                  <Image src="/assets/icons/sm/twitter.png" alt="Twitter" width={20} height={20} className="w-5 h-5" />
                  <span className="font-dual">Twitter</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </main>

        {/* Footer */}
        <Footer siteSettings={siteSettings} />
      </div>
    </>
  )
} 