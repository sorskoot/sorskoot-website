---
id: 20230904
draft: false
title: JS13KGames Devlog 1
date: 2023-09-04T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20230904
permalink: /2023/09/JS13KDevlog/
categories:
  - WebXR
tags:
  - JS13KGames
---

# Castle Defender VR

Hello Coders! 👾 Let's dive into the nitty-gritty of my latest brainchild, a WebXR game that's been keeping me on my toes. It goes by the name "Castle Defender VR". The game will be my entry for this years [JS13KGames jam](https://js13kgames.com). The theme this year is '13th Century'.
{{< img-link "/images/2023/09/Snag_269037d7.png" "Title Screen" >}}
# The Creation Journey

Choosing a theme for this game was quite challenging. A few options were considered, but ultimately, the theme of 'bow and arrow' won out. This idea seemed perfect as it resonated well with the 13th-century setting. The aim would be simple yet entertaining - shooting waves of knights marching towards your castle. However, the decision to go ahead with this theme brought its own set of challenges.

Being an entry for the WebXR category in JS13K Games, using one of the usual frameworks could have made life easier. However, I decided to up the ante and challenge myself by not using any predefined framework. Instead, everything was built from scratch in WebGL and WebXR. Sure enough, this meant things would be a bit harder initially due to my limited experience with WebGL, but it also meant more room for creativity and exploration.

## The Game ABCs

So, here's the lowdown. The current version of my game has all the must-haves. You're tasked with spawning waves of knights and then taking aim with your bow and arrow to shoot 'em down. Once you've defeated all foes, you get to move on to the next wave. But heads up! If these knights make it to your castle, you're toast!

Here's a preview of the game (at it's current state) running on my Quest 2:

{{< youtube "vFJUC7DKJxg" >}}

## Current Size

At present, "Castle Defender VR" weighs in at 10.1Kb, leaving me close to 3Kb of space to work with for tweaks and additions. And guess what? I haven't even had to break a sweat over optimization yet. Plus, I built this bad boy from scratch with no frameworks involved, just good old WebGL and WebXR.

## Trials and Triumph

Like any worthwhile endeavor, this journey has had its fair share of hurdles. Here are some heavy hitters:

### WebGL

First things first, I was practically a newbie when it came to WebGL. This meant that I had to hit the books and learn almost everything from the ground up (shaders aside). It was a tough nut to crack but hey, progress is being made. In the coming months, after the jam, I plan on releasing more in depth tutorials on how to use WebGL.

### Cubes Galore: Rendering fast

Another hurdle was dealing with rendering oodles of cubes. At first, I went with a straightforward approach which led to 2 draw calls per cube (one for each eyeball 👀). After some elbow grease and tweaking around, I rewrote a hefty portion of the code to use instancing. Now, I just update matrices and cube colors and render only once per eye.

{{< img-link "/images/2023/09/Snag_267d6e07.png" "All in one drawcall" >}}

### Giving Depth to the Flatlands

One persisting issue was that everything seemed a tad flat. So, in an attempt to jazz things up, I worked out a tri-planar mapping based on the cube's scale in the shader and threw in some color randomization.

This tiny modification ended up giving my game a pixel-art aesthetic. And let me tell you, I'm pretty chuffed about it considering all my games have this signature style :)

{{< img-link "/images/2023/09/QuestScreenshot1.jpg" "Random colors" >}}

## Wrap up

That's how Castle Defender VR came into existence- a product born out of curiosity and sheer determination to learn something new, step by step - all while working within stringent size restrictions! This adventure is still ongoing as I dive deeper into uncharted territories, experiment with various optimization techniques, improve graphics quality - all while keeping it under 13 kilobytes!

Key an eye out for more updates like this as the game jam still runs for another 9 day days, until September 13th.

Happy Coding! 🚀