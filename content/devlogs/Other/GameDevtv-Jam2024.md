---
id: 20240610
draft: false
title: WebXR Game for the GameDev.TV Jam
date: 2024-05-10T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20240610
permalink: /2024/03/2024-06-10-GameDevTV/
categories:
  - GameJam
images:
  - /images/2024/06/lastStand-screenshot1.png
---

Hello Coders! 👾

This blog post details my journey through the development process of a small WebXR game for the GameDev.TV game jam called [Last Stand!](https://sorskoot.itch.io/last-stand). I wanted to create a simple proof of concept, with a nostalgic style of PSX/PS1 games. A project aimed to combine retro aesthetics with modern game development techniques.

{{< youtube OpFQ3efKfxo >}}

## Idea and Inspiration

The initial concept was to create a game similar to one of my older (still unfinished 🙄 games) [Sorskoots House of the Dead](https://heyvr.io/arcade/games/sorskoots-house-of-the-dead) but with some updated capabilities of current VR technology. I'm not a great material artist, so I like to create a pixelated look, perfect for the trends with PSX-style games.

## Light Baking

Since I worked on House of the Dead, Wonderland Engine has gone through some great updates. One of the things that is improved is how to use baked lighting with light maps. I tried baking lights in Unity first and exporting those to WLE, but that didn't give good results. So I switched back to light map baking using Blender. This decision significantly improved the lighting quality and added depth to the scenes. Although it required additional adjustments in Wonderlands Engine, particularly with materials, but the end-results justified the effort, bringing a visually appealing environment to the game.

{{< img-link "/images/2024/06/lastStand-Blender.png" "Blender" >}}

## Models and Assets

I had some trouble finding a suitable CC0 gun model. So, I created a custom gun model in Blender using some photos of the real gun as a reference. This allowed for greater control over the aesthetic and functionality suited for VR interaction.
To save time and maintain visual coherence, I reused the zombie model I had previously designed for House of the Dead.

{{< img-link "/images/2024/06/lastStand-Gun.png" "Gun model" >}}

## Sound and Shooting Mechanics

The integration of sound effects and music was crucial in bringing the game world to life. Implementing the shooting mechanics, complete with state management, provided a solid foundation for the gameplay. This stage was pivotal in transitioning the project from a mere visual demo to an interactive game. To make it easy for myself I used the [spatial audio packaged](https://www.npmjs.com/package/@wonderlandengine/spatial-audio) for Wonderland Engine.

## User Interface and Final Features

In the past, it was quite challenging to create a user interface in VR. But, with this game, I was lucky since a development version of a [React-based 3D UI system](https://www.npmjs.com/package/@wonderlandengine/react-ui) was just released.

As the deadline approached, I focused on refining the user interface and finalizing the most essential game features. I created a continuous stream of zombies spawning to keep the game challenging. And, I made some VR-specific UI enhancements so that an adaptive text prompts users to switch to VR mode when necessary.

{{< img-link "/images/2024/06/lastStand-screenshot1.png" "User Interface" >}}

## Submission and Reflections

The final hours before submission were dedicated to polishing the main game loop and preparing a submission package, including a gameplay video due to the VR nature of the game. Reflecting on this project, I've gained deeper insights into VR game development and the importance of adaptive workflow techniques.

{{< img-link "/images/2024/06/lastStand-screenshot3.png" "Screenshot 3" >}}

## Future Plans

During the jam, I was planning to enhance the game afterward. Maybe by introducing progressive difficulty levels, adding more interactive zombie behaviors, or creating diverse spawning points. The idea of defending various locations within a house could also add an exciting layer to the gameplay.

But now that I'm reflecting on what I created in 1 week I think I should apply this knowledge to a revival of Sorskoot's House of the Dead.

## Conclusion

Participating in the GameDev.TV game jam was a short, but exciting journey, pushing my boundaries of creativity and technical skill in WebXR game design and development. Stay tuned for more on this...In the meantime, you can play this game here => [Last Stand!](https://sorskoot.itch.io/last-stand)

Happy Coding! 🚀

{{< img-link "/images/2024/06/lastStand-CoverImage.png" "Cover Image" >}}
