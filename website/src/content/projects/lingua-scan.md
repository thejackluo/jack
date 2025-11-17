---
title: 'Lingua Scan'
role: 'Creator & Computer Vision Engineer'
tech:
  - 'Python'
  - 'OpenCV'
  - 'TensorFlow'
  - 'Translation APIs'
summary: 'Immersive language-learning tool that labels real-world objects through a camera feed and narrates contextual translations.'
description: 'Prototyped a computer-vision powered tutor that helps learners associate vocabulary with their environment through live object detection and bilingual narration.'
startDate: 2022-06-01
endDate: 2023-03-15
status: 'Completed'
category: 'Archive'
featured: false
gallery:
  - src: '/assets/projects/linguascan.png'
    alt: 'Lingua Scan interface displaying live translations'
links:
  - label: 'GitHub'
    url: 'https://github.com/thejackluo/lingua-scan'
---

Lingua Scan turns any room into an interactive language classroom. Using a phone or webcam feed, it detects objects around you, maps them to the learner's target vocabulary, and then speaks the translation of each object's name (with phonetic hints for pronunciation).

## Highlights

- Custom-trained object detection model fine-tuned on household and travel items for higher recall in messy, real-world environments.
- Batching pipeline for translation + text-to-speech so that audio feedback feels near real-time, even when multiple objects are detected at once.
- Progress tracker that records which nouns and phrases a learner encounters most frequently, and then recommends follow-up practice sets for those high-frequency terms.

## Personal Contribution

I designed the entire computer vision stack: training the detection model (leveraging TensorFlow and a pre-trained model as a base), building the real-time inference service with OpenCV, and integrating the translation + voice synthesis pipeline. Essentially, I took this project from idea to prototype — coding the mobile app interface (in Flutter) and the Python backend that powers the in-app experience.
