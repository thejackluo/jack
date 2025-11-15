/**
 * Calculate estimated reading time for content
 * @param content - The markdown or text content
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  // Average reading speed: 200-250 words per minute
  const wordsPerMinute = 225;

  // Remove markdown syntax for accurate word count
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to just text
    .replace(/[#*_~\[\]()]/g, '') // Remove markdown symbols
    .replace(/【[^】]*】/g, '') // Remove citation markers
    .trim();

  // Count words
  const words = cleanContent.split(/\s+/).filter(word => word.length > 0).length;

  // Calculate reading time, minimum 1 minute
  const readingTime = Math.max(1, Math.ceil(words / wordsPerMinute));

  return readingTime;
}

/**
 * Format reading time as a string
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "5 min read"
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

/**
 * Clean citation markers from markdown content
 * @param content - Markdown content with potential citation markers
 * @returns Cleaned content without citation markers
 */
export function removeCitationMarkers(content: string): string {
  // Remove citation markers like 【772938094626183†L36-L39】
  return content.replace(/【[^】]*】/g, '');
}
