---
id: 20240313
draft: false
title: Teleportation 
date: 2024-03-23T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20240323
permalink: /2024/03/2024-03-23-LiveStream/
categories:
  - FarmingValley
images:
  - /images/FarmingValleyStreamStart.jpg
---

Hello Coders! 👾

In our latest live stream, we've made some substantial progress on our cozy VR farming game, Farming Valley. Let's dive into the updates and the behind-the-scenes technical tinkering that took place.

## Improved World Generation

Previously, we concluded our stream with a singular patch of grass, but since then, I've implemented a more robust world generation system. We now have a 50x50 tile array filled with objects that, for the time being, display as random colorful tiles. It's a temporary measure to give us a starting point for further development.

{{< img-link "/images/devlogStills/fv_20240323_videoframe_223845.png" "Random tiles" >}}

## Tile Interaction

A significant focus for today was enhancing tile interaction. I aimed to implement a feature that allows changing a tile upon clicking. This addition is part of our efforts to make the farming experience more interactive and engaging.

## VR Teleportation Mechanics

We've also begun refining our VR teleportation mechanics. While the game will primarily function in VR, we're temporarily allowing desktop movement for testing purposes. However, the final game will likely be VR-exclusive for the full immersive experience.

During the stream, I showcased the current VR interaction, where pointing and triggering on a tile reveals a visual target. There's a small bug where the player moves while dragging the screen, which shouldn't happen, so that's on our fix list.

## GameState and Game Component

I've started structuring our `GameState` as a class with an interface `GameStateBase`. This setup will help us manage different game states more effectively, such as the main menu and in-game phases.

## Teleport Component Reuse

I revisited a teleport component I built for a previous project, planning to adapt it for Farming Valley. The idea is to have specific tiles that the player can teleport to, enhancing the VR experience's realism.

## Random Tile Generation

I've employed a custom random number generator for tile generation, which has the nifty feature of being seeded. This means we can reproduce the same sequence of 'random' numbers for consistent testing and gameplay experiences.

## Future Implementations

- Crops and Cards: All crops will likely inherit from a `CropBase` class, and I've initiated a 'deck of cards' mechanic where players will interact with their hands of cards, such as seeds, animals, or tools. It's a concept still in the works.

- Tool Progression: Players will start with basic tools (like a simple watering can) and can upgrade to more advanced tools over time, adding a progression system to the game.

{{< img-link "/images/devlogStills/fv_20240323_videoframe_7246258.png" "Debugging" >}}

## Wrapping Up

That's all for today's stream summary. As you can tell, we're gradually shaping Farming Valley into a game that's as delightful to play as it is cozy. There's still plenty to do, but each stream gets us closer to our charming VR farming experience.

Happy coding! 🚀

{{< youtube GDw9R2PvpKw >}}