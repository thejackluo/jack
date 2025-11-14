import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'jack',

  projectId: 'vzws1a6s',
  dataset: 'jack',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
