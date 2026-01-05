---
id: 20251219
draft: true
title: RAG In The Browser
date: 2025-12-19T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20251219
permalink: /2025/12/RAGinthebrowser/
categories:
  - 
tags:
  - 
images:
  - /images/2025/12/??.png
---

Mememo and WebLLM make it possible to run Retrieval Augmented Generation or RAG completely in the browser.

This means that you can have a local vector database and LLM running on the client side without needing any server infrastructure.

## Setting up Mememo

`npm install @poloclub/mememo
`

Then you can create a vector store and add documents to it:

```typescript
import { Mememo } from '@poloclub/mememo';

const mememo = new Mememo({
  model: 'your-embedding-model', // specify the embedding model
});

await mememo.addDocuments([
  { id: 'doc1', text: 'Your first document text here.' },
  { id: 'doc2', text: 'Your second document text here.' },
]);
```
