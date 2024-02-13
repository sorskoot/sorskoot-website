---
id: 20240213
title: "Physx Collisions"
date: 2024-02-13T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
draft: true
categories:
  - WebXR
tags:
  - Wonderland Engine
---


To handle collisions using the PhysXComponent in Wonderland Engine, you can make use of the `onCollision` method provided by the PhysXComponent API. Here's a step-by-step explanation of how you can set up and handle collisions:

1. **Add PhysXComponent to an Object:**
   Before detecting collisions, you need to have a PhysXComponent attached to your object in the Wonderland Editor. Set up the collision parameters such as shape, mass, bounciness, friction, etc.

2. **Create a JavaScript Component:**
   Create a new JavaScript file for your component and import the required modules from the Wonderland API.

```javascript
import { Component } from '@wonderlandengine/api';
```

3. **Create a Custom Component Class:**
   Define your component class that extends `Component`. This is where you'll implement collision handling.

```javascript
export class MyCollisionHandler extends Component {
    onTriggerEnter(other) {
        // Handle collision enter event here
    }

    onTriggerExit(other) {
        // Handle collision exit event here
    }
}
```

4. **Subscribe to Collision Events:**
   In the `start` method of your custom component, get the PhysXComponent and subscribe to collision events using `onCollision` method.

```javascript
start() {
    this.physxComponent = this.object.getComponent('physx');
    
    // Check if there is a PhysXComponent
    if (this.physxComponent) {
        // Subscribe to collision events
        this.physxComponent.onCollision((eventType, other) => {
            if (eventType === WL.CollisionEventType.TouchBegan) {
                this.onTriggerEnter(other);
            } else if (eventType === WL.CollisionEventType.TouchEnded) {
                this.onTriggerExit(other);
            }
        });
    }
}
```

5. **Respond to Collisions:**
   Implement the logic for collision enter (TouchBegan) and collision exit (TouchEnded) within the `onTriggerEnter` and `onTriggerExit` functions.

```javascript
onTriggerEnter(other) {
    console.log('Collision entered with', other.object.name);
    // Additional logic for when an object enters the collision
}

onTriggerExit(other) {
    console.log('Collision ended with', other.object.name);
    // Additional logic for when an object exits the collision
}
```

6. **Add the Component to the Object:**
   Return to the Wonderland Editor, and add your newly created JavaScript component to the object that has the PhysXComponent.

7. **Package and Test:**
   Package your project with the Wonderland Engine editor and test it in the browser or a VR/AR headset. Watch the console for log outputs when collisions occur.

Remember to replace `MyCollisionHandler` with the actual name of the class you've created for your custom component. Make sure that the `PhysXComponent` is properly configured to detect collisions (non-static, with `trigger` enabled if you're using it as a trigger volume).

This basic example provides a template that you can modify to suit the collision logic required for your specific use case.