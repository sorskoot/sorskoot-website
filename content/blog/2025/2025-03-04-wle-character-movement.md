---
id: 20250304
draft: False
title: Basic Character Movement
date: 2025-03-04T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20250304
permalink: /2025/03/wlecharactermovement/
categories:
  - Wonderland Engine
tags:
  - Wonderland Engine
  - Components
images:
  - /images/2025/03/Snag_55e4a9e6.png
---

Hello Coders! 👾

In this blog post, we will explore how to create a simple character movement system in Wonderland Engine. This will include setting up basic movement, adding animations, and switching between different states. The complete example project can be found at the [GitHub Repository](https://github.com/sorskoot/BasicCharacterMovement).

Inspiration for this tutorial came from [CodeMonkey](https://www.youtube.com/@CodeMonkeyUnity)'s great tutorials for Unity. Let's get started!

#### Setting Up the Scene

First, let's set up our scene. For this demo I've used the Hooded Rogue from the [Adventurers pack]( https://kaylousberg.itch.io/kaykit-adventurers) from KayKit. This comes with various animation we can use. I just placed this in the assets folder, draged/dropped the character into the editor to a `Player` object and set up the materials. I also added a couple of tiles for the character to walk on. These do nothing, and are only there as a visual. For this tutorial I'll assume you know how to do these things. Let me know in the comments if anyone needs help with that, I'll gladly do a tutorial specifically on that.

We'll have the character playing a default idle animation. When the player is moving we switch to the run animation and back to idle when the player stops. Before we can actually do that, we need to create a component script.

{{< img-link "/images/2025/03/Snag_55e4a9e6.png" "Hooded character" >}}

#### Creating the Character Script

We'll make a new TypeScript script and call this the "Player Character." We'll place the script on the Player Character game object. To easily scaffold a component, have a look at my [VSCode extension](https://marketplace.visualstudio.com/items?itemName=Sorskoot.wonderlandsnippets) for Wonderland Engine. This comes with a couple of snippets that make this very simple.

In the script, the first thing we'll do is implement the `start` function to grab a reference to the animation objects (the object with the animation component) that is a few steps down in the hierarchy. This will allow us to change the animation. It could be that the object has an animation component per animation of the object. We need to remove all except one, since we won't need more then one.

```TypeScript
import {
    AnimationComponent,
    Component,
    Object3D,
    Animation,
} from '@wonderlandengine/api';
import { property } from '@wonderlandengine/api/decorators.js';

enum playerState {
    init,
    idle,
    walking,
    running,
}

export class PlayerCharacter extends Component {
    static TypeName = 'player-character';

    @property.float(1.0)
    speed = 1.0;

    @property.animation()
    idle: Animation;

    @property.animation()
    run: Animation;

    @property.object({ required: true })
    animationRoot!: Object3D;

    private _animationComponent: AnimationComponent;
    private _characterState: playerState = playerState.init;
    private _lastAngle: number = 0;

    init() {}

    start() {
        this._animationComponent =
            this.animationRoot.getComponent(AnimationComponent)!;
    }

    update(dt: number) {
        this._handleInput(dt);
    }

    private _handleInput(dt: number) {
        /// TODO...
    }
}
```

{{< img-link "/images/2025/03/Snag_55dea417.png" "Character object in Wonderland Engine" >}}

#### Implementing Basic Movement

Next, we'll implement basic movement in our update function by testing for keyboard input. We'll use W, A, S, and D as our movement keys. I'm using a few classes here that I copy from project to project for keyboard input. [Feel free to use these in your projects too](https://github.com/sorskoot/BasicCharacterMovement/blob/master/js/components/input/keyboard-controller.ts). This can be accessed through a [singleton](https://timmykokke.com/blog/2025/2025-02-14-wle-singletons/) in the update loop to get the current state of specific keys. By using `GetKey`, we can detect when a key is pressed and held, allowing continuous movement.

To keep things simple, we'll modify the character's position based on the input keys. We'll multiply this by a speed variable and `deltaTime` parameter of the `update` method to ensure frame rate-independent movement. To keep the code clean I placed all of this in a separate private method.

First, we have to create a few vectors to use. Since we're going to do some calculations in the update loop we do not want to create these every frame. Creating vectors every frame can hurt performance so it's best to create them outside the class and reuse them. Just keep in mind you can't trust the values outside of the update loop, since everyone can change them.

```TypeScript
const moveVec3 = vec3.create();
const posVec3 = vec3.create();
const rotQuat = quat.create();
const quatIdentity = quat.identity(quat.create());
```

Now for handling the input, and moving the character. When a key is pressed, we set an X or Y value to 1 or -1 to tell the calculation which direction we want to move. To make sure the speed stays equal in every direction, even diagonally, we create a vector and normalize that. This means that the length of that vector is always 1. Then we scale that vector by the speed and the delta time value. By scaling by delta time we ensure the speed is consistent even if the time a frame takes to render is not.

```TypeScript
  private _handleInput(dt: number) {
        let moveX = 0;
        let moveY = 0;

        if (InputManager.getKey(KeyType.Up)) {
            moveY = -1;
        }
        if (InputManager.getKey(KeyType.Down)) {
            moveY = 1;
        }
        if (InputManager.getKey(KeyType.Left)) {
            moveX = -1;
        }
        if (InputManager.getKey(KeyType.Right)) {
            moveX = +1;
        }

        vec3.normalize(moveVec3, [moveX, 0, moveY]);
        vec3.scale(moveVec3, moveVec3, this.speed * dt);

        // rotate character if needed
        // move character
    }
```

Next we want to rotate the character, if it's not in the correct direction. To do this we need to calculate the angle:

```TypeScript
const angle = Math.atan2(-moveY, moveX);
```

`Math.atan2(y, x)` is a function that returns the angle in radians between the positive X-axis and the point (x, y). The `-moveY` and `moveX` we set earlier of the movement direction (although we invert the Y). As a result, the direction the character should be facing is based on the movement input.

Then we check if the angle has changed. If the calculated angle is different from the last angle the character was facing (`this._lastAngle`) we need to update this. This ensures that the rotation code only runs when the direction has actually changed. When it needs to be updated we do so.

```TypeScript
    this._lastAngle = angle;
    quat.rotateY(rotQuat, quatIdentity, angle + Math.PI / 2);
    this.object.setRotationWorld(rotQuat);
```

`this._lastAngle = angle;` updates the last angle to the current angle so future checks can be accurate.
`quat.rotateY` rotates the Identidy quat around the Y-axis and stores the result in `rotQuat` we defined earlier. Because of the way the character is facing by default we need to rotate it an extra 90 degries, which happens to be `Math.PI / 2` in radians.
Then we set the rotation of the object using the `rotQuat` value.

```TypeScript
    this.object.getPositionWorld(posVec3);
    vec3.add(posVec3, posVec3, moveVec3);
    this.object.setPositionWorld(posVec3);
```

Combining all of the above, this is what we have so far for the `_handleInput` method:

```TypeScript
    private _handleInput(dt: number) {
        let moveX = 0;
        let moveY = 0;

        if (InputManager.getKey(KeyType.Up)) {
            moveY = -1;
        }
        if (InputManager.getKey(KeyType.Down)) {
            moveY = 1;
        }
        if (InputManager.getKey(KeyType.Left)) {
            moveX = -1;
        }
        if (InputManager.getKey(KeyType.Right)) {
            moveX = +1;
        }

        vec3.normalize(moveVec3, [moveX, 0, moveY]);
        vec3.scale(moveVec3, moveVec3, this.speed * dt);

        const angle = Math.atan2(-moveY, moveX);
        if (angle != this._lastAngle) {
            this._lastAngle = angle;
            quat.rotateY(rotQuat, quatIdentity, angle + Math.PI / 2);
            this.object.setRotationWorld(rotQuat);
        }

        this.object.getPositionWorld(posVec3);
        vec3.add(posVec3, posVec3, moveVec3);
        this.object.setPositionWorld(posVec3);
    }
```

#### Adding Animations

Now that we have basic movement working, let's add animations to our character. We'll use the `playerState` enum to identify if the character is idle or play the appropriate animation based on the walking state. If the character is idle, we'll play the idle animation; otherwise, we'll play the walking animation. Make sure to select the animations on the component in Wonderland Editor.

{{< img-link "/images/2025/03/Snag_5b04968f.png" "Assign animations in Wonderland Editor" >}}

To check if the player is idle, we can simply validate that there is no movement on X and no movement on Y. If the character is idle and it was not Idle before, we modify the state to Idle and set the animation to the idle animation. Otherwise, we move the character like before, and if the character was not moving, we set the animation to the running animation.

```TypeScript
    let isIdle = moveX == 0 && moveY == 0;
    if (isIdle) {
        if (this._characterState != playerState.idle) {
            this._characterState = playerState.idle;
            this._animationComponent.animation = this.idle;
            this._animationComponent.play();
        }
    } else {

        // Player movement code from previous steps

        if (this._characterState != playerState.running) {
            this._animationComponent.animation = this.run;
            this._animationComponent.play();
            this._characterState = playerState.running;
        }
    }
```

#### Conclusion

There you have it! We set up a simple character movement system in Wonderland Engine. Our character can now move around and play walking or idle animations. This basic setup can be expanded with more complex animations and movement logic as needed. The complete example project can be found at the [GitHub Repository](https://github.com/sorskoot/BasicCharacterMovement).

As always, if you have any questions, feel free to post them in the comments. Happy coding! 🚀

---

#### Complete component

```TypeScript
import {
    AnimationComponent,
    Component,
    Object3D,
    Animation,
} from '@wonderlandengine/api';
import { property } from '@wonderlandengine/api/decorators.js';
import { InputManager, KeyType } from './input/InputManager.js';
import { quat, vec3 } from 'gl-matrix';

const moveVec3 = vec3.create();
const posVec3 = vec3.create();
const rotQuat = quat.create();
const quatIdentity = quat.identity(quat.create());

enum playerState {
    init,
    idle,
    walking,
    running,
}

export class PlayerCharacter extends Component {
    static TypeName = 'player-character';

    @property.float(1.0)
    speed = 1.0;

    @property.animation()
    idle: Animation;

    @property.animation()
    run: Animation;

    @property.object({ required: true })
    animationRoot!: Object3D;

    private _animationComponent: AnimationComponent;
    private _characterState: playerState = playerState.init;
    private _lastAngle: number = 0;

    init() {}

    start() {
        this._animationComponent =
            this.animationRoot.getComponent(AnimationComponent)!;
    }

    update(dt: number) {
        this._handleInput(dt);
    }

    private _handleInput(dt: number) {
        let moveX = 0;
        let moveY = 0;

        if (InputManager.getKey(KeyType.Up)) {
            moveY = -1;
        }
        if (InputManager.getKey(KeyType.Down)) {
            moveY = 1;
        }
        if (InputManager.getKey(KeyType.Left)) {
            moveX = -1;
        }
        if (InputManager.getKey(KeyType.Right)) {
            moveX = +1;
        }

        let isIdle = moveX == 0 && moveY == 0;
        if (isIdle) {
            if (this._characterState != playerState.idle) {
                this._characterState = playerState.idle;
                this._animationComponent.animation = this.idle;
                this._animationComponent.play();
            }
        } else {
            vec3.normalize(moveVec3, [moveX, 0, moveY]);
            vec3.scale(moveVec3, moveVec3, this.speed * dt);

            const angle = Math.atan2(-moveY, moveX);
            if (angle != this._lastAngle) {
                this._lastAngle = angle;
                quat.rotateY(rotQuat, quatIdentity, angle + Math.PI / 2);
                this.object.setRotationWorld(rotQuat);
            }

            this.object.getPositionWorld(posVec3);
            vec3.add(posVec3, posVec3, moveVec3);
            this.object.setPositionWorld(posVec3);

         if (this._characterState != playerState.running) {
                this._animationComponent.animation = this.run;
                this._animationComponent.play();
                this._characterState = playerState.running;
            }
        }
    }
}

```
