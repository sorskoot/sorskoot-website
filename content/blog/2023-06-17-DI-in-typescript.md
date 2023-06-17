---
id: 20230617
draft: true
title: Dependency Injection in TypeScript
date: 2023-06-17T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20230617
permalink: /2023/06/DITypescript/
categories:
  - TypeScript  
tags:
  - Architecture
  
---

## Dependency Injection in TypeScript Games

Hello Coders! 👾 Today, we're going to take a deep dive into the world of dependency injection in TypeScript games, using the magical `@service` and `@inhect` decorators. Dependency Injection is something I always used in my C# code. But, since I'm diving deeper into TypeScript now I wanted to see if it could be done in TypeScript as well.

## What's the Deal with Dependency Injection? 🤷

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

Now we can easily replace the weapon or test our player without it. Great! But... how do we manage all those dependencies across our entire game? 🤔

## Enter the @service Decorator

That's where the `@service` decorator comes into play. With it, you can create a shared instance of your services (like `Weapon`) and automatically inject them into your classes. Let me show you how.

First, let's install the necessary [package](https://www.npmjs.com/package/typescript-ioc):

```bash
npm install --save typescript-ioc
```

Now we need to import and use the `@Service()` decorator from the package in our `Weapon` class:

```typescript
import { Service } from 'typescript-ioc';

@Service()
class Weapon {
  // ...
}
```

Finally, let's use the `@Inject()` decorator in our `Player` class to automatically inject an instance of our `Weapon` service:

```typescript
import { Inject } from 'typescript-ioc';

class Player {
  @Inject()
  private weapon: Weapon;

  // ...
}
```

And that's it! Our `Player` class now has a shared instance of the `Weapon` service automatically injected into it. Changing or replacing the weapon is much easier now.

"But wait!", I hear you cry. "What if I want a different instance for each player?" No worries – just use the `@Scoped()` decorator instead of `@Service()`, like so:

```typescript
import { Scoped } from 'typescript-ioc';

@Scoped()
class Weapon {
  // ...
}
```

And there you have it – now each player will have their very own instance of our trusty `Weapon`. 

## Wrap Up

So there you have it – dependency injection made easy with TypeScript and decorators. No more messy constructors and passing objects around manually! Now go forth and conquer your game development adventures with cleaner, more manageable code!

Happy Coding! 🚀