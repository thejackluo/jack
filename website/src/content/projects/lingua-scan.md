---
title: "Lingua Scan"
role: "Creator & Computer Vision Engineer"
tech:
  - "Python"
  - "OpenCV"
  - "TensorFlow"
  - "Translation APIs"
summary: "Immersive language-learning tool that labels real-world objects through a camera feed and narrates contextual translations."
description: "Prototyped a computer-vision powered tutor that helps learners associate vocabulary with their environment through live object detection and bilingual narration."
startDate: 2022-06-01
endDate: 2023-03-15
status: "Archived"
category: "Archive"
featured: false
gallery:
  - src: "/assets/projects/linguascan.png"
    alt: "Lingua Scan interface displaying live translations"
links:
  - label: "GitHub"
    url: "https://github.com/thejackluo/lingua-scan"
---
Lingua Scan turns any room into an interactive language classroom. A phone or webcam feed detects objects, maps them to the learner's vocabulary set, and speaks the translation alongside phonetic hints.

## Highlights
- Custom-trained detection model fine-tuned on household and travel objects for higher recall in messy environments.
- Batching pipeline for translation + text-to-speech so audio feedback feels near-real-time.
- Progress tracker that records which nouns and phrases a learner encounters most, recommending follow-up practice sets.

## Personal Contribution
I designed the computer-vision stack, built the inference service, and integrated the translation/voice synthesis pipeline that powers the in-app experience.
