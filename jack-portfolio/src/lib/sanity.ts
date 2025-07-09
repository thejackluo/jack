import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Check if Sanity is properly configured
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiToken = process.env.SANITY_API_TOKEN

const isConfigured = projectId && projectId !== 'your-project-id'

export const client = createClient({
  projectId: projectId || 'temp-project-id',
  dataset: dataset,
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
  token: apiToken,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper function to check if Sanity is configured
export function isSanityConfigured() {
  return isConfigured
}

// Helper function to get mock data for development
export function getMockData() {
  return {
    blogPosts: [],
    projects: [],
    toyProjects: [],
    experience: [],
    education: [],
    skills: [],
    siteSettings: {
      siteTitle: 'Jack Luo - Portfolio',
      siteDescription: 'Personal portfolio website showcasing Jack Luo\'s projects, journey, and creative work',
      author: {
        name: 'Jack Luo',
        bio: 'Developer and creative thinker',
      },
      socialLinks: {
        github: 'https://github.com/jackluo',
        linkedin: 'https://linkedin.com/in/jackluo',
      },
      contact: {
        email: 'contact@jack-luo.com',
      },
      navigation: [
        { title: 'Home', href: '/', external: false },
        { title: 'Projects', href: '/projects', external: false },
        { title: 'Blog', href: '/blog', external: false },
        { title: 'Journey', href: '/journey', external: false },
      ],
      theme: {
        darkMode: false,
        animationsEnabled: true,
      },
    },
  }
}

// GROQ queries for different content types
export const queries = {
  // Blog Posts
  blogPosts: `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    tags,
    featured,
    coverImage,
    readingTime,
    "content": content[0...3]
  }`,
  
  blogPost: `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    tags,
    featured,
    coverImage,
    readingTime
  }`,
  
  featuredBlogPosts: `*[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    tags,
    coverImage,
    readingTime
  }`,

  // Projects
  projects: `*[_type == "project"] | order(featured desc, sortOrder asc) {
    _id,
    title,
    slug,
    description,
    image,
    technologies,
    category,
    status,
    featured,
    liveUrl,
    githubUrl,
    startDate,
    endDate,
    role,
    sortOrder
  }`,
  
  project: `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    longDescription,
    image,
    technologies,
    category,
    status,
    featured,
    liveUrl,
    githubUrl,
    startDate,
    endDate,
    teamSize,
    role,
    sortOrder
  }`,
  
  featuredProjects: `*[_type == "project" && featured == true] | order(sortOrder asc) {
    _id,
    title,
    slug,
    description,
    image,
    technologies,
    category,
    status,
    liveUrl,
    githubUrl,
    startDate,
    endDate,
    role
  }`,

  // Toy Projects
  toyProjects: `*[_type == "toyProject"] | order(featured desc, sortOrder asc) {
    _id,
    title,
    slug,
    description,
    image,
    url,
    technologies,
    category,
    createdAt,
    featured,
    sortOrder
  }`,

  // Experience
  experience: `*[_type == "experience"] | order(startDate desc) {
    _id,
    title,
    company,
    location,
    type,
    description,
    startDate,
    endDate,
    current,
    skills,
    achievements,
    companyUrl,
    sortOrder
  }`,

  // Education
  education: `*[_type == "education"] | order(startDate desc) {
    _id,
    degree,
    field,
    institution,
    location,
    description,
    gpa,
    honors,
    activities,
    relevantCourses,
    startDate,
    endDate,
    current,
    institutionUrl,
    sortOrder
  }`,

  // Skills
  skills: `*[_type == "skill"] | order(category asc, proficiencyScore desc) {
    _id,
    name,
    category,
    proficiency,
    proficiencyScore,
    description,
    yearsOfExperience,
    certifications,
    projects,
    icon,
    featured,
    sortOrder
  }`,
  
  skillsByCategory: `*[_type == "skill"] | order(proficiencyScore desc) {
    _id,
    name,
    category,
    proficiency,
    proficiencyScore,
    description,
    yearsOfExperience,
    icon,
    featured
  } | group(category)`,

  // Site Settings
  siteSettings: `*[_type == "siteSettings"][0] {
    _id,
    siteTitle,
    siteDescription,
    siteKeywords,
    ogImage,
    favicon,
    author,
    socialLinks,
    contact,
    navigation,
    theme,
    analytics,
    updatedAt
  }`,
}

// Helper functions for common operations
export async function getBlogPosts() {
  if (!isSanityConfigured()) {
    console.log('Sanity not configured yet, returning mock data')
    return getMockData().blogPosts
  }
  try {
    return await client.fetch(queries.blogPosts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return getMockData().blogPosts
  }
}

export async function getBlogPost(slug: string) {
  if (!isSanityConfigured()) {
    return null
  }
  try {
    return await client.fetch(queries.blogPost, { slug })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function getFeaturedBlogPosts() {
  if (!isSanityConfigured()) {
    return getMockData().blogPosts
  }
  try {
    return await client.fetch(queries.featuredBlogPosts)
  } catch (error) {
    console.error('Error fetching featured blog posts:', error)
    return getMockData().blogPosts
  }
}

export async function getProjects() {
  if (!isSanityConfigured()) {
    return getMockData().projects
  }
  try {
    return await client.fetch(queries.projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return getMockData().projects
  }
}

export async function getProject(slug: string) {
  if (!isSanityConfigured()) {
    return null
  }
  try {
    return await client.fetch(queries.project, { slug })
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function getFeaturedProjects() {
  if (!isSanityConfigured()) {
    return getMockData().projects
  }
  try {
    return await client.fetch(queries.featuredProjects)
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return getMockData().projects
  }
}

export async function getToyProjects() {
  if (!isSanityConfigured()) {
    return getMockData().toyProjects
  }
  try {
    return await client.fetch(queries.toyProjects)
  } catch (error) {
    console.error('Error fetching toy projects:', error)
    return getMockData().toyProjects
  }
}

export async function getExperience() {
  if (!isSanityConfigured()) {
    return getMockData().experience
  }
  try {
    return await client.fetch(queries.experience)
  } catch (error) {
    console.error('Error fetching experience:', error)
    return getMockData().experience
  }
}

export async function getEducation() {
  if (!isSanityConfigured()) {
    return getMockData().education
  }
  try {
    return await client.fetch(queries.education)
  } catch (error) {
    console.error('Error fetching education:', error)
    return getMockData().education
  }
}

export async function getSkills() {
  if (!isSanityConfigured()) {
    return getMockData().skills
  }
  try {
    return await client.fetch(queries.skills)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return getMockData().skills
  }
}

export async function getSkillsByCategory() {
  if (!isSanityConfigured()) {
    return getMockData().skills
  }
  try {
    return await client.fetch(queries.skillsByCategory)
  } catch (error) {
    console.error('Error fetching skills by category:', error)
    return getMockData().skills
  }
}

export async function getSiteSettings() {
  if (!isSanityConfigured()) {
    return getMockData().siteSettings
  }
  try {
    return await client.fetch(queries.siteSettings)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return getMockData().siteSettings
  }
}

// Type definitions for Sanity data
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityBlock {
  _type: 'block'
  _key: string
  style: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _type: string
    _key: string
    href?: string
  }>
}

export type SanityRichText = Array<SanityBlock | SanityImage>

// Content type interfaces
export interface SanityBlogPost extends SanityDocument {
  title: string
  slug: SanitySlug
  excerpt: string
  content: SanityRichText
  publishedAt: string
  tags: string[]
  featured: boolean
  coverImage?: SanityImage
  readingTime: number
}

export interface SanityProject extends SanityDocument {
  title: string
  slug: SanitySlug
  description: string
  longDescription?: SanityRichText
  image: SanityImage
  technologies: string[]
  category: string
  status: string
  featured: boolean
  liveUrl?: string
  githubUrl?: string
  startDate: string
  endDate?: string
  teamSize?: number
  role?: string
  sortOrder: number
}

export interface SanityToyProject extends SanityDocument {
  title: string
  slug: SanitySlug
  description: string
  image: SanityImage
  url: string
  technologies: string[]
  category: string
  createdAt: string
  featured: boolean
  sortOrder: number
}

export interface SanityExperience extends SanityDocument {
  title: string
  company: string
  location?: string
  type?: string
  description: SanityRichText
  startDate: string
  endDate?: string
  current: boolean
  skills: string[]
  achievements: string[]
  companyUrl?: string
  sortOrder: number
}

export interface SanityEducation extends SanityDocument {
  degree: string
  field?: string
  institution: string
  location?: string
  description?: string
  gpa?: string
  honors: string[]
  activities: string[]
  relevantCourses: string[]
  startDate: string
  endDate?: string
  current: boolean
  institutionUrl?: string
  sortOrder: number
}

export interface SanitySkill extends SanityDocument {
  name: string
  category: string
  proficiency: string
  proficiencyScore: number
  description?: string
  yearsOfExperience?: number
  certifications: string[]
  projects: string[]
  icon?: SanityImage
  featured: boolean
  sortOrder: number
}

export interface SanitySiteSettings extends SanityDocument {
  siteTitle: string
  siteDescription: string
  siteKeywords: string[]
  ogImage?: SanityImage
  favicon?: SanityImage
  author: {
    name: string
    email?: string
    bio?: string
    profileImage?: SanityImage
    location?: string
    website?: string
  }
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
    facebook?: string
    youtube?: string
    dribbble?: string
    behance?: string
  }
  contact: {
    email?: string
    phone?: string
    address?: string
    availability?: string
    preferredContact?: string
  }
  navigation: Array<{
    title: string
    href: string
    external: boolean
  }>
  theme: {
    primaryColor?: string
    darkMode: boolean
    animationsEnabled: boolean
  }
  analytics: {
    googleAnalytics?: string
    gtag?: string
  }
  updatedAt?: string
} 