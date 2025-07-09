import React from 'react'

export default function ResumePage() {
  return (
    <html lang="en" style={{ width: '100%', height: '100%' }}>
      <head>
        <title>Jack Luo - Resume</title>
        <meta name="description" content="Jack Luo's Resume - Full Stack Developer and AI Enthusiast" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ width: '100%', height: '100%', margin: 0 }}>
        <iframe
          src="https://docs.google.com/gview?url=https://github.com/thejackluo/resume/raw/main/resume.pdf&embedded=true"
          style={{ width: '100%', height: '100vh', border: 'none' }}
          title="Jack Luo Resume"
        />
      </body>
    </html>
  )
} 