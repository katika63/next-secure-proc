import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL path)',
      type: 'slug',
      description: 'URL path slug (e.g. ai-cyberattacks, data-breach, human-factor)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI Security', value: 'AI Security' },
          { title: 'Threat Analysis', value: 'Threat Analysis' },
          { title: 'Threat Intelligence', value: 'Threat Intelligence' },
          { title: 'Incident Response', value: 'Incident Response' },
          { title: 'Security Training', value: 'Security Training' },
          { title: 'Cloud Security', value: 'Cloud Security' },
          { title: 'Enterprise Security', value: 'Enterprise Security' },
          { title: 'Security Awareness', value: 'Security Awareness' },
          { title: 'Ransomware', value: 'Ransomware' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on the blog index card',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL Path (e.g. /img/ai-cyber-attacks.jpg)',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image (Sanity Asset Upload)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g. "8 min read"',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'url',
              title: 'Direct Image URL Path',
              type: 'string',
            },
          ],
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout / Highlight Box',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'text', title: 'Text', type: 'text' },
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: ['info', 'warning', 'danger', 'success'],
              },
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare({ title, author, media }) {
      return {
        title,
        subtitle: author ? `By ${author}` : 'No author assigned',
        media,
      }
    },
  },
})
