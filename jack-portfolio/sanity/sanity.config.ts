import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'jack-portfolio',
  title: 'Jack Luo Portfolio',
  
  projectId: 'your-project-id', // Replace with your actual project ID
  dataset: 'production',
  
  plugins: [
    deskTool(),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  studio: {
    components: {
      // Add custom components if needed
    },
  },
}) 