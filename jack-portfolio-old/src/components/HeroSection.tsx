'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { urlFor } from '@/lib/sanity'
import type { SanitySiteSettings } from '@/lib/sanity'
import styles from '@/styles/landing.module.css'

interface HeroSectionProps {
  siteSettings?: SanitySiteSettings | null
  className?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({ siteSettings, className = '' }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  const imageVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.5
      }
    }
  }

  return (
    <section className={`${styles.landing} ${className}`} id="landing">
      {/* Background layers matching original website */}
      <div className={styles.landingAngularFilter}>
        <div className={styles.landingCity} />
      </div>
      
      <div className={styles.landingContainer}>
        <div className="container-fluid">
          <motion.div
            className="text-center h-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Landing main content */}
            <div className={`${styles.landingMain} container-fluid`}>
              {/* @thejackluo link */}
              <motion.div
                className={`${styles.landingRow} row`}
                variants={itemVariants}
              >
                <a href="/resume" className="text-white hover:text-white/80 transition-colors">
                  <h2 className="font-dual text-2xl">@thejackluo</h2>
                </a>
              </motion.div>

              {/* Split layout: JACK + Image + LUO */}
              <motion.div
                className={`${styles.landingMainCenter} ${styles.landingRow} row`}
                variants={itemVariants}
              >
                {/* JACK text */}
                <div className="col-lg-4 col-md-3 col-sm-2 hidden sm:block">
                  <h1 className={`${styles.landingName} font-elianto text-6xl font-bold text-white`}>
                    <a href="/blogs/jack" className="hover:text-shadow-white transition-all duration-300">
                      JACK
                    </a>
                  </h1>
                </div>

                {/* Profile Image */}
                <motion.div
                  className="col-lg-4 col-md-6 col-sm-8"
                  variants={imageVariants}
                >
                  <img
                    src={siteSettings?.author?.profileImage 
                      ? urlFor(siteSettings.author.profileImage).url()
                      : "/assets/images/jack/main.jpg"
                    }
                    alt={siteSettings?.author?.profileImage?.alt || siteSettings?.author?.name || 'Jack Luo'}
                    className={styles.landingImage}
                  />
                </motion.div>

                {/* LUO text */}
                <div className="col-lg-4 col-md-3 col-sm-2 hidden sm:block">
                  <h1 className={`${styles.landingName} font-elianto text-6xl font-bold text-white`}>
                    <a href="/blogs/luo" className="hover:text-shadow-white transition-all duration-300">
                      LUO
                    </a>
                  </h1>
                </div>
              </motion.div>

              {/* Status text */}
              <motion.div
                className={`${styles.landingRow} row`}
                variants={itemVariants}
              >
                <h3 className="font-dual text-xl text-white/80">
                  {siteSettings?.author?.bio || 'Currently: Building @ Mira and ASJ Trading'}
                </h3>
              </motion.div>

              {/* Scroll arrow */}
              <motion.div
                className={`${styles.landingRow} row`}
                variants={itemVariants}
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <a href="#about">
                  <div className={styles.landingArrowIcon}>
                    <img
                      className="w-8 h-8"
                      src="/assets/icons/arrow/down.png" 
                      alt="Scroll down"
                    />
                  </div>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 