---
id: 20240318
draft: false
title: Tile Selection and World Generation
date: 2024-03-18T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20240318
permalink: /2024/03/2024-03-18-LiveStream/
categories:
  - FarmingValley
images:
  - /images/FarmingValleyStreamStart.jpg
---
Hello Coders! 👾

In our latest live stream, we made significant progress on "Farming Valley," the cozy VR game I am building with the Wonderland Engine. We are shaping the world generation and experimenting with tile selection for a more interactive experience. Let's dive into the details!

## Stream Recap

Last week, we got the project off the ground, and this session brought a mix of troubleshooting and new feature implementation. We decided against using HDRIs from the nightly version of the Wonderland Engine for now to avoid complications with our day-night cycle implementation.

{{< img-link "/images/devlogStills/fv_20240318_videoframe_442819.png" "Game in WLE" >}}

### Shader Challenges

We faced challenges with the 16x16 textures—upscaled to 64x64 for better clarity. However, with larger textures, mipmap generation in Wonderland Engine didn't work as expected, leading to pixelated visuals from a distance. We're leaving this as is for the moment and may add a green fog as a temporary visual fix.

### Library Additions

During the stream, we added several libraries to our project:
- My own component library, which is open-source and hopefully compatible with the latest engine versions.
- RxJS for reactive programming, crucial for tracking in-game state changes.
- TweenJS for smooth animations and transitions.

These additions pave the way for robust state management and better player interaction feedback in our game.

### Tile Selection and World Generation

The main focus was on world generation using two specific textures to switch between when clicking a tile. We aim for a dynamic tile switching mechanism that lays the foundation for gameplay interactions like planting and harvesting. 

By adding a cursor object to the right controller and using raycasting, we managed to project a blue marker onto the ground tiles, providing visual feedback on tile selection. This sets the stage for future features like object interaction and teleportation within the game world.

{{< img-link "/images/devlogStills/fv_20240318_videoframe_5909262.png" "Game in VR" >}}

### Development Philosophy

As the stream progressed, we discussed the importance of using TypeScript for larger game projects due to its robustness in handling complex codebases. I also shared my experiences with converting JavaScript code to TypeScript, which revealed subtle bugs and ultimately resulted in more stable gameplay.

### Community and Learning

I mentioned my game development course, which is nearing completion, and the plans to deploy a game on itch.io as part of the curriculum. This educational journey will soon earn me an official certification as a game developer.

## Conclusion

In this session, we experimented with different aspects of our cozy VR game, from visual elements to interactive functionality. We're building a strong foundation for "Farming Valley" that players will be able to enjoy in a fully immersive VR environment. Stay tuned for more updates, and don't forget to subscribe to the channel for future streams!

Happy coding! 🚀

{{< youtube VzyWbf8AJCY >}}