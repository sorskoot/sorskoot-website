---
id: WebXR01
draft: true
title: WebXR Tutorial Series - part 1
date: 2023-07-26T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=webxr01
permalink: /2023/WebXR/01
categories:
  - WebXR
tags:
  - Tutorials
---

Hello Coders! 👾 Today marks the start of our grand adventure through the captivating landscape of WebXR. Inspired by the timeless wisdom of the old [NeHe's OpenGL tutorials](https://nehe.gamedev.net/tutorial/lessons_01__05/22004/), we aim to draw back the curtain on this cutting-edge technology and uncover every last detail. 

Throughout this series, you'll find we're not afraid to get our hands dirty—we'll be diving deep into each topic, ensuring you grasp not just the "how", but also the "why". By journey's end, you'll walk away with an intimate understanding of how to create immersive virtual experiences for the web.

In this inaugural post, our expedition begins with setting up a WebXR session So strap yourself in—it’s time to breathe life into your coding dreams!

## What is WebXR?

Just so that we're all on the same page, let's talk a little bit about what WebXR actually is?

WebXR is an open standard API that allows developers to create immersive experiences directly on the web. The 'XR' stands for 'Extended Reality', which is an umbrella term encompassing Virtual Reality (VR), Augmented Reality (AR), and everything in between. This powerful technology enables applications to present scenes in 3D, track movement of headset and controllers, and respond to input from those devices, all within a standard web browser (on desktop, mobile and devices like the Meta Quest). Users can interact with these immersive experiences without needing to download or install any additional software, as long as they have a compatible device—be it a VR headset, AR glasses or simply a smartphone or PC with a screen. This cross-platform compatibility makes WebXR an incredible tool for creating easily accessible 3D and immersive content.

Now do you really _need_ to know all of this when you're going to build games with WebXR? No. You don't. You can use frameworks like A-Frame or Babylon.JS or tools like Wonderland Engine. But it might not always be possible to use these, and it is good to know why things are the way they are.

## Let The Journey Begin!

What's our first move? Getting the low-down on WebXR, of course! It's this super tech that lets us create immersive experiences for the web. Picture strolling around your website like you're there in person. Nice thought, isn't it?

## Setting Up Our Coding Den

Every epic undertaking needs a home base. For us, that's going to be the HTML file where we'll be conjuring our coding sorcery. We'll kick things off by crafting a basic HTML5 template and popping in two elements: a button to launch our VR odyssey and a canvas where we'll sketch out our VR scenery.

```markdown
<!DOCTYPE html>
<html>
<head>
    <title>My First WebXR Adventure</title>
</head>
<body>
    <button id="vr-button">Start VR</button>
    <canvas id="vr-canvas"></canvas>
</body>
</html>
```

## Gear Up, Coder! ⚙️

With base camp established, it's time to tune up our gear - the JavaScript code. We'll tap into the power of the WebXR Device API for this, which luckily hangs out in most modern browsers.

First up, let's check if our browser is game for 'immersive-vr' sessions:

```javascript
const vrButton = document.getElementById('vr-button');

if (navigator.xr) {
    navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
        vrButton.disabled = !supported;
    });
}
```

If the device or browser doesn't support we disable the button.

## Diving Into The VR World 🌐

If 'immersive-vr' sessions are greenlighted, we can now conjure up an XR session when the button is clicked:

```javascript

let xrSession = null;

vrButton.addEventListener('click', async () => {
	try {
		xrSession = await navigator.xr.requestSession("immersive-vr");
		
		// Setup everything else and start rendering.
		
	} catch (e) {
		console.log(e);
	}
});
```

## It's Showtime - Creating Our Scene 🏞️

Now comes the fun part - painting our VR scene! For every frame, we'll need to get a callback function rolling that will artistically display something onto our canvas:

```javascript
function drawFrame(time, frame) {
    // This would be where we'd illustrate our scene.

	// 	
    xrSession.requestAnimationFrame(onXRFrame);
}

```

You might wonder -- what does this `onXRFrame` function look like? Well that depends on what you're feeling inspired to create. Your imagination is truly your canvas!

## Get things going

To get the whole rendering cycle going when the user clicks the button to enter VR we need to do a couple of things. Let's first have a look at the whole click listener and then over what everything does.

```JavaScript
vrButton.addEventListener('click', async () => {
    try {
        xrSession = await navigator.xr.requestSession("immersive-vr");
        xrSession.onend = onSessionEnd;
        glContext = canvas.getContext("webgl", { xrCompatible: true });
        xrSession.updateRenderState({
            baseLayer: new XRWebGLLayer(xrSession, glContext),
        });
        xrSession.requestAnimationFrame(drawFrame);
    } catch (e) {
        console.log(e);
    }
});

function onSessionEnd(arg) {
    console.log("Session ended");
    if (xrSession) {
        xrSession.end().then(() => {
            /* At this point, WebXR is fully shut down */
        });
    }
}

```

Here's a detailed breakdown:

`vrButton.addEventListener('click', async () => {...}`

This sets up an event listener on the vrButton so that the contained function runs whenever the button is clicked.

`xrSession = await navigator.xr.requestSession("immersive-vr");`

This line requests a new XR session of type "immersive-vr". The await keyword makes JavaScript wait until the Promise resolves or rejects, then assigns its value to xrSession.

`xrSession.onend = onSessionEnd;`

Here we're attaching an event handler to the WebXR session's end event. When a session ends (either by user action or programmatically), function onSessionEnd will be called.

`glContext = canvas.getContext("webgl", { xrCompatible: true });`

We're getting a WebGL rendering context from our canvas element, which we'll use for 3D rendering during our VR session. The `{ xrCompatible: true }` option ensures this context can be used with WebXR's immersive sessions.

`xrSession.updateRenderState({ baseLayer: new XRWebGLLayer(xrSession, glContext), });`

In this line, we're updating XR Session’s render state and setting its base layer to be a new XRWebGLLayer created with our WebGL context. This layer acts as the backbuffer for everything we render in our VR scene.

`xrSession.requestAnimationFrame(drawFrame);`

Finally, we start the render loop we defined earlier by calling `requestAnimationFrame` on our `xrSession` object.

Inside the try-catch block, if anything fails during this setup process, it will catch the error and log it to console using `console.log(e);`.

`function onSessionEnd(arg)` is called when the WebXR session ends either due to user action like removing headset or closing browser tab etc., or programmatically as shown within function itself where it calls 'end' method of xrsession object.

`xrSession.end().then(() => {...});`: Ends current WebXR session and once promise is fulfilled indicating successful completion of shutting down process of current WebXR session, inside then function you can perform operations that signifies complete shutdown of your application's immersive experience part.

## Actually drawing frames
```
function drawFrame(time, frame) {
        // Get the frame buffer
        glContext.bindFramebuffer(glContext.FRAMEBUFFER, frame.session.renderState.baseLayer.framebuffer);

        // Clear framebuffer to black color.
        glContext.clearColor(0.0, 0.0, 0.0, 1.0);
        glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);

        // Your rendering logic here...

        // Schedule the next frame
        xrSession.requestAnimationFrame(drawFrame);
    }
```

Let's go over what the code does exactly and why we need it.

`glContext.bindFramebuffer(glContext.FRAMEBUFFER, frame.session.renderState.baseLayer.framebuffer);`

This binds the framebuffer of the XRWebGLLayer to our WebGL context. The framebuffer essentially functions as our "drawing board" for rendering.

`glContext.clearColor(0.0, 0.0, 0.0, 1.0);`

This sets the clear color - which is the color that fills the screen after calling `glContext.clear()`. In this case, it's set to black (RGBA values: 0.0, 0.0, 0.0) with full opacity (alpha value: 1.0).

`glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);`
This clears both the color buffer and depth buffer. After this line runs, every pixel on your drawing board will be filled with the clear color (in this case black).

`// Your rendering logic here...`
It means you should put your actual drawing logic at this point in the code.

`xrSession.requestAnimationFrame(drawFrame);`

This is how we keep the loop going - by scheduling another call to our drawFrame function at an appropriate time in the future (usually right before the screen refreshes). The argument passed to requestAnimationFrame is a callback that handles drawing operations for a single frame.

Note that frames are not drawn immediately when you call this function - instead, they're drawn just before their assigned output canvas next goes through its own refresh cycle.

Remember that writing successful WebXR applications requires managing both VR presentation and input source data in response to callbacks from an active XRSession object (your render loop being one example).

## Complete script

I want to end this tutorial with the complete script. No magic things or hidden functions here, what you see is what you get. It's also available on [GitHub]() and you can find a running version [here]().

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>My First WebXR Adventure</title>
</head>

<body>
    <button type="button" id="vr-button">Start VR</button>
    <canvas id="vr-canvas"></canvas>
    
    <script>
	const vrButton = document.getElementById('vr-button');
	const canvas = document.getElementById("vr-canvas");
	
	let xrSession = null;
	let glContext = null;
	
	if (navigator.xr) {
	    navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
	        vrButton.disabled = !supported;
	    });
	}
	
	vrButton.addEventListener('click', async () => {
	    try {
	        xrSession = await navigator.xr.requestSession("immersive-vr");
	        xrSession.onend = onSessionEnd;
	        glContext = canvas.getContext("webgl", { xrCompatible: true });
	        xrSession.updateRenderState({
	            baseLayer: new XRWebGLLayer(xrSession, glContext),
	        });
	        xrSession.requestAnimationFrame(drawFrame);
	    } catch (e) {
	        console.log(e);
	    }
	});
	
	function onSessionEnd(arg) {
	    console.log("Session ended");
	    if (xrSession) {
	        xrSession.end().then(() => {
	            /* At this point, WebXR is fully shut down */
	        });
	    }
	}
	
	function drawFrame(time, frame) {
	    // Get the frame buffer
	    glContext.bindFramebuffer(glContext.FRAMEBUFFER, frame.session.renderState.baseLayer.framebuffer);
	
	    // Clear framebuffer to black color.
	    glContext.clearColor(0.0, 0.0, 0.0, 1.0);
	    glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);
	
	    // Your rendering logic here...
	
	    // Schedule the next frame
	    xrSession.requestAnimationFrame(drawFrame);
	}
	
    </script>
</body>

</html>
```


## Wrap up

And there you have it - a basic lowdown on getting started with the WebXR Device API. It's not as intimidating as it might have looked at first glance, is it? Keep in mind, as coders, we're not just number crunchers; we're trailblazers charting new territories in tech land! So venture out there and start tinkering with VR and AR in your web apps. The future is knocking at our door! Happy Coding! 🚀

