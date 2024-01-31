---
id: 20230623
draft: true
title: Generics in TypeScript
date: 2023-06-23T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20230623
permalink: /2023/06/GenericsInTypescript/
categories:
  - TypeScript  
tags:
  - Architecture
  
---
# Unleashing the Power of Generics in TypeScript Games 🎮

Hello Coders! 👋 Today, I'm excited to share with you a fantastic tool that you can use to improve your TypeScript game development experience: **Generics**. While they might seem intimidating and complex at first glance, I promise that once you grasp the core concepts, you'll wonder how you ever survived without them. So, let's dive into the magical world of generics and see how they can help us create more efficient and flexible game code!

## What Are Generics? 🤔

Generics are a way to create reusable components in your code that can work with a variety of data types. They allow for type-safe code reuse by enabling you to write functions, classes, and interfaces that can operate on multiple types while still maintaining their unique characteristics. 

In other words, generics give you the flexibility to write code that doesn't depend on specific data types while keeping your code type-safe and maintainable.

## Introducing Generics with a Simple Example 📚

To better understand the concept of generics, let's start with a simple example. Imagine we're creating an inventory system for our game, and we have various items like potions, weapons, and armor. We want to create a function that can accept any of these items and return an array containing them.

Without generics, we might write something like this:

```typescript
function createInventory(items: any[]): any[] {
  return [...items];
}

const inventory = createInventory(["potion", "sword", "shield"]);
```

This works, but it's not type-safe. We're using `any`, which means we lose all type information about our items.

Now let's rewrite this function using generics:

```typescript
function createInventory<T>(items: T[]): T[] {
  return [...items];
}

const inventory = createInventory<string>(["potion", "sword", "shield"]);
```

Here we replaced `any` with `T`, a generic type variable. Now our function maintains type information about the items it receives and returns. It's flexible enough to accommodate any data type while still being type-safe!

## Applying Generics to Our Game Classes 🎯

Now that we've seen a simple example of using generics let's apply this knowledge to our game classes.

First, let's define a base `GameObject` class:

```typescript
class GameObject {
  constructor(public name: string) {}
}
```

Now let's say we want to create a `GameCollection` class that can hold an array of different game object types (like characters, items, or NPCs) while maintaining their specific type information.

We can achieve this using generics like so:

```typescript
class GameCollection<T extends GameObject> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}
```

With our new `GameCollection` class in place, we can now create collections for different game object types:

```typescript
class Item extends GameObject {}
class Character extends GameObject {}

const itemCollection = new GameCollection<Item>();
itemCollection.add(new Item("potion"));

const characterCollection = new GameCollection<Character>();
characterCollection.add(new Character("player"));
```

As you can see, our `GameCollection` class is now flexible enough to handle different types of game objects while preserving their unique type information.

## In Conclusion 🏁

Generics are a powerful tool in TypeScript that helps us create flexible and reusable components in our game code without sacrificing type safety. By understanding and applying generics correctly, we can write more efficient and maintainable code for our games.

So go ahead – embrace the power of generics in your TypeScript games and see just how much they can improve your development experience! And always remember: happy coding! 🚀