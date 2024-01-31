---
id: 20221128
draft: false
title: VR Controllers with Unity's XR Interaction Toolkit
date: 2022-11-28T19:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20221128
permalink: /2022/11/vrcontrollerwithxri/
categories:
  - Unity  
tags:
  - VR

---

A few weeks ago I received my big prize of [winning the WebXR category](https://js13kgames.com/entries/deathkeeper) on this year's JS13K. This triggered me to look into VR in Unity again. And, with an eye on MRTK3 coming hopefully someday in the future, I thought it would be nice to learn more about the XR Interaction Toolkit. This tutorial is mostly documenting for myself, but it may help someone else as well.

I started out with a basic project with OpenXR set up and the XR Interaction Toolkit packages, version 2.2.0, installed from Unity Package Manager.

In the new scene, I added a cube to have something to see when in VR and deleted the original Camera. To get everything to work in VR, I added an 'XR Origin (VR)' object. The VR version of this has 2 controls already set up.

{{< img-link "/images/2022/11/xri-add-origin.png" "Add XR Origin (VR)" >}}

To add the hands, you'll need to model something yourself or maybe download one. For this tutorial, I downloaded one. Easiest would be if it is a rigged model, with bones and such so it can be animated easily later on. I've found a nice hand model on SketchFab (https://skfb.ly/6WWwQ), dow,loaded that, and added it to Unity. I created an empty game object, called this 'RightHand' and added the downloaded model as a child of this.

To make the hand show up it needs to be a prefab. So, drop the 'RightHand' game object in your prefab folder to create a prefab and remove it from the scene. Now, it needs to be attached to the controller. Look up 'RightHand Controller' in the scene. The has a script on it called 'XR Controller (Device Based)' with a property 'Model Prefab' in the Model section. Add the earlier created 'RightHand' prefab to this property. 

{{< img-link "/images/2022/11/xri-right-hand.png" "Set right hand prefab" >}}

Now you should be able to test it again in VR and you should have a hand somewhere that responds to the movement of the right controller. It might be floating somewhere in the distance or be REALLY big or far away.

This is still only the right hand, and the origin and scale are way off. This means a lot of going back and forth between VR and Unity to get it right. A small trick I use to get it right is to peek through the opening next to my nose and look at my hand. My real head holding the right controller needs to match the size and location of the hand in VR. This might take a lot of tweaking to get right. 

When the right hand is done, I've created a prefab variant of this, called 'LeftHand' and in this, I've set the X scale to -1 to flip it. After this, I placed this prefab in the 'Model Prefab' property of the 'LeftHand Controller' game object.

{{< img-link "/images/2022/11/xri-hands-in-vr.png" "Both hands in VR" >}}

That's it for this part. The next step will be to add an animation to close the hands when the trigger is pressed. 

---
Credits: "VR Hand" (https://skfb.ly/6WWwQ) by Tauffiq Abdllah is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).