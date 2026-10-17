import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const resourceType = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('Resource title is required'),
    }),
    defineField({
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'GitHub Repository', value: 'github' },
          { title: 'Documentation', value: 'docs' },
          { title: 'Article / Guide', value: 'article' },
          { title: 'PDF / Slides', value: 'pdf' },
          { title: 'External Tool / Link', value: 'tool' },
        ],
      },
      validation: (rule) => rule.required().error('Resource type is required'),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({ scheme: ['http', 'https'] }).error('A valid web URL is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
    },
  },
})
