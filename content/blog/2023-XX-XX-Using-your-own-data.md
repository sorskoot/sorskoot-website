---
id: 20230419
draft: true
title: "AI GPT on your own data"
date: 2023-04-19T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20230419
permalink: /2023/04/WritingBetterPrompts
categories:
  - AI  
tags:
  - AI
---

Example Prompts for data not in GPT:
 - Give my a list of topics for a blogpost about WebXR
 - How to a create a button in MRTK3?

Problem:
 - Using ChatGPT/GPT3 on your custom data, larger than chunklimit

```
error: "context_length_exceeded"
message: "This model's maximum context length is 8193 tokens. However, your messages resulted in 26184 tokens. Please reduce the length of the messages."
```

Fixing:
- chunking data
- Retrieval-Augmented Generation 
