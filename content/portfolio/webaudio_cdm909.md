---
id: 6
title: WebAudio Drum machine
date: 2016-08-01
layout: portfolio
image: /images/cdm-909.jpg
format: stacked
link: http://cdm-909.timmykokke.com
tools: 
    - Web Audio API
    - AngularJS
    - Tone.js
    - Cordova
---

I've created this drum machine as an example to demonstrate the low latency of the Web Audio API. It was built as an Apache Cordova app at first, later ported to the web.

### challenges

The biggest challenge was to get the performance it needs to run, play the samples and effects. At first, I build it using Material Design animations, but that was too slow so I had to remove them and create everything myself.
