---
id: 20230621
draft: true
title: 5 Code patterns for TypeScript
date: 2023-06-21T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20230621
permalink: /2023/06/PatternsTypescript/
categories:
  - TypeScript  
tags:
  - Architecture
  
---
# 5 Code Patterns for Your TypeScript Games

Hello Coders! 🎮 I'm currently looking into some coding patterns in TypeScript. Here's my top 5.

## Singleton Pattern 😎

Ever had that one character in your game who's just too important to have multiple instances? The Singleton pattern comes to the rescue! With this pattern, you can ensure that there's only one instance of a class created throughout your game.

Here's a basic implementation:

```typescript
class GameMaster {
  private static instance: GameMaster;

  private constructor() {}

  public static getInstance(): GameMaster {
    if (!GameMaster.instance) {
      GameMaster.instance = new GameMaster();
    }
    return GameMaster.instance;
  }
}
```

Now, whenever you need the `GameMaster`, call the `getInstance` method instead of creating a new object.

## Observer Pattern 📡

Communication between objects is crucial, especially in games with multiple interacting elements. The Observer pattern allows objects to "subscribe" to another object's events and get notified when something important happens.

Check out this example:

```typescript
interface Observer {
  update(message: string): void;
}

class Publisher {
  private observers: Observer[] = [];

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  notify(message: string) {
    this.observers.forEach((observer) => observer.update(message));
  }
}
```

By implementing the `Observer` interface on various game objects, you can efficiently manage communication between them.

## Factory Pattern 🏭

Ever needed to create similar objects with slight differences? The Factory pattern is here to help! This pattern simplifies object creation by centralizing it within a single "factory".

Take a look at this example:

```typescript
abstract class Enemy {
  abstract attack(): void;
}

class Zombie extends Enemy {
  attack() {
    console.log('Zombie bites!');
  }
}

class Vampire extends Enemy {
  attack() {
    console.log('Vampire strikes!');
  }
}

class EnemyFactory {
  createEnemy(type: 'zombie' | 'vampire'): Enemy {
    if (type === 'zombie') return new Zombie();
    else return new Vampire();
  }
}
```

Now you can easily create different enemy types using the `createEnemy` method from `EnemyFactory`.

## State Pattern 🔄

Managing different states within an object can become messy quickly. The State pattern allows you to encapsulate state-specific behavior in separate classes, promoting cleaner and more maintainable code.

Here's an example:

```typescript
interface PlayerState {
  handleInput(input: string): void;
}

class IdleState implements PlayerState {
  handleInput(input: string) {
    if (input === 'move') console.log('Player starts moving');
    else console.log('Player stays idle');
  }
}

class MovingState implements PlayerState {
  handleInput(input: string) {
    if (input === 'stop') console.log('Player stops moving');
    else console.log('Player keeps moving');
  }
}

class Player {
  private state: PlayerState = new IdleState();

  setState(state: PlayerState) {
    this.state = state;
  }

  handleInput(input: string) {
    this.state.handleInput(input);
  }
}
```

Now, the `Player` class delegates input handling to its current state, making it easy to manage different behaviors.

## Decorator Pattern 🧙‍♂️

Want to add behavior or properties to your objects dynamically? The Decorator pattern is what you need! This pattern allows you to extend objects' functionality without modifying their original structure.

Here's an example:

```typescript
interface Weapon {
  getDamage(): number;
}

class Sword implements Weapon {
  getDamage() {
    return 10;
  }
}

abstract class WeaponDecorator implements Weapon {
  protected weapon: Weapon;

  constructor(weapon: Weapon) {
    this.weapon = weapon;
  }

  abstract getDamage(): number;
}

class FireEnchantment extends WeaponDecorator {
  getDamage() {
    return this.weapon.getDamage() + 5;
 }
}

const enchantedSword = new FireEnchantment(new Sword());
console.log(enchantedSword.getDamage()); // Output: "15"
 ```

By wrapping the `Sword` object with `FireEnchantment`, its damage output increases without directly modifying its original implementation.

That wraps up our list of fun code patterns for your TypeScript games! Armed with these patterns, you'll be able to tackle complex game logic while keeping your code clean and organized. Now go forth and create some amazing games!

Happy Coding! 🚀