---
id: 20260330
draft: false
title: Automatic Font Parsing for A-Frame
date: 2026-03-30T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20260330
permalink: /2026/03/AFrameFontAsset/
categories:
  - WebXR
tags:
  - A-Frame
images:
  - /images/blog.jpg
---

Hello Coders! 👾

When I work with text in A-Frame, the most annoying part usually is not the `text` component itself. The annoying part is getting a font into the format that A-Frame expects. Most fonts I have around are normal TTF or OTF files, and I don't want to manually convert them every time I start a new WebXR prototype.

To keep that process simple, I use PixiJS AssetPack to automatically convert those font files into an SDF font asset during my asset build step. That way I can keep working with regular font files in my project and let the tooling handle the conversion for me.

## Why this helps

The A-Frame `text` component works great once the font asset is in the right format, but preparing that asset by hand gets old fast. AssetPack gives me a clean way to automate that step, especially when I am already using a small build pipeline for static files.

If you want to look at the tools themselves, the [A-Frame text component](https://aframe.io/docs/1.7.0/components/text.html), [PixiJS AssetPack](https://pixijs.io/assetpack/), and the specific [webfont pipe documentation](https://pixijs.io/assetpack/docs/guide/pipes/webfont/) are a good place to start.

## Installing AssetPack

I start by adding AssetPack as a dev dependency:

```bash
npm install @assetpack/core -D
```

After that, I put my source fonts in a `raw-assets` folder in the root of the project.

## Configuring the conversion

Next, I create a `.assetpack.js` file in the project root and enable the SDF font pipe:

```ts
import { sdfFont } from '@assetpack/core/webfont';

export default {
  entry: './raw-assets',
  output: './public/assets/',
  cache: true,
  pipes: [sdfFont()],
};
```

This tells AssetPack to scan the `raw-assets` folder and write the processed output to `public/assets`.

## Marking the fonts you want to process

The part I like most is that I can control this through the filename. If I rename a file so it includes the `{sdf}` marker, AssetPack knows it should process that font through the SDF pipeline.

For example, I can rename a font to something like `Orbitron{sdf}.ttf`. That is enough to tell AssetPack that this file should be converted for use with A-Frame.

## Adding useful scripts

To make it easy to run, I add a couple of scripts to `package.json`:

```json
{
  "scripts": {
    "assets": "assetpack",
    "assets:watch": "assetpack -w"
  }
}
```

With that in place, I can run `npm run assets` for a one-time build, or `npm run assets:watch` while I am working on the scene.

## Final thoughts

This is a small workflow improvement, but it removes one of the annoying setup tasks from working with text in A-Frame. I can keep normal font files in source control, run one command, and let the generated assets land where the project expects them.

If you already have an asset pipeline for images, audio, or other static files, adding font conversion to that same process keeps everything a lot cleaner.

Happy Coding! 🚀

{{< img-link "/images/blog.jpg" "Code" >}}