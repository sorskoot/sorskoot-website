---
id: 20250123
draft: false
title: Demystifying Event Handling in Wonderland Engine
date: 2025-01-23T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20250123
permalink: /2025/01/WonderlandEvents/
categories:
  - Wonderland Engine
tags:
  - Wonderland Engine
images:
  - /images/2025/01/eventHandling.png
---

Hello Coders! 👾

In this blog post, I'm going to walk you through how to work with event handlers using the `Emitter` class in Wonderland Engine, specifically focusing on how to add parameters. As someone who works extensively with Wonderland Engine, I found this to be a somewhat unclear topic, so I believe it will be helpful for others as well.

## The Emitter Class

The `Emitter` class in Wonderland Engine allows you to register listeners that will get notified when an event occurs. A key feature of the `Emitter` class is its ability to handle parameters. The generic type `T` for the `Emitter` is an array of types, meaning you can pass multiple arguments to the listeners.

## Setting Up an Emitter with Parameters

Here’s a step-by-step guide on how to set up and use an `Emitter` with parameters.

### 1. Define the Emitter

First, define the `Emitter` with the appropriate type signature. In this example, we will use an emitter that expects two parameters: a number and a string.

```typescript
import {Emitter} from '@wonderlandengine/api';

// Create an Emitter that expects two parameters: a number and a string
const myEmitter = new Emitter<[number, string]>();
```

### 2. Add a Listener

Next, add a listener that receives these parameters.

```typescript
// Register a listener that takes two parameters
myEmitter.add((num, str) => {
    console.log(`Received number: ${num}, string: ${str}`);
});
```

### 3. Notify the Listeners

Finally, notify the listeners with the parameters.

```typescript
// Notify listeners with the parameters 42 and 'Hello'
myEmitter.notify(42, 'Hello');
```

## Arrow Functions for Event Handlers

When defining event handlers, it is recommended to use an arrow function. This way, the reference can be removed, and the context stays correct. Here’s an example:

```typescript
private _numberChanged = (num, str) => {
    console.log(`Received number: ${num}, string: ${str}`);
}
```

## Using Lifecycle Methods for Event Handlers

It is best practice to add and remove event handlers in the `onActivate` and `onDeactivate` lifecycle methods of a component. This ensures that events do not stay active when the component is not active, and when components are removed, the events are removed as well.

Here’s an example of how to do this:

```typescript
import {Component, Emitter} from '@wonderlandengine/api';

class MyComponent extends Component {
    static TypeName = 'my-component';

    private _myEmitter = new Emitter<[number, string]>();

    private _numberChanged = (num: number, str: string): void => {
        console.log(`Received number: ${num}, string: ${str}`);
    }

    onActivate(): void {
        this._myEmitter.add(this._numberChanged);
    }

    onDeactivate(): void {
        this._myEmitter.remove(this._numberChanged);
    }
}
```

## RetainedEmitter

Sometimes, you can only add an event handler after an event might have been called already. The RetainEmitter might help in these cases. The RetainedEmitter retains the event data, so listeners added after the notification will still receive the parameters.

```ts
const retainedEmitter = new RetainedEmitter<[number, string]>();
retainedEmitter.notify(24, 'Retained Event!');
retainedEmitter.add((num, str) => {
    console.log(`Received retained number: ${num}, string: ${str}`);
});
```

## Conclusion

Using the `Emitter` class in Wonderland Engine to handle events with parameters can be straightforward once you understand the setup. By adding and removing event handlers in the `onActivate` and `onDeactivate` lifecycle methods, you ensure that events are managed efficiently. Also, using arrow functions for event handlers helps in maintaining the correct context and makes it easier to remove the handlers.

I hope this guide has clarified how to use the `Emitter` class and how to pass parameters to your event listeners effectively.

Happy Coding! 🚀
