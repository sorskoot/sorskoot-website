---
id: 20230619
draft: false
title: Dependency Injection in TypeScript
date: 2023-06-19T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20230619
permalink: /2023/06/DITypescript/
categories:
  - TypeScript  
tags:
  - Architecture
  
---

## Dependency Injection in TypeScript Games

Hello Coders! 👾 Today, I want to take you on small journey into the magical world of Dependency Injection (DI) in TypeScript games. I'm excited to learn how to use [Microsoft's `tsyringe`](https://github.com/microsoft/tsyringe) library to make my projects more efficient and easy to manage. So, let's get started!


## What's Dependency Injection? 🤷

First things first – what exactly is dependency injection? In simple terms, it's a design pattern that makes our code more flexible, maintainable and testable by reducing direct dependencies between classes. And, it's a way to achieve the Depency Inversion Principle, the 'D' of the SOLID principles I talked about in my [previous blogpost](/blog/2023-06-16-solid-in-typescript/).

Imagine you're building a game and you have two classes: `Player` and `Weapon`. The traditional way to create a relationship between these two would be by instantiating a `Weapon` object inside the `Player` class:

```typescript
class Weapon {
  attack() {
    // Do some attack logic
  }
}

class Player {
  weapon: Weapon;

  constructor() {
    this.weapon = new Weapon();
  }

  attack() {
    this.weapon.attack();
  }
}
```

But what if you want to change the weapon? Or maybe test the player without a weapon? That's where dependency injection comes into play. You can pass the `Weapon` object as an argument to the `Player` constructor, making it more flexible:

```typescript
class Player {
  weapon: Weapon;

  constructor(weapon: Weapon) {
    this.weapon = weapon;
  }

  // ...
}
```

Now we can easily replace the weapon or create unit tests to test our player without it. Great! But... how do we manage all those dependencies across our entire game? 🤔

## Introducing tsyringe

Now that we have a basic understanding of DI let's dive into `tsyringe`, a lightweight dependency injection container for TypeScript applications. It helps you manage your dependencies efficiently and effectively.

Let's see how we can use `tsyringe` in our TypeScript game project.

First, you need to install `tsyringe` as a dependency in your project. You can do this by running:

```bash
npm install tsyringe, reflect-metadata --save
```


If you haven't already, you need to enable the decorators in the TypeScript settings of your project. You can do that by modifying your tsconfig.json to include the following settings:

```
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

The dependency injection uses reflection and metadata to get all the information it needs to correctly inject stuff. The metadata is not build into JavaScript yet, so we need a polyfill. I'm using `reflect-metadata`. The reflect polyfill import should only be added once, and before DI is used. I've added mine to the index.ts file. 

```typescript
// index.ts
import "reflect-metadata";
```

Now everything is set up, we can start using it in our game project.


## Setting up tsyringe

To begin using `tsyringe` in your project, you need to import the necessary classes and decorators from the library:

```typescript
import { container, injectable, inject } from "tsyringe";
```

Next, let's create an example service class that we will use in our game:

```typescript
@injectable()
class GameService {
    constructor(@inject("PlayerService") private playerService: PlayerService) {}

    start() {
        const player = this.playerService.createPlayer();
        console.log(`Game started with player: ${player.name}`);
    }
}
```

Notice the `@injectable()` decorator above the class definition? This tells `tsyringe` that this class can be used as a dependency throughout your application.

The constructor of our `GameService` class takes an instance of `PlayerService`. We use the `@inject()` decorator on the constructor parameter to tell `tsyringe` which service instance should be injected here.

Now let's create our `PlayerService` class:

```typescript
@injectable()
class PlayerService {
    createPlayer(): Player {
        return new Player("John Doe");
    }
}
```

Here we also use the `@injectable()` decorator to make this class available for injection.

Now that we have our services set up let's register them with our container:

```typescript
container.register("GameService", GameService);
container.register("PlayerService", PlayerService);
```

We are now ready to use these services in our game!

## Using injected services

To use these services in our game, we simply need to ask the container for an instance of the required service:

```typescript
const gameService = container.resolve<GameService>("GameService");
gameService.start();
```

This will automatically take care of injecting any required dependencies into the service instance.

And there you have it! We've successfully set up DI in our TypeScript game project using Microsoft's `tsyringe`. Now go forth and apply this newfound knowledge to make your games more efficient and manageable! 

Happy Coding! 🚀