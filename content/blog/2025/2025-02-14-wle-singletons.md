---
id: 20250214
draft: false
title: Using Singletons in Wonderland Engine
date: 2025-02-14T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20250214
permalink: /2025/02/wlesingletons/
categories:
  - Wonderland Engine
tags:
  - Wonderland Engine
  - Architecture
images:
  - /images/2025/02/neonforgevr-screenshot.png
---

Hello Coders! 👾

Singletons are a common design pattern used to make a class only have one instance and provide an easy point of access to it. In game development, this can be particularly useful for managing game states, configurations, or other resources that need to be accessed throughout. This tutorial will guide you through creating a singleton component for use in Wonderland Engine.

## What is a Singleton?

A Singleton is a design pattern that restricts the instantiation of a class to one single instance. This single instance is then shared across the game, providing a global point of access to it. This can be useful for managing shared resources or maintaining a consistent state across your game's codebase.

## Why Use Singletons?

Singletons provide several advantages in (web) game development. They offer a centralized and global access point to shared resources, making it easy to manage and access these resources from any part of your game. They guarantee that only one instance of a component or class exists, which is particularly useful for managing global states like configuration settings or user sessions. Additionally, Singletons are effective for managing resources that should only have a single instance, such as database connections, logging services, and configurations, helping to optimize performance and reduce redundancy.

However, Singletons also come with drawbacks. They can introduce hidden dependencies between different parts of the game, making the code harder to understand and maintain. Changes in the Singleton class can have unexpected ripple effects throughout the game. Testing can also be challenging, as Singletons introduce global state that can affect multiple tests, and mocking or stubbing Singleton instances for testing purposes can be cumbersome and error-prone. Not really applicable to web development, but in multi-threaded environments, Singletons can cause concurrency issues if not implemented correctly, requiring proper synchronization mechanisms to ensure thread safety. Finally, over-reliance on Singletons can lead to tightly coupled code, reducing flexibility and making it harder to refactor or extend the game. This can also hinder the ability to reuse components in different contexts.

Understanding these pros and cons is very important for making informed decisions about when and how to use Singletons in your web development projects.

## Practical Examples

Before we look at an example implementation, let me give you a few examples of how I often use singeltons in my games:

Unlock Manager: Manages the unlock status of buildings or features in a game. This ensures that the unlock status is consistent and accessible from any part of the game.
Game Settings: A Singleton can be used to manage game settings such as volume, graphics quality, and control preferences, ensuring that these settings are consistent throughout the game.
Audio Manager: Manages audio playback, such as background music and sound effects, ensuring that only one instance controls the audio.
Score Manager: Keeps track of the player's score and high scores, providing a consistent way to update and access the score across different game levels.
Texture Manager: To have access to different textures in parts of a game that do not have direct access to Wonderland Engine, like UI elements, I often set up a singleton as an intermediary container.

{{< img-link "/images/2025/02/neonforgevr-screenshot.png" "NeonForge VR Work in progress screenshot" >}}

## Implementing a Singleton in Wonderland Engine

Let's use a (very simplified) practical example from a game I'm currently working on, NeonForge VR. Here's the code for the GameFlowController Singleton:

```typescript
import {Component, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {UnlockManager} from '../game/UnlockManager.js';
import {BuildingTypes} from '../enums/BuildingTypes.js';

export class GameFlowController extends Component {
    static TypeName = 'game-flow-controller';

    // Singleton
    private static _instance: GameFlowController;
    static get instance(): GameFlowController {
        return GameFlowController._instance;
    }

    init() {
        if (GameFlowController._instance) {
            console.error('There can only be one instance of GameFlowController Component');
        }
        GameFlowController._instance = this;
    }

    start() {
        UnlockManager.instance.unlock(BuildingTypes.MINER);
        UnlockManager.instance.unlock(BuildingTypes.BELT);
    }

    goToNextStage(){
        // some nice implementation
    }

    restartGame(){
        // restart the game
    }
}
```

## Code Explanation

There are a couple of key elements in creating a singleton component.

There is a _private static property_ called `_instance`. This property that holds the Singleton instance of the component.
Then there is a _static getter method_ that returns the Singleton instance. This is how you get access to the component from other places in your game.
In the _init method_, we check if an instance of the GameFlowController already exists. If it does, we log an error. Otherwise, we set the `_instance` property to `this`, making the current Component instance the Singleton instance.

## Using the Singleton

To use the Singleton in your Wonderland Engine project, simply attach the Singleton component to an object in your scene. I often group them together on objects and name the objects something useful so I know what is there when looking at the hierarcy tree.

{{< img-link "/images/2025/02/Singletons-in-wl.png" "Singletons in Wonderland Editor" >}}

If you need to call something in a singleton, you just use the static `instance` property. For example:

```typescript
    GameFlowController.instance.goToNextStage();
```

### Conclusion

Singletons are a powerful design pattern for managing shared resources and maintaining a consistent state across your game. By following this tutorial, you should now have a good understanding of how to implement and use Singletons in Wonderland Engine.

Feel free to expand on this basic example by adding more functionality to your Singleton Component, such as managing game states, configurations, or other global resources.

Additionally, if you're using Visual Studio Code, you can quickly scaffold Wonderland Engine components with the help of my VSCode extension, which includes code snippets. You can find it at <https://github.com/sorskoot/WonderlandSnippets> or search for 'WonderlandSnippets' inside VSCode.

Happy Coding! 🚀

{{< img-link "/images/2025/02/vscode-codesnippets.png" "vscode codesnippets extension" >}}
