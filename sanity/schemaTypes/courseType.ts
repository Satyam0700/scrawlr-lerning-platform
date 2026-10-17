import { defineArrayMember, defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export const courseType = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: (rule) => rule.required().error('Course title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Course slug is required'),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Marketing summary / short description of the course',
      validation: (rule) => rule.required().error('Course summary is required'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (rule) => rule.required().error('Cover image alt text is required'),
        }),
      ],
      validation: (rule) => rule.required().error('Cover image is required'),
    }),
    defineField({
      name: 'level',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'Beginner' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Advanced', value: 'Advanced' },
        ],
        layout: 'radio',
      },
      initialValue: 'Intermediate',
      validation: (rule) => rule.required().error('Course level is required'),
    }),
    defineField({
      name: 'price',
      title: 'Price ($)',
      type: 'number',
      description: '0 for free, or course price in USD',
      initialValue: 0,
      validation: (rule) => rule.min(0).error('Price cannot be negative'),
    }),
    defineField({
      name: 'popular',
      title: 'Popular Flag',
      type: 'boolean',
      description: 'Mark course as popular to highlight in catalog and homepage',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      title: 'Student Count (for display)',
      type: 'number',
      description: 'Display count of enrolled learners',
      initialValue: 0,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required().error('Course category is required'),
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'reference',
      to: [{ type: 'instructor' }],
      validation: (rule) => rule.required().error('Course instructor is required'),
    }),
    defineField({
      name: 'learningOutcomes',
      title: "Learning Outcomes (What You'll Learn)",
      type: 'array',
      description: 'Key skills and takeaways covered by this course',
      of: [defineArrayMember({ type: 'learningOutcome' })],
    }),
    defineField({
      name: 'modules',
      title: 'Course Modules',
      type: 'array',
      description: 'Ordered sequence of modules and lessons',
      of: [defineArrayMember({ type: 'module' })],
      validation: (rule) => rule.min(1).error('A course must contain at least one module'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      instructorName: 'instructor.name',
      categoryTitle: 'category.title',
      media: 'coverImage',
    },
    prepare({ title, instructorName, categoryTitle, media }) {
      const parts = [categoryTitle, instructorName ? `by ${instructorName}` : null].filter(Boolean)
      return {
        title,
        subtitle: parts.join(' • '),
        media,
      }
    },
  },
})
