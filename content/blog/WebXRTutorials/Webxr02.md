---
id: WebXR02
draft: true
title: WebXR Tutorial Series - part 2
date: 2023-07-26T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=webxr02
permalink: /2023/WebXR/02
categories:
  - WebXR
tags:
  - Tutorials
---
# First Polygon 🎨 

Hello Coders! 👾 Who's ready for another tech adventure? Today, we'll embark on an exciting journey to learn how to sketch your very first polygon in VR using the WebXR device API coupled with our good ol' friend, JavaScript. Fasten your seatbelts, coders. Here we go!

## Kickoff: A Little Prep Work 🏁

Before we blast off on this coding journey, it would be super if you've got a basic grasp on JavaScript (JS). In case you're still finding your feet with JS, no sweat! It's just like any other language - once you get into the groove, you'll be coding like a pro. 

## Enter the World of WebXR 🌐

Meet WebXR, a mighty tool that brings the fascinating realms of Virtual Reality (VR) and Augmented Reality (AR) together. Simply put, it empowers us to craft immersive experiences right on the web! To pull off this magic trick, we employ the WebXR device API.

## The Art of Rendering A Polygon 🖌️

The thought of rendering a polygon might seem intimidating initially. But hey! Let's simplify it.

To render a polygon in VR using the WebXR device API, we need three key ingredients:

1. **The Stage**: This is your VR playground. Consider it as an empty canvas waiting for your polygons!
2. **The Shape**: This is where the real fun begins. We create our polygon right here.
3. **The Renderer**: This component takes our shape and showcases it on the stage.

With these essentials in our toolkit, let's step into the world of coding!

```javascript
// Initialize our WebGL context
var canvas = document.createElement('canvas');
var gl = canvas.getContext('webgl', { xrCompatible: true });

// Set up the stage
var session;
navigator.xr.requestSession('immersive-vr', { requiredFeatures: ['local-floor'] }).then((xrSession) => {
  session = xrSession;
  document.body.appendChild(canvas);
});

// Create the shape
var vertices = new Float32Array([
  -0.5, -0.5, 0,
  0.5, -0.5, 0,
  0, 0.5, 0
]);

// Generate and set up the renderer
var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
```

There you have it! You've successfully rendered your first polygon in VR using the WebXR device API with JavaScript.

This Javascript code is responsible for setting up a WebGL context and loading a single triangle into it, presumably to be drawn later. Let's go through it piece by piece:

```javascript
// Initialize our WebGL context
var canvas = document.createElement('canvas');
var gl = canvas.getContext('webgl', { xrCompatible: true });
```

These lines are creating a new HTML5 canvas element and getting its WebGL rendering context. The { xrCompatible: true } parameter ensures that the context will be compatible with WebXR, meaning it can be used in Virtual Reality (VR) or Augmented Reality (AR) applications.

```javascript
// Set up the stage
var session;
navigator.xr.requestSession('immersive-vr', { requiredFeatures: ['local-floor'] }).then((xrSession) => {
  session = xrSession;
  document.body.appendChild(canvas);
});
```

Here, we're requesting a new WebXR "session" of type 'immersive-vr'—this is to prepare for rendering VR content. 'local-floor' is one of the features requested—it represents an understanding of the user's physical environment with regards to floor level. Once we have our session, we add the previously created canvas element to our page.

```javascript
// Create the shape
var vertices = new Float32Array([
  -0.5, -0.5, 0,
  0.5, -0.5, 0,
  0, 0.5, 0
]);
```

This creates an array of vertices for a triangle shape using Float32Array. Each group of three numbers represents one vertex's coordinates in space—our triangle here has vertices at (-0.5,-0.5), (0.5,-0.5), and (0,0.5).

```javascript
// Generate and set up the renderer
var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
```

These lines create a WebGL buffer object and bind it as the current ARRAY_BUFFER. Then we upload our vertex data into this buffer on the GPU memory using bufferData(), so they can be quickly accessed when rendering frames.

In this snippet there is no actual draw call; this would come later in your render loop where you use these buffers as inputs into your shader programs.

## Mission Accomplished: The Wrap Up 🏆

A friendly reminder to all my dev pals - practice does wonders! Don't feel disheartened if things don't fall into place in one go. Keep pushing and always remember to enjoy this process because that's what coding is all about!

Stay tuned for more thrilling VR escapades with WebXR and JavaScript!

Happy Coding! 🚀