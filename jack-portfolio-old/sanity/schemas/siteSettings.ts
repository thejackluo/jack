import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteKeywords',
      title: 'Site Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
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
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      options: {
        accept: '.ico,.png,.svg',
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) => Rule.email(),
        },
        {
          name: 'bio',
          title: 'Bio',
          type: 'text',
          rows: 4,
        },
        {
          name: 'profileImage',
          title: 'Profile Image',
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
        },
        {
          name: 'location',
          title: 'Location',
          type: 'string',
        },
        {
          name: 'website',
          title: 'Website',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'github',
          title: 'GitHub',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
        {
          name: 'dribbble',
          title: 'Dribbble',
          type: 'url',
        },
        {
          name: 'behance',
          title: 'Behance',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) => Rule.email(),
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3,
        },
        {
          name: 'availability',
          title: 'Availability',
          type: 'string',
          options: {
            list: [
              { title: 'Available for hire', value: 'available' },
              { title: 'Open to opportunities', value: 'open' },
              { title: 'Not available', value: 'unavailable' },
            ],
            layout: 'radio',
          },
        },
        {
          name: 'preferredContact',
          title: 'Preferred Contact Method',
          type: 'string',
          options: {
            list: [
              { title: 'Email', value: 'email' },
              { title: 'Phone', value: 'phone' },
              { title: 'LinkedIn', value: 'linkedin' },
            ],
            layout: 'radio',
          },
        },
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'URL/Path',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'external',
              title: 'External Link',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Theme Settings',
      type: 'object',
      fields: [
        {
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          options: {
            list: [
              { title: 'Blue', value: '#3B82F6' },
              { title: 'Purple', value: '#8B5CF6' },
              { title: 'Green', value: '#10B981' },
              { title: 'Red', value: '#EF4444' },
              { title: 'Orange', value: '#F97316' },
              { title: 'Pink', value: '#EC4899' },
            ],
          },
        },
        {
          name: 'darkMode',
          title: 'Dark Mode Default',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'animationsEnabled',
          title: 'Animations Enabled',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        {
          name: 'googleAnalytics',
          title: 'Google Analytics ID',
          type: 'string',
        },
        {
          name: 'gtag',
          title: 'Google Tag Manager ID',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'siteDescription',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Site Settings',
        subtitle: subtitle || 'Configure your portfolio settings',
      }
    },
  },
}) 