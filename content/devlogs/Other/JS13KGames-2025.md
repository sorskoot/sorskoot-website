---
id: 20251001
draft: false
title: "JS13KGames 2025: COD Black Cat"
date: 2025-10-01T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20251001
permalink: /2025/10/JS13KGames2025/
categories:
  - JS13KGames
tags:
  - WebXR
  - JavaScript
  - A-Frame
  - Voxels
  - Game Jam
images:
  - /images/devlogStills/js13k2025/clawsOnDuty.png
---

Hello Coders! 👾

Another year, another [JS13K Game Jam](https://js13kgames.com)! This time the theme was "Black Cat", and I had one month to create a complete a game in just 13KB zipped. Here's how I built "COD: Black Cat" - a VR voxel shooter.

_Video of final result_
{{< youtube nXnzAmyo_jE >}}

You can play it at: [https://js13kgames.com/2025/games/cod-black-cat](https://js13kgames.com/2025/games/cod-black-cat)

## The Initial Concept

When the theme was announced, my first thought was "how the hell do I make a 13KB WebXR game about a black cat?" But, after some brainstorming, I landed on a bold idea: COD: Black Cat. Think Rainbow Six Siege / Call of Duty Black Ops, but with cats and mice.

The concept was simple but ambitious: defend against waves of mice while you try to reach a bomb and disarm it. The challenge was making this work in VR with all the usual constraints of geometry, textures, and mechanics.

## Technical Foundation

I decided to use A-Frame again for this project. My first introduction with WebVR was A-Frame, but I had not used it in years. But I did want to use TypeScript as well. While I wasn't 100% sure I'd stick with A-Frame at the start, it soon felt right to change things up.

### The Voxel Engine

One of the biggest technical challenges was 3D content. I needed a way to create detailed models while keeping the file size microscopic. After some digging around I came across the [JS13K entry from Cody Ebberson from 2020](https://github.com/codyebberson/js13k-minipunk) which includes a tiny vixel engine. I decided to see if I could adapt that for my needs, including changing it to work with Three.js.

While the basics of that engine worked perfect, I also needed a way to load models. My solution was a custom voxel-based geometry system that could compress models into just a few bytes. I wrote a converter that reads MagicaVoxel files, encodes them and then stores them as strings.

Here's how the encoding worked:

```bash
00000000,22000000,20000000,03000000,03300000,13300000,03330000,03333000,00333000,13332300,03333300,03430000|000122200344432005666520066666000766670089a6a98006b6b60000030000|8,12,7,4
```

This string represents an entire mouse model! The system uses:

- A list of unique row patterns in the model
- 64 characters representing an 8x8 grid mapping to those row patterns creating a full cube
- A maximum of 15 colors per model (though scenes can have more)
- Excellent compression when zipped, because of repeating text.

The beauty of this approach is that repeated patterns compress extremely well, and I could import models directly from MagicaVoxel.

I played with the though of maybe adding a global dictionary for common patterns, but due to the time constraint I did not implement it.

{{< img-link "/images/devlogStills/js13k2025/mice01.png" "Mice" >}}

## Development Timeline

### Week 1: Vacation

This week I was still on vacation. I could only brainstorm and watch the first prototypes of others appear on Discord and social media.

### Week 2: Core Game Mechanics

The second week I could finally start working.

This week was all about getting the basics working. I set up the voxel engine, got models importing from MagicaVoxel, and added VR controller support - complete with paws as controllers!

By the end of the week, I had a basic room with mice, VR controls, and furniture in just 4KB. That left plenty of room for actual gameplay.

I managed to also add:

- Smooth locomotion for VR movement
- Collision detection with walls and objects
- Basic AI for the mice using finite state machines
- A coroutine system ported from Wonderland Engine to handle scheduling

I also experimented with A* pathfinding for the mice, but ultimately simplified to basic line-of-sight raycasting - sometimes simple is better in a jam!

{{< img-link "/images/devlogStills/js13k2025/com.oculus.browser-20250901-234029.jpg" "VR Rendering" >}} {{< img-link "/images/devlogStills/js13k2025/com.oculus.browser-20250904-232729.jpg" "VR Rendering" >}}

### Week 3: Polish and Content

The third week was about making it feel like a real game:

- Mice now had proper behavior: spawning, searching, attacking, and fleeing
- Added shooting mechanics with laser effects and particle systems
- Created a level editor for designing the map layout
- Implemented mouse hole blocking mechanics

{{< img-link "/images/devlogStills/js13k2025/mapeditor.png" "MapEditor" >}}

### Final Days: Audio and Polish

In the final stretch, I had more bytes than time - a rare luxury in JS13KGames! I added:

- Sound effects using jsfxr (1.8KB for the entire audio system)
- Visual effects like muzzle flashes and hit particles
- A proper game loop with win/lose conditions

{{< img-link "/images/devlogStills/js13k2025/furniture.png" "Furniture in MagicaVoxel" >}}

## Technical Challenges

### Ray Casting Optimization

One pleasant surprise was discovering that A-Frame's built-in ray tracer could detect mesh hits precisely. This meant I didn't need to implement custom voxel ray casting, saving precious bytes for other features.

I did run into a bit performance issue with the default A-Frame raycast setup. This would fire every frame by default and would constantly check for collision. On desktop, while testing this was not really noticable, but when running it on the Meta Quest 3, the performance was very bad. I settled with only casting a ray when needed.

### Performance vs Features

With limited processing power in VR, I had to constantly balance features against performance. The mouse AI, for instance, uses simple state machines rather than complex pathfinding to keep the frame rate as smooth as possible.

{{< img-link "/images/devlogStills/js13k2025/mice02.png" "More Mice" >}}

## What I Learned

This year taught me that having clear size constraints actually helps focus development. Instead of endless feature creep, I had to prioritize ruthlessly. The voxel compression system was particularly satisfying - proving that creative encoding can unlock possibilities that seemed impossible.

The A-Frame experiment also paid off. While I love Wonderland Engine, switching frameworks kept the challenge fresh and taught me new approaches to familiar problems.

## The Final Result

"COD: Black Cat" ended up being a fully playable VR experience where you defend against waves of mice trying to reach a bomb. Players can shoot with laser weapons, block mouse holes, and navigate through procedurally arranged rooms - all in under 11KB!

You can play the final version at: [https://js13kgames.com/2025/games/cod-black-cat](https://js13kgames.com/2025/games/cod-black-cat)

While I wish I'd had more time for visual effects like SSAO or bloom and to optimize the performance a bit, I'm still proud of what I accomplished.

Happy Coding! 🚀

{{< img-link "/images/devlogStills/js13k2025/clawsOnDuty.png" "Claws On Duty" >}}
