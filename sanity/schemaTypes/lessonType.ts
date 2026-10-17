import { defineArrayMember, defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const lessonType = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('Lesson title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Lesson slug is required'),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Embed URL for YouTube, Vimeo, or Bunny player',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('A valid video URL is required'),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Poster / Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'duration',
      title: 'Duration (in seconds)',
      type: 'number',
      description: 'Total length of the video in seconds (e.g. 840 for 14 minutes)',
    }),
    defineField({
      name: 'freePreview',
      title: 'Free Preview',
      type: 'boolean',
      description: 'Display badge allowing free preview before enrollment',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      title: 'Student Count (for display)',
      type: 'number',
      description: 'Number of students who have completed or viewed this lesson',
      initialValue: 0,
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key Points ("In this lesson you will")',
      type: 'array',
      description: 'Bullet points highlighting what students learn in this lesson',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'proTip',
      title: 'Pro Tip',
      type: 'text',
      rows: 3,
      description: 'Optional tip or best practice callout for learners',
    }),
    defineField({
      name: 'notes',
      title: 'Lesson Notes',
      type: 'blockContent',
      description: 'Rich text notes displayed in the Notes tab',
    }),
    defineField({
      name: 'resources',
      title: 'Resources & Downloads',
      type: 'array',
      of: [defineArrayMember({ type: 'resource' })],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      duration: 'duration',
      media: 'thumbnail',
    },
    prepare({ title, duration, media }) {
      const minutes = duration ? Math.round(duration / 60) : 0
      return {
        title,
        subtitle: duration ? `${minutes} min` : 'No duration set',
        media,
      }
    },
  },
})
