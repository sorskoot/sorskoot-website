---
id: 20220914
draft: false
title: Js13K Post-Mortem
date: 2022-09-14T22:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20220914
permalink: /2022/09/js13kgamesPostMortem/
categories:
  - WebXR  
tags:
  - WebXR

---

## What's Js13K?
This year's edition of the Js13k game jam is a wrap. The main restriction of this jam is to build a JavaScript game that completely fits in a 13Kb zipfile. To give a little bit of perspective to 13Kb. This image...
{{< img-link "/images/2022/09/SmallScreenshot.png" "Small screenshot of the game" >}}
... is 32Kb. Two entries and a little bit fit in the size of this image.

OK, there's an exception for the WebXR category, the library of choice doesn't count towards the 13Kb. But still :)

The theme of the jam this year was 'Death'. 

## Idea

The first idea I played with a little bit was a Beat Saber-type game, but you are the Grim Reaper and instead of 2 swords you hold a scythe. Souls come at you with arms in a specific position and you have to make a clean cut to get their souls. Challenges would be getting the different poses in, and tracking a two-handed weapon. 

The second idea was a Brookhaven Experiment clone, in 13k. Hordes of zombies coming at you and you'll have to fight them off. Graphics would have been the most challenging in this one.

I also played with the idea of doing something along the lines of Dia de Muertos, the day of the dead. Again graphics and characters would be very difficult. 

It was tough to think of something. Most ideas I came up with were nice for games, but impossible to do in only 13k because they rely heavily on graphics. A humanoid-type character is so hard to create in only 13k. I needed to either come up with a very clever idea for doing 3D characters (animated with bones) or do something without characters. 
The environment the game is going to take place in is probably going to be a graveyard or a morgue. I think a nice, dark, graveyard is possible.

I've decided to go with the second idea, the Brookhaven clone, except you're in a graveyard and instead of zombies, skeletons rising from the ground. 

## Babylon.js

This year I decided to go with Babylon.js as the engine of choice. I've used Babylon in the past, but mainly in combination with Unity. A great thing about Babylon is that the graphics look nice pretty easily, with shadows and everything working without a hassle. The materials are easy to create and there are a couple of post-processing effects you can just attach to your camera. Since Babylon is more of a graphics engine and not a WebXR engine, like A-Frame, getting all the WebXR stuff in was a challenge. Also, Babylon does not come with an easy way 
to control all the entities in the game. I've added that myself.

## Project outline
The game itself is not very complex. I split things up into a couple of different files to make it easier to work with, but that's most of it. Started out with everything in classes nicely exported and imported. That had to go at some point, more about that in a moment...

The audio in the game I did differently than previous years. In the past, I used a JavaScript port of an old Flash application, that still used that Flash application to create sounds. Yeah, that's not a thing anymore. I used basic WebAudio instead. It turned out Babylon.js is using Web Audio as well, so I could hook into that.

All text that is shown in the game is generated onto dynamic textures. There's a single function that can be reused for every text. The title image is also generated but this is done slightly differently. First, the text is drawn onto a canvas, and the text is given a couple of outlines and a shadow. Then, the pixels of the image are scanned and drawn onto another canvas. Based on how dark or light the pixel is, a pixel from the grave texture on the spritesheet is taken. Y is used for light/dark and a random x for variation. 

The geometry is created in Blender. The skeleton is rigged and could be animated into a walk cycle. I decided early on that having the animations created on the bones would take too much space in the game. I only used the bones to create a pose for the character. I might expand on this game idea in the future and really animate the skeletons. 
{{< img-link "/images/2022/09/js13kGeometry.png" "Geometry in Blender" >}}

The sprites are drawn using Pyxel Edit. The game uses 1 image that is exported from this sheet. And converted to WEBP, because that is slightly smaller than PNG. And then included in the code as a base64 encoded string. I've done a lot of testing and this was the smallest way in the zipfile. Babylon made it pretty easy to load the texture this way, and I could also access it from my own code to use it in other ways. For example on the ground. I wanted to have a path that had a slightly different color than the grass. This texture is the same as the grass but with a brownish coloring. 
{{< img-link "/images/2022/09/js13kPyxelEdit.png" "Spritesheet in Pyxel Edit" >}}

For level editing, I used Xem's [Level Editor](https://xem.github.io/js13k-level-editor/editor.html) this year. There are 3 levels in the game. All are stored as a string. The code for converting a back to a usable thing is very small. In the screenshot, the level looks like crap, but it saved me a ton of time building something myself.
{{< img-link "/images/2022/09/XemsLevelEditor.png" "Xem's Level Editor" >}}

Babylon comes with a built-in debug tool (similar to A-Frame), that can be activated. I used a special directive to have it in my development code and not in my production code. One of the things I like about that tool is that it comes with an animation editor. The animations of rising and walking are created with this tool and then copied into the code and finetuned by hand. 
{{< img-link "/images/2022/08/16-AnimationEditor.png" "Aniomation Editor" >}}

## Challenges
I ran into a couple of issues while building the game. 

#### Build pipeline 
The most frustrating challenge came about halfway through the competition. It still was going great and I had a lot of space below the 13Kb. It turned out my code was only compiling half. I was using imports and exports in every file. I used WebPack to convert everything into 1 file in my development environment. To create the most optimized version I used the same technique I used last year, using Terser and Roadroller to make the code the smallest. Last year I just concatenated all files to create 1 file, but last year I didn't use imports and exports. Also, I didn't include the folders where most of the code was in... So, I removed all imports and exports, switch to my Gulp setup, and ended up with a zipfile that was way over 13Kb. After cutting some features and removing a big chunk of the audio (the game had crickets and bells in the background) I got it back below the 13Kb. 

#### Entity Component System
Babylon.js does not come with an easy way of controlling entities in the game and filter for them. There are a couple of frameworks out there that can help with this, but they are all too big for this jam. So, I created my own little thing based on random bits and pieces I've found on the internet. The AI of the skeletons, movement of the VR controllers and things like that are all handled by the Simple Entity Component System.

#### Workaround + Fix in BabylonJs
My sound effects (or effect in the end) use an Web Audio audiobuffer that is played when a skeleton is hit. At first, I created a player myself, but after studying the code of Babylon.js a bit a learned that Babylon is using a similar way of playing audio. By accessing a couple of 'private' properties of the Sound class I got around the limitations. Then I figured it might be nice to have this feature in Babylon itself. Because Babylon is open source I just added the feature and send a [PR](https://github.com/BabylonJS/Babylon.js/pull/12943). It was accepted quickly. The organization of the compo was so kind to also update the allowed version to the latest with my change :). This way I saved another 70 bytes.  

#### Optimizations getting weird

To really minimize the code I create a custom gulp plugin that renames and substitutes a couple of very common words, for example, I replaced Babylon.Vector3 with BV3. This saved a whole bunch of bytes in the end. This felt pretty odd, having a gulp step like this. 

## Final Words

I really enjoyed building the game this year, even though I had some challenges. I'm looking forward to what the judges think of it and hopefully, they provide some feedback to improve the game. I am planning on adding the features I could not include in the 13Kb limit and having the game released in the future. In the meantime, you can play the game here:

https://js13kgames.com/entries/deathkeeper
