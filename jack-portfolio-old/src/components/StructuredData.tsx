import React from 'react'

interface StructuredDataProps {
  data: object
}

/**
 * Component to render structured data (JSON-LD) in the head section
 * for better SEO and search engine understanding
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default StructuredData 