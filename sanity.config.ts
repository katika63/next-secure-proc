import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'btm-security-blog',
  title: 'BTM Security Blog',

  projectId: '8zacid9g',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),  // GROQ query explorer in Studio
  ],

  schema: {
    types: schemaTypes,
  },
})
