'use client'

import React, { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import type { ContactForm as ContactFormData } from '@/types'
import styles from '@/styles/contact.module.css'

interface ContactFormProps {
  className?: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Subject validation (optional but encouraged)
    if (formData.subject && formData.subject.trim().length > 100) {
      newErrors.subject = 'Subject must be less than 100 characters'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Check if EmailJS is configured
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID

      if (!serviceId || !templateId || !userId) {
        throw new Error('Email service is not configured. Please contact me directly at jack@hexahacks.com')
      }

      // Dynamic import of EmailJS to avoid loading it if not needed
      const emailjs = await import('@emailjs/browser')
      
      // Initialize EmailJS
      emailjs.init(userId)

      // Send email
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || 'New Contact Form Submission',
          message: formData.message,
          to_name: 'Jack Luo',
        }
      )

      setIsSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
      
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Failed to send message. Please try again or contact me directly at jack@hexahacks.com'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        className={`${styles.successContainer} ${className}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className={styles.successIcon}>✓</div>
        <h3 className="font-stellar text-2xl text-white mb-4">Message Sent!</h3>
        <p className="text-white/80 text-center">
          Thanks for reaching out! I'll get back to you as soon as possible.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      className={`${styles.contactForm} ${className}`}
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div className={styles.formGroup} variants={itemVariants}>
        <label htmlFor="name" className={styles.label}>
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          placeholder="Your full name"
          disabled={isSubmitting}
          autoComplete="name"
        />
        {errors.name && (
          <span className={styles.errorText}>{errors.name}</span>
        )}
      </motion.div>

      <motion.div className={styles.formGroup} variants={itemVariants}>
        <label htmlFor="email" className={styles.label}>
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          placeholder="your.email@example.com"
          disabled={isSubmitting}
          autoComplete="email"
        />
        {errors.email && (
          <span className={styles.errorText}>{errors.email}</span>
        )}
      </motion.div>

      <motion.div className={styles.formGroup} variants={itemVariants}>
        <label htmlFor="subject" className={styles.label}>
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
          placeholder="What's this about?"
          disabled={isSubmitting}
        />
        {errors.subject && (
          <span className={styles.errorText}>{errors.subject}</span>
        )}
      </motion.div>

      <motion.div className={styles.formGroup} variants={itemVariants}>
        <label htmlFor="message" className={styles.label}>
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          placeholder="Tell me about your project, question, or just say hi!"
          rows={6}
          disabled={isSubmitting}
        />
        <div className={styles.characterCount}>
          {formData.message.length}/1000
        </div>
        {errors.message && (
          <span className={styles.errorText}>{errors.message}</span>
        )}
      </motion.div>

      {submitError && (
        <motion.div
          className={styles.errorContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={styles.errorText}>{submitError}</span>
        </motion.div>
      )}

      <motion.div className={styles.submitContainer} variants={itemVariants}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className={styles.spinner} />
              Sending...
            </div>
          ) : (
            'Send Message'
          )}
        </Button>
        
        <p className="text-white/60 text-sm text-center mt-4">
          Or reach out directly: {' '}
          <a 
            href="mailto:jack@hexahacks.com" 
            className="text-white hover:text-white/80 transition-colors underline"
          >
            jack@hexahacks.com
          </a>
        </p>
      </motion.div>
    </motion.form>
  )
} 