---
id: 20230616
draft: false
title: SOLID in TypeScript
date: 2023-06-16T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20230616
permalink: /2023/06/SOLIDTypescript/
categories:
  - TypeScript  
tags:
  - Architecture
---

## SOLIDifying your TypeScript Code 

Hello Coders! 🤖 Today, I want to share my experience applying the **[SOLID](https://en.wikipedia.org/wiki/SOLID)** principles to TypeScript, specifically when designing games. And it's crucial to ensure that our codebase stays clean and maintainable. I personally live by these 5 rules and I've been applying them to every aspect of my C# code for many years now. Since I'm diving deeper into TypeScript I thought it's about time to see how we can apply the SOLID principles to that.

So let's dive into the SOLID principles and see how they can help us write better TypeScript code for our games.

## Single Responsibility Principle (SRP) 😇

The first principle of SOLID is the **Single Responsibility Principle**, which states that a class should have only one reason to change. In other words, each class should be responsible for a single piece of functionality.

When designing games in TypeScript, this principle can help us create modular code that is easy to understand and maintain. For example, if we have a `Player` class, it should only handle the functionality related to the player character, such as movement and interactions.

```typescript
class Player {
  move() {
    // Handle player movement
  }
  
  interact() {
    // Handle player interactions
  }
}
```

By adhering to SRP, we can avoid creating "god classes" that are difficult to manage and prone to bugs.

## Open/Closed Principle (OCP) 🔓

The second principle of SOLID is the **Open/Closed Principle**, which states that classes should be open for extension but closed for modification. This means that we should be able to add new functionality without altering existing code.

In TypeScript, we can achieve this by using inheritance and interfaces. For instance, let's say we have a `VRGameObject` class that represents any object in our game world:

```typescript
class VRGameObject {
  update() {
    // Update game object state
  }
}
```

Now let's say we want to add gravity functionality to certain game objects. Instead of modifying the `VRGameObject` class directly, we can create a new class `GravityAffectedObject` that extends it:

```typescript
class GravityAffectedObject extends VRGameObject {
  applyGravity() {
    // Apply gravity force
  }
}
```

This way, our code stays flexible and maintainable as new features are added.

## Liskov Substitution Principle (LSP) 🔄

The third principle of SOLID is the **Liskov Substitution Principle**. This principle encourages us to create classes that are interchangeable with their base classes or interfaces without affecting program correctness.

For TypeScript games, adhering to LSP means that we should be able to switch between different implementations without any issues. For example, let's say we have an interface `InputDevice`:

```typescript
interface InputDevice {
  getInput(): InputData;
}
```

We can then create different input device implementations like `KeyboardInput` and `VRControllerInput`, which both adhere to the same interface:

```typescript
class KeyboardInput implements InputDevice {
  getInput(): InputData {
    // Get input data from keyboard
  }
}

class VRControllerInput implements InputDevice {
  getInput(): InputData {
    // Get input data from VR controller
  }
}
```

By following LSP, our code becomes more flexible and easier to refactor or extend.

## Interface Segregation Principle (ISP) 🧩

Next up is the **Interface Segregation Principle**, which encourages us to create smaller, more specialized interfaces instead of large monolithic ones.

In our TypeScript games, this means breaking down large interfaces into smaller ones based on specific responsibilities. For example, instead of having a single interface for all game objects:

```typescript
interface GameObject {
  update(): void;
  render(): void;
  collideWith(other: GameObject): void;
}
```

We could split it into smaller interfaces based on specific tasks:

```typescript
interface Updatable {
  update(): void;
}

interface Renderable {
  render(): void;
}

interface Collidable {
  collideWith(other: Collidable): void;
}
```

By doing so, our code becomes more modular and easier to understand, as well as promoting better separation of concerns.

## Dependency Inversion Principle (DIP) 🔀

Last but not least is the **Dependency Inversion Principle**, which encourages us to depend on abstractions rather than concrete implementations.

For our TypeScript games, this means using dependency injection and inversion of control techniques when designing components. This helps decouple our classes and reduce direct dependencies between them.

For instance, instead of having a `GameEngine` class directly instantiate a `PhysicsEngine` object:

```typescript
class GameEngine {
  private physicsEngine: PhysicsEngine;

  constructor() {
    this.physicsEngine = new PhysicsEngine();
  }
}
```

We could use dependency injection through the constructor:

```typescript
class GameEngine {
  private physicsEngine: PhysicsEngine;

  constructor(physicsEngine: PhysicsEngine) {
    this.physicsEngine = physicsEngine;
  }
}
```

This way, we can easily swap out or mock dependencies in tests without modifying our existing code.

## Wrapping it up

In conclusion, applying the SOLID principles to our TypeScript game development can greatly improve code quality, maintainability, and extensibility. By adhering to these principles, we can ensure that our games stay adaptable and robust as they grow in complexity.

Happy Coding! 🚀