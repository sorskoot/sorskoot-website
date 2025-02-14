---
id: 20240213
title: "Depth Sensing"
date: 2024-02-13T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
draft: true
categories:
  - WebXR
tags:
  - Wonderland Engine
---

Depth sensing in WebXR allows augmented reality experiences to understand the geometry of the environment around the user. To integrate depth-sensing capabilities in your WebXR application, you can follow these general steps:

1. **Check for Depth Sensing Support**: Before attempting to use depth sensing, you should check if the user's device supports the depth-sensing feature:

   ```javascript
   if (navigator.xr) {
     // Check if 'depth-sensing' is supported
     navigator.xr.isSessionSupported('immersive-ar', {optionalFeatures: ['depth-sensing']})
       .then((supported) => {
         if (supported) {
           // Depth sensing is supported
         } else {
           // Depth sensing is not supported
         }
       });
   }
   ```

2. **Request a Depth Sensing Session**: When creating your XR session, you must request depth sensing as an optional feature. Define the usage preferences and format:

   ```javascript
   const session = await navigator.xr.requestSession('immersive-ar', {
     optionalFeatures: ['depth-sensing'],
     depthSensing: {
       usagePreference: ['cpu-optimized', 'gpu-optimized'],
       formatPreference: ['luminance-alpha', 'float32']
     }
   });
   ```

3. **Check Selected Usage and Format**: After starting the session, verify the usage and format chosen:

   ```javascript
   console.log(session.depthUsage);   // Check the usage mode
   console.log(session.depthFormat);  // Check the data format
   ```

4. **Retrieve Depth Information**: Inside your animation frame loop (typically within `requestAnimationFrame`), obtain the depth information for the current view:

   ```javascript
   function onXRFrame(time, frame) {
     const session = frame.session;
     const pose = frame.getViewerPose(xrReferenceSpace);

     if (pose) {
       const depthInfo = frame.getDepthInformation(pose.views[0]);
       if (depthInfo) {
         // You now have access to depth data
         processDepthInformation(depthInfo);
       }
     }
   }
   ```

5. **Processing Depth Data**: Implement `processDepthInformation` to handle depth data:

   ```javascript
   function processDepthInformation(depthInfo) {
     // Use depth data for rendering or physics calculations, e.g. for occlusion
   }
   ```

6. **Rendering Depth-Aware Content**: Use the depth information to render content that properly interacts with the real-world environment, such as occluding virtual objects behind real-world surfaces.

The depth data retrieved from the `XRDepthInformation` object will often be in the form of a 2D array representing depth values for the environment. You can use this data to inform your rendering process, providing visual effects like occlusion or for physical simulations like collision detection.

Keep in mind that, as of my knowledge cutoff date in March 2023, not all devices support depth sensing and the API can change as it evolves. Always check the latest specifications and browser implementations for the most up-to-date information. Also, ensure that you handle cases where depth data may not be available or when permission to access the data is not granted by the user.

example:
https://github.com/immersive-web/webxr-samples/blob/main/layers-samples/proj-multiview-occlusion.html


---

Occlusion in an Augmented Reality (AR) context refers to the realistic rendering of virtual objects behind real-world objects. To achieve this effect, information about the spatial layout and depth of the real environment is required. The WebXR Depth API provides this information by supplying a depth map that integrates with the rendering pipeline of your WebXR application.

By using the depth information, you can determine the distance from the user’s device to the surfaces in the user's environment. With this data, you can discard parts of virtual objects that are intended to be 'behind' the real-world surfaces, creating a more immersive and realistic experience.

Here's a simplified example of how you can integrate depth information for occlusion in WebXR:

1. **Request the Depth API Feature:** When initializing your WebXR session, request the depth-sensing capability.

```javascript
const session = await navigator.xr.requestSession("immersive-ar", {
  requiredFeatures: ['depth-sensing'],
  depthSensing: {
    usagePreference: ['cpu-optimized'],
    formatPreference: ['luminance-alpha', 'float32']
  }
});
```

2. **Inspect the Selected Usage and Format:** Respond to the usage and format selected by the user agent.

```javascript
console.log(session.depthUsage);
console.log(session.depthFormat);
```

3. **Retrieve the Depth Data:** Obtain depth data during the animation frame loop, and use it to determine the depth of real-world objects. This example uses `'cpu-optimized'` usage, which means the data is best suited for CPU-based operations.

```javascript
function onXRFrame(time, frame) {
  let session = frame.session;
  let pose = frame.getViewerPose(xrReferenceSpace);
  
  if (pose) {
    // Obtain the depth information from the frame, using the viewer's pose.
    let depthInfo = frame.getDepthInformation(pose.views[0]);

    if (depthInfo) {
      // Process the depth information...
    }
  }
  session.requestAnimationFrame(onXRFrame);
}
```

4. **Occlude Virtual Objects:** Depending on the rendering technology you are using (e.g., WebGL), you would integrate the depth data to discard pixels of virtual objects that are further away than the real-world depth at the same pixel.

If you are using WebGL, here's an example fragment shader snippet that might be part of an occlusion technique:

```javascript
precision mediump float;

uniform sampler2D u_DepthTexture;
uniform float u_CanvasWidth;
uniform float u_CanvasHeight;
uniform mat4 u_UVTransform;
uniform float u_RawValueToMeters;

varying vec2 v_TexCoord;

void main(void) {
  // Transform the texture coordinates if necessary.
  vec2 transformedTexCoord = (u_UVTransform * vec4(v_TexCoord, 0, 1)).xy;
  
  // Retrieve the depth value from the texel.
  float realWorldDepth = getDepthFromTexture(u_DepthTexture, transformedTexCoord);
  
  // Calculate the normalized coordinates of the current fragment.
  vec2 fragCoord = gl_FragCoord.xy / vec2(u_CanvasWidth, u_CanvasHeight);

  if (virtualObjectDepth > realWorldDepth) {
    // The real-world depth is closer than the virtual object's depth at this pixel.
    // Discard this fragment to let the real-world show through.
    discard;
  }

  // Otherwise, render the virtual object fragment normally.
  gl_FragColor = virtualObjectColor;
}

// Function to unpack depth from texture.
float getDepthFromTexture(sampler2D depthTexture, vec2 uv) {
  vec4 depthData = texture2D(depthTexture, uv);
  // Unpack the depth value and return the depth in meters.
  // The unpacking process will depend on the format of your depth texture.
  return unpackDepthValue(depthData);
}
```

**Note:** This is a simplified example, primarily for illustrative purposes. Actual depth-based occlusion handling requires careful consideration of the depth map's format and accuracy, as well as the characteristics of the virtual objects and their interaction with light and the environment. You will also need to ensure that the depth information is correctly aligned with the camera feed and the virtual scene. Proper error handling and performance optimizations are a must for production-grade applications.

Keep in mind that not all devices support the WebXR Depth API or may have different levels of accuracy, so it's essential to handle cases where depth information may not be available or as accurate as needed. Additionally, always verify that the selected usage and format align with your application's requirements.