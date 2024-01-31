---
id: 1998
draft: false
title: Halloween Scream Stream
date: 2019-11-03T14:26:11+00:00
author: Timmy
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=1997
permalink: /2019/11/Halloween-Scream-Stream
categories:
  - Twitch
tags:
  - LiveCoding
  - Twitch
---

This week was Halloween 🎃 and I wanted to do something special for the stream this time. I wanted to make everything a bit more spooky. So, I added some simple effects to the stream, created some spooky music and eventually added a few new shaders and wrote a horror script to end the stream with. This is what was added and how it was done. I hope this post will give you some ideas for your own streams. I might create some detailed tutorials on how to create the effects used in the future.

<!-- Intro -->

## Look and feel

For the look and feel of the Halloween stream, I wanted to create an effect inspired by the dark world called the _upside down_ from the Stranger Things series.

### Overlays

I wanted to keep my overlays the same as normal as much as possible, with only a few added animations. I went searching and found a few animated gifs of smoke and floating particles I liked. Unfortunately, these had a black background instead of a green one. A green background can be removed pretty well using a chroma key filter in OBS. But, it turned out a black background can be removed as well. And since these gifs were black and white, the white parts stayed which gave me the look I wanted.

{{< img-link "/images/2019/11/OBS-Halloween-Group.png" "OBS Halloween Group" >}}

To make the combination of animations reusable, I created a new _scene_ in OBS. and added the animations in there.

Then, in every other scene, I wanted to have the smoke and particles, I could just add a _scene source_ and reference that scene. This way, whenever I need to make changes to the Halloween scene, I could just change it in one place and everywhere it was used the reference would update.

At some point, I noticed a higher than usual CPU usage in OBS. It turned out to be the chroma keying of the particle animation. I had to remove it to prevent possible issues while streaming.

### Camera

In normal streams, I've configured the colors of my camera to be vivid with the default lighting set to blue and purple. This didn't fit the theme for Halloween and wasn't spooky enough.

I changed two things with regards to the camera. First, I had only the lights in front of me turned on. I made sure the lights stayed this way, I disabled the light commands in the chat (you can type !light with a color to change the color name during the streams). I place the main light on the floor next to me angled upwards. The other one is set to light my face a little bit from the other side.

Second, I added a color LUT (lookup table) filter to the camera. Normally this is used to change the colors a bit and make the color pop just a little more, but in this case, I dramatically changed it and added a lot more blues while lowering the saturation. This created the look I wanted for the camera.

{{< img-link "/images/2019/11/Halloween-webcam-screenshot.png" "OBS Halloween Group" >}}

### Music

My main choice for music is the songs from the Monstercat library. But these didn't fit the horror feel I wanted to have for my stream. I wanted to have very slow and long droning sounds. I remembered a tool call [Paul Stretch](http://hypermammut.sourceforge.net/paulstretch/). This tool can stretch audio into the extreme. I took a couple of famous horror movie themes, like the theme from the movie Halloween and made it about 20 times as long. This resulted in a couple of songs that were over 1 hour long. To finish them I added a bit of EQ and normalization to them so they all sounded similar.

## The script

Now that I had the look and feel down I wanted to do something special. I wanted to 'tell a story' during my stream, inspired by my favorite horror movies. I came up with a story of an old haunted house. Every 66 years, with Halloween, the ghost would come back haunting the family living in the house at that time, which would result in a lot of unfortunate deaths.

During the stream, I mentioned details of this story, like living in an old house and the big fire in the fall of 1953. The stream would start normal, except for the spooky atmosphere. I also mentioned the rain and thunder outside.

1 hour before the end of the stream I started adding 'events' to the stream, supernatural events. It started with knocking sounds and children crying. I left my screen a few times with the camera running. With me gone or looking the other way, the camera glitches. The door would open by itself and when I'm gone to check it out and close it a black shadow moves past the camera.

Near the end, the light flickers and a ghost is seen in the background after which I decide to end the stream and check on the family because I keep hearing noises. Again, knocking. So I stand up from my desk and the stream starts glitching and after a bone-chilling scream the stream cuts out.

### Shaders

A month ago I [create a shader](https://timmykokke.com/post/2019-10-01-hueshiftshaderobs/) for use in OBS. I decided to do the same again and create a couple of different shaders. I used a tool called [KodeLife](https://hexler.net/products/kodelife) to create the shaders. I've added 2 custom shaders and used 1 that came with the OBS shader plugin. Both shaders I created are not that complex.

I wanted to create a shader that would separate the RGB colors as you would sometime see on old CRT TVs.

This clip from the stream shows the effect around the 15s mark.

{{< clip AmazonianEagerDiscKappaClaus >}}

The shader is activated only when a semi-random value gets above a certain threshold. At that point, the Red channel shifts a bit to the left and the Blue channel a bit to the right. Below is the shader itself.

{{< gist acb6245e6c1ffbb6cc35a4bc3fad03b2 >}}

The other shader I created renders noise and randomizes when it is shown and how much. Again with a certain threshold and a specified speed.

{{< gist b012be0777f5689e914863ef392cb427 >}}

### The ghost

The ghost appears two times during the stream. The first time it passes the bottom of the screen as a dark shadow. This was created by overlaying a transparent animation on top of the camera.

The second appearance was a bit more work. To create the effect of the ghost appearing behind me, I took a screenshot of the webcam without the lights on, but with me looking into the camera. I opened it in Photoshop and added a figure in the back. Looking at the picture itself it looks too fake.

{{< img-link "/images/2019/11/Shadowperson.jpg" "Ghost standing behind me" >}}

But, when I added the image to a scene in OBS (behind the camera) and added a flickering effect to the webcam on the alpha channel you just got to see it few milliseconds at a time.

{{< clip HelpfulCrazyWalletCmonBruh >}}

I added a sound effect as well. It really looks like there's some glitch in the lighting. By this time during the stream, I was actually getting the chills, because of the weird lighting and the droning sounds.

### Timing the events

For the timing of everything that was happening during the stream, I created a custom tool that was running in the background. This was a _very_ simple web application that would show me a message and execute a function after a specific time had passed.

The tool reminded me to mention the 'storm' outside and the question of the day. I wanted to talk about horror movies during the stream a bit to try and influence the minds of my viewers. At some point,it started playing audio of knocking and children crying. It should be a message that it played the sound and reminded me what to do. At first, only listen, but later switch to certain scenes to show the glitches.

The entire code of this app is available at the [Halloween Stream Repo](https://github.com/sorskoot/TwitchHalloweenSpecial2019) on my Github.

I might reuse this application and add it to a bigger application I'm planning to create reminders and such for during my stream.

I also needed to automate a few things in OBS, because I didn't want to trigger things noticeably. There's a plugin for OBS that can help, [Advanced Scene Switcher](https://obsproject.com/forum/resources/advanced-scene-switcher.395/). There's an option in this plugin that lets you create sequences, it automates going to a specific scene after some time.

{{< img-link "/images/2019/11/Horror-scenes.png" "list of horror scenes in OBS" >}}

I wanted to have a little bit of time before a scene or glitch happened so I added 'pre'-scene to a glitch and timed it to the sequence. This way I could switch to a fullscreen camera, leave and then have a glitch occur. I also used this in the end. Right as I stand up I hit the last button, I stand up and grab my headphones. This way I created the illusion I didn't hit any buttons when the final malfunction happened because my hands are clearly visible.

I programmed everything into my stream deck and the special tool reminded me what to do.

{{< img-link "/images/2019/11/Halloween-Streamdeck.png" "Actions on my stream deck" >}}

## Wrap up

I had a lot of fun creating the Halloween stream, even though a few things went differently than planned. I think I created the atmosphere I wanted, I actually was on edge during the stream. I did, however, forgot my lines during the end sequence and forgot to mention there was someone at the door again.

If you like to watch the entire ending you can do so in this [highlight](https://www.twitch.tv/videos/502260124).
