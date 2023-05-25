---
id: 20230525
draft: false
title: RxJS and Wonderland Engine
date: 2023-05-25T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20230525
permalink: /2023/05/RxJSandWonderlandEngine/
categories:
  - WebXR  
tags:
  - Wonderland

---
# Reacting to State Changes in My Games

Hello fellow devs! Let's talk about the latest updates in [Wonderland Engine 1.0.0](https://wonderlandengine.com/) and how it affects the architecture of my games. I'll be using my game [Storage Space 13](https://heyvr.io/game/storage-space-13) as an example throughout this post.

## RxJS for Reactive Programming

I use [RxJS](https://rxjs.dev/) for all my games - it's a library that makes it easier to compose asynchronous or callback-based code using Observables. 

## Global Object for State Management

Previously, I had a state object in the global scope. Now, with the added ability to use JavaScript classes and modules, I changed this approach by creating a constant global object that is reused throughout the game. This object contains references to one or more state objects and other necessary items like sound effects and music players. Here's an example from Storage Space 13:

```javascript
import { GameState } from "./classes/gameState";
import { LevelState } from "./classes/levelState";
import { SoundfxPlayer } from "./utils/soundfx-player";
import { MusicPlayer } from "./utils/music-player";

const StorageSpace13 = {
  gameState: new GameState(),
  levelState: new LevelState(),
  soundFxPlayer: new SoundfxPlayer(),
  musicPlayer: new MusicPlayer(),
  particlePool: null,
};

export default StorageSpace13;
```

This global object can now be reused anywhere it is needed throughout the game.

## Responding to State Changes

Let's take a closer look at `GameState`, specifically focusing on the `isInVR` property, which can be useful in any VR game. But, I use the same construction for pretty much all properties in the state of my game. Whether this is the current status, number of lives a player has left, the current level, of if the light is on or off. Everything that has anything to do with the state of a game is in this *State* class or in a *sub-state* class. Here's a snippet of the code I use in all my games:

```javascript
import { Subject } from 'rxjs';

export class GameState {

    constructor(){
        this.isInVRSubject = new Subject();
    }
	
    #isInVR = false;
    set isInVR(value) {
        this.#isInVR = value;
        this.isInVRSubject.next(value);
    }
    get isInVR() {
        return this.#isInVR;
    }
}
```

In this example, I've removed everything except the `isInVR` state. In the constructor, a subject is defined - this is what we use to monitor changes on the property and make things *reactive*. To notify everyone watching the subject that it has changed, I need to call the `next` function on the subject. This is done in the setter of the `isInVR` property. Using a private backing field internally allows me to store the actual value and only send an update when something changes.

## Setting the State from Game Components

Now let's take a look at how we use the state. As an example, I'm using my `game-component`. Every game has one of these 😁! This component handles the main game things that need to be connected to the Wonderland Engine, such as keeping track of whether we are in VR or not. I handle the onXRSessionStart and onXRSessionEnd events here and set the state accordingly.

```javascript
import { Component } from "@wonderlandengine/api";
import StorageSpace13 from "./globals";

export class Game extends Component {
  static TypeName = "game";
  static Properties = {
  }
  
  init() {
    ...
    this.engine.onXRSessionStart.add(
      () => (StorageSpace13.gameState.isInVR = true)
    );
    this.engine.onXRSessionEnd.add(
      () => (StorageSpace13.gameState.isInVR = false)
    );
    ...
  }
  
}
```

## Watching Changes on the State

The last thing is to watch changes on the state. Anywhere else in the app, we can just subscribe to these changes.

```javascript
StorageSpace13.gameState.isInVRSubject.subscribe(isInVR => {
	if(isInVR){
		// do something that can only be done in VR
	} else{
		// we're not in VR.
	}
}
```
There are some more things you can do insteam of *just* subscribing, like filtering for specific changes, but that is outside the scope of what I use 99% of the time. If you want to see examples of this let me know down in the comments.


## One More Thing...

There is one more thing I might do. I'm not completely happy with the state being set from the outside; I'd rather do that from inside the *state* classes. This takes a bit more effort but ensures all logic around state is in one place.

And that's it! By following these steps and principles, you can efficiently manage and respond to state changes in your games. 

Happy coding! 🚀