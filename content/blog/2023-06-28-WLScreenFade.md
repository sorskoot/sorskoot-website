---
id: 20230628
draft: false
title: VR Screen Fade in Wonderland
date: 2023-06-28T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20230628
permalink: /2023/06/VRScreenFadeWonderland/
categories:
  - WebXR
tags:
  - Wonderland Engine
  - Component
---

Hello Coders! 🎮 Today, I want to share with you an awesome component I've been working on for the Wonderland Engine. It's a simple yet effective way to fade the screen to black and back in Virtual Reality, which can help prevent motion sickness when teleporting.

## The Magic Behind the Fade 

The magic behind this component actually lies in its use of a mesh that forms an inverted sphere around the player's head. This sphere effectively blocks out the rest of the scene, creating a seamless transition when fading in and out.

Don't worry, you don't have to create this mesh yourself! I've made it available for you to download right here in this blog post, so you can get started with this component in no time.

{{< img-link "/images/2023/06/FadeToBlack_InvertedSphere.png" "InvertedSphere" >}}

## Integrating the Fade Component 

Once you've got your hands on the mesh, you're ready to start integrating the fade component into your project. To do this, we'll take advantage of a nifty pipeline setting in the Wonderland Editor that prevents testing the depth buffer. This way, our fade effect is always rendered on top of everything else.

```TypeScript
import {Component, MeshComponent, Emitter} from '@wonderlandengine/api';
import { Easing, clamp, lerp } from '@sorskoot/wonderland-components';
import { property } from '@wonderlandengine/api/decorators.js';
import { FlatMaterial } from '../types/index.js';

export class FadeScreen extends Component {
    static TypeName = 'fade-screen';

    /**
     * The time it takes to fade in or out.
     */
    @property.float(1)
    fadeInTime:number = 1;

    /**
     * If true, the screen will fade in again after fading out.
     */
    @property.bool(true)
    continuous:boolean = true

    /**
     * Called when the fade in process is completed.
     */
    FadeInCompleted!: Emitter;

    /**
     * Called when the fade out process is completed.
     */
    FadeOutCompleted!: Emitter;

    init() {
        this.FadeInCompleted = new Emitter();
        this.FadeOutCompleted = new Emitter();
    }

    /**
     * The mesh component of the object. This should be a black sphere around the head
     * of the player that fades in and out.
     */    
    mesh!:MeshComponent;

    #isRunning = false;
    #deltaTime = 0;
    #isFadingIn = false;
    #isFadingOut = false;

    start() {
        const mc = this.object.getComponent(MeshComponent);
        if(!mc) throw new Error('No mesh component found on object');
        this.mesh = mc;
        this.mesh.active = false;
    }

    fadeIn() {
        this.mesh.active = true;
        this.#isFadingIn= true;
        this.#isRunning = true;
    }
    fadeOut() {
        this.mesh.active = true;
        this.#isFadingOut = true;
        this.#isRunning = true;
    }

    update(delta:number) {
        if (this.#isRunning) {
            let alpha:number=0;
            if(this.#isFadingIn){
                this.#deltaTime -= delta / this.fadeInTime;
                alpha = clamp(lerp(0, 1, this.#deltaTime, Easing.InQuad), 0, 1);
            }
            if(this.#isFadingOut){
                this.#deltaTime += delta / this.fadeInTime;
                alpha = clamp(lerp(0, 1, this.#deltaTime, Easing.OutQuad), 0, 1);
            }

            // increase or decrease alpha
            
            if(this.#deltaTime >= 1 || this.#deltaTime <= 0){
                this.#isRunning = false;
                this.#isFadingIn = false;
                this.#isFadingOut = false;
                if(this.#deltaTime >= 1){
                    this.#deltaTime = 1;
                    this.FadeOutCompleted.notify();
                    if(this.continuous){
                        this.fadeIn();
                    }
                }else{

                    const flatMaterial = this.mesh.material as FlatMaterial;
                    if (flatMaterial)
                    {
                        flatMaterial.color = [0,0,0,0];
                    }


                    this.#deltaTime = 0;
                    this.FadeInCompleted.notify();
                }
            }
            const flatMaterial = this.mesh.material as FlatMaterial;
            if (flatMaterial)
            {
                flatMaterial.color = [0,0,0, alpha];
            }
        }
    }
};
```

With this in place, our TypeScript component will now have two events - `FadeInCompleted` and `FadeOutCompleted`. By listening for these events, you can execute code when the fading is complete. For example, you could teleport the player to a new location when their screen is completely dark!

To start the fade, just call the `fadeOut` method. There could be a reason why you don't want to have it fade in automatically, for example when the time needed when the screen is black is a bit more than a couple of milliseconds. In that case you can set the `continous` property to false and call the `fadeIn` methods manually when you are ready.

{{< img-link "/images/2023/06/FadeToBlack_InWLE.png" "Fade To Black In Wonderland Editor" >}}

These are the settings for the pipeline I used to get the material to works as intented and always render on top of everything else. I created this by duplicating the default `Flat` material.

{{< img-link "/images/2023/06/FadeToBlack_Pipeline.png" "Pipeline In Wonderland Editor" >}}

*A couple of Quick sidenotes:*

To satify TypeScript, I created an interface to let it know about the color property of shader used by the `Flat Material`. 

```TypeScript
import { Material } from "@wonderlandengine/api";

export interface FlatMaterial extends Material{
    color: number[];
}
```

The component also makes uses of some helper functions available in [my component library](https://github.com/sorskoot/SorskootWonderlandComponents).


## Using Fade Events for Teleportation 

Imagine teleporting a player from one part of your virtual world to another as they explore and interact with their environment. With our fade component, you can do just that! Here's a quick example of how you might use these events to achieve this:

```typescript
// Some random component.
export class RandomComponent extends Component {
  static TypeName = "random-component";
  
  /**
   * The object used to get the fade screen component from.
   */
  @property.object()
  fadeScreenObject!: Object3D;
  
  start(){
    // Get a reference to the fadeScreenComponent and subscribe to the complete   event. 

    const fsc = this.fadeScreenObject.getComponent(FadeScreen);
    if (!fsc) {
      throw new Error("No FadeScreen component found on fadeScreenObject");
    }
    this.fadeScreenComponent = fsc;
  
    this.fadeScreenComponent.FadeOutCompleted.add(()=>{
      // teleport the player
    })
  }
}
```

Now, when players teleport between locations in your VR experience, they'll be treated to a smooth fade-to-black effect that helps minimize motion sickness and keeps them immersed in your creation. Make sure to set a reference to the `fade-screen` component when using something like the code above.


## Wrap Up 

And there you have it - an easy-to-implement component for Wonderland Engine that adds a professional touch to your VR experiences by allowing smooth transitions and reducing motion sickness during teleportation!

I hope you find this component helpful in your projects. If you have any questions or suggestions about how to improve it, feel free to share your thoughts in the comments section below. 

Happy Coding! 🚀