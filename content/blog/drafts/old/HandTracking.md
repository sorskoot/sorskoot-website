---
draft: true
---

Hand tracking allows users to interact with virtual environments using their natural hand movements. As of my knowledge cutoff in April 2023, hand tracking is a feature that's supported by a limited number of devices, such as the Oculus Quest series.  
   
Prerequisites:  
1. Basic understanding of HTML, JavaScript, and WebGL.  
2. Experience with the WebXR Device API.  
3. A WebXR-compatible device with hand tracking capabilities.  
4. A HTTPS server to serve your WebXR content (required for WebXR sessions).  
   
Here's a step-by-step guide to get you started:  
   
### Step 1: Set Up the Basic WebXR Scene  
   
1. **Create an HTML file**: Start by setting up a basic HTML file with a canvas element where the WebXR content will be rendered.  
   
```html  
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>WebXR Hand Tracking Example</title>  
</head>  
<body>  
    <canvas id="xr-canvas"></canvas>  
    <script type="module" src="app.js"></script>  
</body>  
</html>  
```  
   
2. **Set Up the WebXR Session**: In your JavaScript file (app.js), initialize a WebXR session with necessary reference spaces and request the 'hand-tracking' feature.  
   
```javascript  
const canvas = document.getElementById("xr-canvas");  
let xrSession = null;  
let xrRefSpace = null;  
   
async function onSessionStarted(session) {  
    xrSession = session;  
    xrSession.addEventListener("end", onSessionEnded);  
  
    // Use the 'optionalFeatures' to request hand tracking  
    await xrSession.updateRenderState({  
        baseLayer: new XRWebGLLayer(xrSession, canvas.getContext('webgl'))  
    });  
  
    xrRefSpace = await xrSession.requestReferenceSpace('local-floor');  
  
    // Start the rendering loop  
    xrSession.requestAnimationFrame(onXRFrame);  
}  
   
function onSessionEnded(event) {  
    xrSession = null;  
}  
   
function checkXRSupport() {  
    // Check if 'hand-tracking' is supported  
    if (navigator.xr && navigator.xr.isSessionSupported) {  
        navigator.xr.isSessionSupported('immersive-vr').then((supported) => {  
            if (supported) {  
                navigator.xr.requestSession('immersive-vr', {  
                    requiredFeatures: ['local-floor'],  
                    optionalFeatures: ['hand-tracking']  
                }).then(onSessionStarted);  
            } else {  
                console.log("Immersive VR not supported");  
            }  
        });  
    } else {  
        console.log("WebXR not supported");  
    }  
}  
   
checkXRSupport();  
```  
   
3. **Rendering Loop**: The `onXRFrame` function will be our rendering loop. We will fill in more details here later to render the hands.  
   
### Step 2: Handle Hand Tracking Input  
   
1. **Detect Hands**: Within the `onXRFrame` function, you'll need to handle hand tracking input by accessing input sources.  
   
```javascript  
async function onXRFrame(time, frame) {  
    let session = frame.session;  
  
    // Call this before we do any rendering for the current frame  
    session.requestAnimationFrame(onXRFrame);  
  
    // Get the list of hands (input sources with hand tracking)  
    let inputSources = session.inputSources;  
  
    for (let inputSource of inputSources) {  
        if (inputSource.hand && inputSource.hand.visible) {  
            // Hand is present and visible, we can render it  
            renderHand(inputSource.hand);  
        }  
    }  
}  
```  
   
2. **Render Hands**: The `renderHand` function will be responsible for rendering the hand model or joints in the 3D space.  
   
```javascript  
function renderHand(hand) {  
    for (let joint of hand.values()) {  
        renderJoint(joint);  
    }  
}  
```  
   
3. **Render Joints**: `renderJoint` function will be responsible for rendering each joint of the hand.  
   
```javascript  
function renderJoint(joint) {  
    // Use the joint pose to render virtual objects or representations of the joints  
    let jointPose = xrRefSpace.getJointPose(joint, xrRefSpace);  
    if (jointPose) {  
        // Replace with your rendering code  
        // For example, you might render a sphere or cube at the joint's position  
    }  
}  
```  
   
### Step 3: Visual Representation of Hands  
   
1. **Add Graphics for Joints**: Update the `renderJoint` function to display visual objects at the location of each joint. This could involve using WebGL or Three.js for a full-featured 3D rendering.  
   
```javascript  
// This would be replaced or extended with your WebGL or Three.js rendering code.  
function renderJoint(joint) {  
    let jointPose = xrRefSpace.getJointPose(joint, xrRefSpace);  
    if (jointPose) {  
        drawSphere(jointPose.transform.position, joint.jointRadius);  
    }  
}  
   
function drawSphere(position, radius) {  
    // Implement your rendering code here to draw a sphere at the given position with the given radius  
}  
```  
   
2. **Enhance Interaction**: Depending on your game, you may want to interpret hand poses, detect gestures, and create interactions based on the hand positions and movements.  
   
### Step 4: Test and Debug  
   
1. **Test on Device**: Deploy the application to an HTTPS server, open it in a compatible headset's browser, and test the hand tracking feature.  
   
2. **Debug**: Check for any issues with rendering or input handling. Debugging may require logging information to the headset's console or to another device.  
   
### Conclusion:  
   
Congratulations! You now have the foundation for hand tracking in WebXR for your game. You will need to expand upon these initial steps to include detailed rendering and interaction logic depending on the complexity of the game you're developing. Remember to keep testing and refining your hand-tracking experience to ensure it's intuitive and enjoyable for users.

---
# 🎮 WebXR Hand Tracking: A Step-by-Step Guide 🕹️

Hello there, fellow game enthusiasts! 🎉 Today, I'm going to share with you a technical tutorial on how to implement hand tracking in WebXR for use in a game or another immersive experience. Hand tracking is a fascinating feature that allows users to interact with virtual environments using their natural hand movements. As of my knowledge cutoff in April 2023, hand tracking is a feature that's supported by a limited number of devices, such as the Oculus Quest series. 

Before we dive in, let's make sure you have the prerequisites covered:

1. Basic understanding of HTML, JavaScript, and WebGL.  
2. Experience with the WebXR Device API.  
3. A WebXR-compatible device with hand tracking capabilities.  
4. A HTTPS server to serve your WebXR content (required for WebXR sessions).  

Ready? Let's get started! 🚀

## 📝 Step 1: Set Up the Basic WebXR Scene 🖥️

First things first, we need to set up a basic WebXR scene. 

1. **Create an HTML file**: Start by setting up a basic HTML file with a canvas element where the WebXR content will be rendered. 

```html  
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>WebXR Hand Tracking Example</title>  
</head>  
<body>  
    <canvas id="xr-canvas"></canvas>  
    <script type="module" src="app.js"></script>  
</body>  
</html>  
```  

2. **Set Up the WebXR Session**: In your JavaScript file (app.js), initialize a WebXR session with necessary reference spaces and request the 'hand-tracking' feature. 

```javascript  
const canvas = document.getElementById("xr-canvas");  
let xrSession = null;  
let xrRefSpace = null;  
   
async function onSessionStarted(session) {  
    xrSession = session;  
    xrSession.addEventListener("end", onSessionEnded);  
  
    // Use the 'optionalFeatures' to request hand tracking  
    await xrSession.updateRenderState({  
        baseLayer: new XRWebGLLayer(xrSession, canvas.getContext('webgl'))  
    });  
  
    xrRefSpace = await xrSession.requestReferenceSpace('local-floor');  
  
    // Start the rendering loop  
    xrSession.requestAnimationFrame(onXRFrame);  
}  
   
function onSessionEnded(event) {  
    xrSession = null;  
}  
   
function checkXRSupport() {  
    // Check if 'hand-tracking' is supported  
    if (navigator.xr && navigator.xr.isSessionSupported) {  
        navigator.xr.isSessionSupported('immersive-vr').then((supported) => {  
            if (supported) {  
                navigator.xr.requestSession('immersive-vr', {  
                    requiredFeatures: ['local-floor'],  
                    optionalFeatures: ['hand-tracking']  
                }).then(onSessionStarted);  
            } else {  
                console.log("Immersive VR not supported");  
            }  
        });  
    } else {  
        console.log("WebXR not supported");  
    }  
}  
   
checkXRSupport();  
```  

3. **Rendering Loop**: The `onXRFrame` function will be our rendering loop. We will fill in more details here later to render the hands. 

## 🖐️ Step 2: Handle Hand Tracking Input 🖐️

Now, let's handle the hand tracking input.

1. **Detect Hands**: Within the `onXRFrame` function, you'll need to handle hand tracking input by accessing input sources. 

```javascript  
async function onXRFrame(time, frame) {  
    let session = frame.session;  
  
    // Call this before we do any rendering for the current frame  
    session.requestAnimationFrame(onXRFrame);  
  
    // Get the list of hands (input sources with hand tracking)  
    let inputSources = session.inputSources;  
  
    for (let inputSource of inputSources) {  
        if (inputSource.hand && inputSource.hand.visible) {  
            // Hand is present and visible, we can render it  
            renderHand(inputSource.hand);  
        }  
    }  
}  
```  

2. **Render Hands**: The `renderHand` function will be responsible for rendering the hand model or joints in the 3D space. 

```javascript  
function renderHand(hand) {  
    for (let joint of hand.values()) {  
        renderJoint(joint);  
    }  
}  
```  

3. **Render Joints**: `renderJoint` function will be responsible for rendering each joint of the hand. 

```javascript  
function render