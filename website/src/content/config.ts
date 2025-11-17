import { defineCollection, z } from 'astro:content';

const blogs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()).nonempty(),
    excerpt: z.string(),
    heroImage: z.string(),
    externalUrl: z.string().url().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    role: z.string(),
    tech: z.array(z.string()).nonempty(),
    summary: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    status: z.enum(['Ongoing', 'Completed', 'Archived']).default('Completed'),
    category: z.enum(['AI & Agents', 'Energy & Infrastructure', 'Security & Safety', 'Productivity', 'Community', 'Research', 'Archive']).default('Archive'),
    featured: z.boolean().default(false),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string().default(''),
          caption: z.string().optional(),
        })
      )
      .default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        })
      )
      .default([]),
  }),
});

const blogTemplateSchema = z.object({
  title: z.string(),
  publishDate: z.string(),
  tags: z.array(z.string()).nonempty(),
  excerpt: z.string(),
  heroImage: z.string(),
  externalUrl: z.string().optional().nullable(),
});

const projectTemplateSchema = z.object({
  title: z.string(),
  role: z.string(),
  tech: z.array(z.string()).nonempty(),
  summary: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  status: z.enum(['Ongoing', 'Completed', 'Archived']).default('Completed'),
  category: z.enum(['AI & Agents', 'Energy & Infrastructure', 'Security & Safety', 'Productivity', 'Community', 'Research', 'Archive']).default('Archive'),
  featured: z.boolean().default(false),
  gallery: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string().default(''),
        caption: z.string().optional(),
      })
    )
    .default([]),
  links: z
    .array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      })
    )
    .default([]),
});

const templates = defineCollection({
  type: 'content',
  schema: z.union([blogTemplateSchema, projectTemplateSchema]),
});

export const collections = { blogs, projects, templates };
