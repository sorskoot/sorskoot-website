---
id: 20251215
draft: true
title: Rosie On OSS
date: 2025-12-15T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20251215
permalink: /2025/12/RosieonOSS/
categories:
  - 
tags:
  - 
images:
  - /images/2025/12/??.png
---

Question: Can Rosie be Rosie but completely run on OSS models? Mainly for the LLM, RAG and TTS.

Short answer: Yes.

Long answer:

- WebLLM
- Mememo <https://github.com/poloclub/mememo>
- WebSpeechAPI for speech recognition
- HeadTTS- <https://github.com/met4citizen/HeadTTS#readme>
    For TTS and visemes since WebSpeechAPI doesn't allow access to the raw audio data.
