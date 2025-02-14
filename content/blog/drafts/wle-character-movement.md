---
id: 20250213
draft: true
title: Wle Character Movement
date: 2025-02-13T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20250213
permalink: /2025/02/wlecharactermovement/
categories:
  - 
tags:
  - 
images:
  - /images/2025/02/??.png
---

Hello Coders! 👾

### Creating Character Movement in Wonderland Engine

In this blog post, we will explore how to create a simple character movement system in Wonderland Engine. This will include setting up basic movement, adding animations, and ensuring smooth transitions between different states.
Inspiration for this tutorial comes from [CodeMonkey](https://www.youtube.com/@CodeMonkeyUnity)'s great tutorials for Unity. Let's get started!

#### Setting Up the Scene

First, let's set up our scene. We'll have a character playing a default idle animation. In Wonderland Engine, we'll use a base character class that exposes functions to play the animations we need, such as walking and idle animations. These functions will take a vector for the animation direction. This base class acts as the connection between the logic and the visuals. <IMAGE>

It's important to write code that is decoupled from other systems. This way, the movement logic uses these functions without being concerned about how they are implemented. We could switch to a different animation system, and as long as these functions do the same thing, everything would work just the same.

#### Creating the Character Script

Now, let's create our character script. We'll make a new TypeScript script and call this the "Player Character." We'll place the script on the Player Character game object, which already has the base as another component.

In the script, the first thing we'll do is create a private function to initialize and grab a reference to the base class that is on the same game object. This will allow us to access all of our animations. <CODE>

#### Implementing Basic Movement

Next, we'll implement basic movement in our update function by testing for keyboard input. We'll use W, A, S, and D as our movement keys. By using `GetKey`, we can detect when a key is pressed and held, allowing continuous movement.

To keep things simple, we'll modify the character's position based on the input keys. We'll multiply this by a speed variable and `Time.deltaTime` to ensure frame rate-independent movement. <CODE>

Let's test it out to ensure our character moves in all directions: up, down, left, and right.

#### Handling Diagonal Movement

There's a hidden issue: moving diagonally causes the character to move faster than in a single direction. This happens because the vector created from both X and Y inputs has a magnitude greater than one. To fix this, we need to normalize the vector to ensure its magnitude is always 1. <CODE>

With this adjustment, our character's movement speed will be consistent in every direction.

#### Adding Animations

Now that we have basic movement working, let's add animations to our character. We'll create a boolean to identify if the character is idle and play the appropriate animation based on the movement state. If the character is idle, we'll play the idle animation; otherwise, we'll play the walking animation. <CODE>

#### Fixing Idle Animation Direction

We encountered a tiny issue: when the character stops moving, the idle animation direction may not be correct. To fix this, we'll store the last movement direction and use it as the idle animation direction. This way, the character will look in the correct direction when stopping. <CODE>

#### Conclusion

There you have it! We set up a simple character movement system in Wonderland Engine. Our character can now move around and play walking or idle animations. This basic setup can be expanded with more complex animations and movement logic as needed.

As always, if you have any questions, feel free to post them in the comments. Happy coding! 🚀

<IMAGE>

---
*Inspired by CodeMonkey's [tutorial](https://www.youtube.com/watch?v=HQb-zzjyvcQ) on character movement in Unity.*
