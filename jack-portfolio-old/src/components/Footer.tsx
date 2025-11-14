'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import type { SanitySiteSettings } from '@/lib/sanity'
import styles from '@/styles/footer.module.css'
import indexStyles from '@/styles/index.module.css'
import Image from 'next/image';

interface FooterProps {
  siteSettings?: SanitySiteSettings | null
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ siteSettings, className = '' }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  }

  const currentYear = new Date().getFullYear()
  const email = siteSettings?.contact?.email || 'jack@hexahacks.com'
  const calendlyUrl = 'https://calendly.com/jackluo/20-minute-meeting' // Static fallback since not in schema
  const githubUrl = siteSettings?.socialLinks?.github || 'https://github.com/thejackluo'

  return (
    <footer id="footer" className={`${indexStyles.footer} ${className}`}>
      <div className={`container-fluid ${styles.footerBody}`}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Footer Top - Contact Section */}
          <div className={`row ${styles.footerTop}`}>
            <motion.div
              className="col-lg-6 col-md-4 col-sm-12"
              variants={itemVariants}
            >
              <div className={styles.footerEncon}>
                <h4 className={`${styles.footerHeading} font-stellar text-white`}>
                  Wanna <b>reach out?</b>
                </h4>
              </div>
              <div className={styles.footerEncon}>
                <h4 className={`${styles.footerHeading} font-stellar text-white`}>
                  Have <b>awesome project ideas?</b>
                </h4>
              </div>
            </motion.div>

            {/* Email Button */}
            <motion.div
              className="col-lg-3 col-md-4 col-sm-12"
              variants={itemVariants}
            >
              <a href={`mailto:${email}`} className="block">
                <Button variant="ghost" size="lg" className="w-full">
                  <div className="flex items-center justify-center gap-3">
                    <Image 
                      src="/assets/icons/sm/mail.png" 
                      alt="Email"
                      width={24}
                      height={24}
                    />
                    <h3 className="font-stellar text-lg">Email</h3>
                  </div>
                </Button>
              </a>
            </motion.div>

            {/* Calendly Button */}
            <motion.div
              className="col-lg-3 col-md-4 col-sm-12"
              variants={itemVariants}
            >
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="ghost" size="lg" className="w-full">
                  <div className="flex items-center justify-center gap-3">
                    <Image 
                      src="/assets/icons/sm/calendar.png" 
                      alt="Calendar"
                      width={24}
                      height={24}
                    />
                    <h3 className="font-stellar text-lg">Calendly</h3>
                  </div>
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Footer Copyright */}
          <motion.div
            className={`row ${styles.footerCopyright}`}
            variants={itemVariants}
          >
            <div className="col-12">
              <div className="row justify-center">
                <h5 className="font-stellar text-white/60 text-center mb-2">
                  {currentYear} All rights reserved
                </h5>
              </div>
              <div className="row justify-center">
                <h4 className="font-stellar text-white text-center">
                  Designed & Built by{' '}
                  <a 
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 transition-colors font-bold"
                  >
                    Jack Luo
                  </a>
                </h4>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
} 