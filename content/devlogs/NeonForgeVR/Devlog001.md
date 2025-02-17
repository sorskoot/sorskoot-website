---
id: 20250217
draft: false
title: Devlog 1 - Introducing Neonforge - A Cyberpunk Factory Game in VR
date: 2025-02-17T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20250217
permalink: /2025/02/NeonForge/Devlog001/
categories:
  - NeonForgeVR
images:
  - /images/devlogStills/neonForge/neonforgevr.png
---

Hello Coders! 👾

Welcome to the first devlog of my new (proof of concept) game project, NeonForgeVR. I’ve been playing factory games like Satisfactory, Factorio, and Minecraft modpacks with automation features for a long time. Inspired by these games, I decided to create my own VR game set in a futuristic, sci-fi, cyberpunk world.

### Concept and Initial Thoughts

NeonForge takes place in a dystopian future where technology and corporations dominate society. You, the player, are banned from the main city and must thrive in the outskirts by automating the extraction and processing of resources. The core focus of the game is on automation, and there won't be any combat elements.

Initially, I started building a proof of concept featuring basic game mechanics like a miner, belts to transfer items, a processing machine, and a primary machine for interacting and transferring items.

### Iterating and Refining the Game

While developing the POC, I realized that the game needed some changes. I often find it helpful to go with the flow of my ideas and see where they take me. Inspired by the modular approach of Minecraft mods, I decided to explore creating machines from building blocks rather than using a crafting grid. This way, players will need specific parts to create and upgrade machines.

At this point I also decided to witch the design of the game and go for the pixelated style I often use in my games. This is style is often compared to Minecraft. So, I just went with that idea. Creating a voxel engine inside Wonderland Engine is a new challenge though. I don't think this has been done before. I've done similar things in the distant past, but with a couple of only videos for inspiration I have something going.

I began working on some textures, aiming to maintain a pixelated look. I started with Substance Designer but decided to give Pixel Composer a try. I created 16x16 pixel textures for various blocks, such as scrap metal.

### Progress Updates

Here are some of the key progress updates so far:

- **Voxel Rendering in Wonderland Engine:** I experimented with rendering voxel-type structures in Wonderland Engine, successfully creating meshes with vertex colors, UVs, and normals. I don't think this has been done before, so getting this to work is already a big win!

{{< img-link "/images/devlogStills/neonForge/devlog1/image.png" "Voxels with Wonderland Engine" >}}

- **Texture Manager:** I added a texture manager to load 16x16 textures at runtime and create a texture sheet, allowing efficient UV mapping.

- **VR Compatibility:** The game works seamlessly in VR, which is crucial for the immersive experience I aim for.

- **Ray Casting:** I implemented a voxel-based ray casting system using a technique similar to the digital differential analyzer (DDA) used in classic games like Wolfenstein3D and games like Minecraft. This allows players to efficiently place and interact with blocks in the game.

- **JSON-Based Block Definition:** I refactored the block internals to follow a JSON-based definition system, similar to Minecraft. This allows blocks to inherit properties from parent blocks, making it easier to manage and customize them.

{{< img-link "/images/devlogStills/neonForge/devlog1/Snag_d11ddfe.png" "Raycasting" >}}

- **Pixel Art Tool:** I invested in a new tool specialized in creating pixel art textures, which helps produce reliable low-res textures. This tool also supports generating multiple variations of a texture, making it easier to create diverse visual elements.

{{< img-link "/images/devlogStills/neonForge/devlog1/Snag_d11fcd0.png" "Pixel Art tools" >}}

### Future Plans

Moving forward, I plan to:

- Implement a chunk manager to handle an unlimited number of chunks.
- Develop multiblock machines that can be upgraded and maintained even when placed on chunk borders.
- Optimize light calculations and explore animation possibilities for machines.
- Continue refining gameplay mechanics and ensure everything works smoothly in VR.

Thank you for joining me on this journey. I’m excited to share more updates and progress on NeonForge in future devlogs. Stay tuned!

Happy Coding! 🚀
