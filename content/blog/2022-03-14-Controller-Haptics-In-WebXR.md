---
id: 20220314
draft: false
title: VR Controller Haptics in WebXR
date: 2022-03-14T20:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20220314
permalink: /2022/03/controller-haptics-in-webxr/
categories:
  - WebXR  
tags:
  - WebXR

---

## Intro
You might have noticed that when you are playing games on your VR headset, you can feel the controller vibrating. This haptic feedback is a great way to get a little bit of extra feeling when you are playing. Here's how you can add it to your WebXR game. 
In this tutorial, I'm showing how to use haptics in a Wonderland component, but the part that is actually sending a pulse to the controller is not specific to Wonderland. If you're looking for an example in A-Frame, you can find it in a [game I build a while ago](https://github.com/sorskoot/gamedevjs2021-Mirror/blob/main/src/components/haptics.component.js) for the GameDevJS Game Jam.

## Haptic Feedback API
In the WebXR Device API, there's no support for haptic feedback, but instead,you can use the [Gamepad API for it](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad/hapticActuators). The support is still experimental, but since it is implemented in the Meta browser it should be safe to use. The slightly difficult part is that you need to get access to the Gamepad API, luckily you can get that through the WebXR Device API.

## Getting to the Gamepad API
As an example, I'm going to add a little vibration of the controller to a shooting component. To handle the input from the controller I'm using the default [Input component](https://wonderlandengine.com/jsapi/inputcomponent/) of Wonderland. When the 'gun' component is added to the same object as the input component we can access it very easily.

I'd like to "shoot" my gun when I pull the trigger of the controller. There's an event on the WebXR session we can subscribe to, [the 'select' event](https://developer.mozilla.org/en-US/docs/Web/API/XRSession/selectend_event). This event is not specific to any framework. We can get access to the WebXR session in Wonderland when the app switches to VR mode by using `WL.onXRSessionStart`. The 'session' object is passed as a parameter to the callback function. You can see this in context in lines 6 and 8 of the [code example below](http://localhost:1313/blog/2022-03-14-controller-haptics-in-webxr/#complete-example). 

To get access to the gamepad, we get use the [parameter 'inputSource'](https://developer.mozilla.org/en-US/docs/Web/API/XRInputSource) of the 'select' event callback. The 'inputSource' contains a lot of information about the input, but we are only interested in the 'gamepad' property and the 'handedness'. The 'handedness' is either the left or the right hand and we just use this property to check if we are about to vibrate the correct controller. 

Once we have the gamepad object we pass this off to a function that will handle the haptic feedback, `pulse` in this case. 

## Pulse
The get the controller to vibrate we use the [`pulse` function](https://developer.mozilla.org/en-US/docs/Web/API/GamepadHapticActuator/pulse). This function takes two parameters, the first is the duration of the pulse and the second is the strength of the pulse. The strength is a value between 0 and 1. The duration is in milliseconds. The `pulse` function can be found on the 'hapticActuators' array on the gamepad object. There could be more than 1 haptic actuator, but we're just going to assume we only need the first one. If there's none we just return out of the pulse function. You can find the entire function in lines 20 to 26 in the example below.

## Complete Example
The example below shows a component I've reused in pretty much all my Wonderland games in some shape or form. Extra to the description above, I've made sure the 'select event' is only added once. If the app switches to VR a second time, the `initialized` variable is already set thus the event is not added again.

{{< gist 7af51a23cb01ddb3cab653847eaa9a88 >}}