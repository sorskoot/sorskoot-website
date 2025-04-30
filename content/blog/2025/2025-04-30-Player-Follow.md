---
id: 20250430
draft: false
title: Smooth Camera Follow
date: 2025-04-30T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20250430
permalink: /2025/04/PlayerFollow/
categories:
  - Wonderland Engine
tags:
  - Wonderland Engine
  - Game Development
images:
  - /images/2025/04/camera-follow-title.png
---

Hello Coders! 👾

In this short tutorial, I'll show you how I created a smooth camera follow component for my [GameDev.js 2025 jam entry](https://sorskoot.itch.io/equilibrium) I made [with Wonderland Engine](https://wonderlandengine.com/). This component smoothly moves the camera to follow the player character, keeping a consistent distance and height offset. I used it specifically in a platformer game, so the camera angle is limited to one direction. You might want to adjust it if you're using it in a different type of game or need more flexibility.

The full source code for the game, including this component, is available on [GitHub](https://github.com/sorskoot/GameDevJS2025).

## The Component

Here's the entire code of the `PlayerFollow` component:

```typescript
import { Component, Object3D } from '@wonderlandengine/api';
import { property } from '@wonderlandengine/api/decorators.js';
import { vec3 } from 'gl-matrix';

/**
 * Reusable vectors for camera following calculations
 * These are created outside the component to avoid allocations during updates
 */
const tempPos = vec3.create();
const targetPos = vec3.create();
const currentPos = vec3.create();
const lerpedPos = vec3.create();

/**
 * Component that makes an object (typically a camera) smoothly follow the player
 * Maintains a constant distance and height offset while using interpolation for smooth movement
 */
export class PlayerFollow extends Component {
    static TypeName = 'player-follow';

    /**
     * The player object to follow
     */
    @property.object({ required: true })
    player!: Object3D;

    /**
     * Target distance to keep from the player on the Z axis
     */
    @property.float(10.0)
    distance = 10.0;

    /**
     * Speed factor for interpolation movement
     * Higher values make the camera follow more quickly
     */
    @property.float(1.0)
    speed = 1.0;

    /**
     * Vertical offset above the player's position
     */
    @property.float(4.0)
    height = 4.0;

    /**
     * Validates that required properties are set
     * Throws an error if the player object is not assigned
     */
    start() {
        if (!this.player) {
            throw new Error(
                'player-follow: Player object property is not set.'
            );
        }
    }

    /**
     * Updates the follower's position each frame to track the player
     * Uses linear interpolation for smooth movement
     * @param dt Delta time in seconds since last update
     */
    update(dt: number) {
        if (!this.player) {
            return; // Should not happen if start check passes, but good practice
        }

        // 1. Get player's position
        this.player.getPositionWorld(tempPos);

        // 2. Calculate target position with fixed offset
        // targetPos = playerPos + offset
        // Assuming player moves along X/Y plane, camera stays offset on Z
        targetPos[0] = tempPos[0]; // Follow player's X
        targetPos[1] = tempPos[1] + this.height; // Follow player's Y + height offset
        targetPos[2] = tempPos[2] + this.distance; // Maintain fixed Z distance relative to player

        // 3. Get current follower position
        this.object.getPositionWorld(currentPos);

        // 4. Lerp current position towards target position
        const lerpFactor = Math.min(this.speed * dt, 1.0); // Clamp lerp factor
        vec3.lerp(lerpedPos, currentPos, targetPos, lerpFactor);

        // 5. Set the new position
        this.object.setPositionWorld(lerpedPos);
    }
}
```

The main idea of this component is simple: each frame, it calculates where the camera should ideally be based on the player's current position plus some offsets. Then it smoothly moves the camera towards this ideal position using linear interpolation (`vec3.lerp`). This prevents sudden jumps and makes the camera movement feel natural and polished.

## Using the component

In Wonderland Editor, select your camera object and add the `player-follow` component to it. Drag the object you want to follow, probably the player, to the `player` property.

The screenshot below is from my game. I added the camera itself to a child of the object to have a little bit more control, for example over the rotation. I ended up not needing this.

{{< img-link "/images/2025/04/camera-follow.png" "Camera follow component in Wonderland Editor" >}}

## Configure the Component

The component has four main properties you can tweak:

- **Player**: The object your camera should follow. Don't forget to assign your player object here.
- **Distance**: How far behind the player your camera stays.
- **Height**: How high above the player your camera hovers.
- **Speed**: How fast your camera moves to catch up with the player.

You'll need to play around with these settings in the editor until it _feels_ just right.

## Wrap

That's it! With these simple steps, you've added a smooth and professional-looking camera follow behavior to your Wonderland Engine game. Go ahead and experiment to find the perfect feel for your project.

If you have any questions or want to share your own experiences with Wonderland Engine, feel free to reach out or leave a comment below. I'd love to hear how it works out in your projects!

Also, don't forget to check out my [GameDev.js 2025 jam entry](https://sorskoot.itch.io/equilibrium) to see this component in action. The complete source code is also available on [GitHub](https://github.com/sorskoot/GameDevJS2025).

Happy Coding! 🚀

{{< img-link "/images/2025/04/camera-follow-title.png" "A robot camera following a player" >}}
