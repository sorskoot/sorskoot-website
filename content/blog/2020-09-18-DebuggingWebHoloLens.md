---
id: 20200918
draft: true
title: How to debug Microsoft Edge on the HoloLens
date: 2020-09-19T08:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20200918
permalink: /2020/09/how-to-debug-edge-on-the-hololens
categories:
  - HoloLens
tags:
  - HoloLens
  - Edge
---

I recently started a new job as a Mixed Reality developer building applications for the Microsoft HoloLens. We build our applications using Unity3D. But, of course I had to try and run WebXR on the device as well. Microsoft Edge comes with the HoloLens and supports WebVR. And switching to 'VR' removes the browser chrome and your 3D model becomes a hologram in the real world. After that it get different from running a WebXR app on other devices very quickly. One of the difficulties I ran into was debugging.

<!--  Intro -->

## Debugging

When running a web application on the Oculus Quest for example, you can use Edge on your desktop de remotely debug. Just browse to [edge://inspect](edge://inspect) and without too much hassle you should be able to debug with the same tools you would debug any other website.
