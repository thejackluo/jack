import { defineField, defineType } from 'sanity'

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'degree',
      title: 'Degree',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'field',
      title: 'Field of Study',
      type: 'string',
    }),
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'gpa',
      title: 'GPA',
      type: 'string',
    }),
    defineField({
      name: 'honors',
      title: 'Honors/Awards',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'activities',
      title: 'Activities/Clubs',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'relevantCourses',
      title: 'Relevant Courses',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'current',
      title: 'Currently Enrolled',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'institutionUrl',
      title: 'Institution URL',
      type: 'url',
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
      degree: 'degree',
      field: 'field',
      institution: 'institution',
      startDate: 'startDate',
      endDate: 'endDate',
      current: 'current',
    },
    prepare(selection) {
      const { degree, field, institution, startDate, endDate, current } = selection
      const start = startDate ? new Date(startDate).getFullYear() : ''
      const end = current ? 'Present' : (endDate ? new Date(endDate).getFullYear() : '')
      const dateRange = start && end ? `${start} - ${end}` : ''
      
      return {
        title: `${degree}${field ? ` in ${field}` : ''}`,
        subtitle: `${institution} ${dateRange}`.trim(),
      }
    },
  },
  orderings: [
    {
      title: 'Most Recent',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
}) 