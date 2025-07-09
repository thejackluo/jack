'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '@/styles/landing.module.css'

interface NavigationProps {
  className?: string
}

export const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className={`${styles.nav} ${className}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className={styles.navLogo}>
          <Link href="/">
            <h1 className="text-white font-elianto text-3xl font-bold">JL</h1>
          </Link>
        </div>
        
        <div className={styles.navContainer}>
          <div className={styles.navItem}>
            <Link href="/journey" className={isActive('/journey') ? 'text-white' : 'text-white/80 hover:text-white'}>
              <h2 className="font-dual text-xl">Journey</h2>
            </Link>
          </div>
          <div className={styles.navItem}>
            <Link href="/writing" className={isActive('/writing') ? 'text-white' : 'text-white/80 hover:text-white'}>
              <h2 className="font-dual text-xl">Writing</h2>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 