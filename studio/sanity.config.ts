import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'glm7nutk'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: "Osen' Luxe Product Manager",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {types: schemaTypes},
})
