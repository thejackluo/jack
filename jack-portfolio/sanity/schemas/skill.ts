import { defineField, defineType } from 'sanity'

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Programming Languages', value: 'programming' },
          { title: 'Frameworks & Libraries', value: 'frameworks' },
          { title: 'Tools & Technologies', value: 'tools' },
          { title: 'Databases', value: 'databases' },
          { title: 'Cloud & DevOps', value: 'cloud' },
          { title: 'Design & UI/UX', value: 'design' },
          { title: 'Soft Skills', value: 'soft' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Expert', value: 'expert' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'proficiencyScore',
      title: 'Proficiency Score (1-100)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'projects',
      title: 'Related Projects',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'icon',
      title: 'Icon/Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      category: 'category',
      proficiency: 'proficiency',
      proficiencyScore: 'proficiencyScore',
      media: 'icon',
    },
    prepare(selection) {
      const { name, category, proficiency, proficiencyScore, media } = selection
      return {
        title: name,
        subtitle: `${category} • ${proficiency} (${proficiencyScore}/100)`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Proficiency Score (High to Low)',
      name: 'proficiencyDesc',
      by: [{ field: 'proficiencyScore', direction: 'desc' }],
    },
    {
      title: 'Category',
      name: 'category',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'proficiencyScore', direction: 'desc' },
      ],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'sortOrder', direction: 'asc' },
      ],
    },
  ],
}) 