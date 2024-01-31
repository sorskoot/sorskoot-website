---
id: 20230620
draft: false
title: Composition Root in TypeScript
date: 2023-06-20T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20230620
permalink: /2023/06/CompositionRootTypescript/
categories:
  - TypeScript  
tags:
  - Architecture
  
---

Hello Coders! 👾 Last time I wrote about [Dependency Injection in TypeScript](/blog/2023-06-19-di-in-typescript/). Todat I want to take this one step further and introduce you to *Composition Root*. What exactly does it mean, and how can we use it effectively in our projects? I'll show you how to implement it using the awesome `tsyringe` library. Let's dive in!

## What is Composition Root? 

In simple terms, Composition Root is a specific place in your app where you wire up all your dependencies. It's like the conductor of an orchestra making sure every instrument plays the right notes at the right time.

Having a single point of entry for managing dependencies ensures that they are organized, easy to locate, and less prone to errors. In short, Composition Root helps us keep our code clean and maintainable.

## Building Blocks of tsyringe 

I'm not going to show how to setup TSyring since I already did that last time. But, I'll go over the most important concepts and building blocks of the library.

### 1. Container 

A container is responsible for storing and managing all dependencies. It creates instances as needed and makes sure they're properly disposed of when no longer required. 

To create a container in `tsyringe`, simply import it:

```javascript
import { container } from 'tsyringe';
```

### 2. Injectable 

The `@injectable()` decorator marks a class as injectable. This means that the decorated class can be managed by the container.

```javascript
import { injectable } from 'tsyringe';

@injectable()
class MyService {
  // ...
}
```

### 3. Registering Dependencies 

Before we can use our injectable classes, they need to be registered within the container.

```javascript
import { container } from 'tsyringe';
import { MyService } from './MyService';

container.register('MyService', MyService);
```

### 4. Resolving Dependencies 

Once our dependencies are registered, we can resolve them using the `resolve()` method.

```javascript
const myServiceInstance = container.resolve(MyService);
```

## Implementing Composition Root 

With those building blocks out of the way, let's see how we can implement Composition Root using `tsyringe`. 

First, create a new file called `compositionRoot.ts`. This will house all our dependency registrations.

```javascript
// compositionRoot.ts
import { container } from 'tsyringe';
import { MyService } from './MyService';

export class DependencyRegistrar {
  public static registerDependencies(): void {
    container.register('MyService', MyService);
  }
}
```

Now that we have our centralized registration function, let's call it during application startup.

```javascript
// main.ts
import { DependencyRegistrar } from './compositionRoot';

DependencyRegistrar.registerDependencies();

// ...rest of app startup logic...
```

And voilà! We now have a clean and organized way to manage our dependencies using Composition Root and tsyringe!

## Wrapping Up

Composition Root is an essential pattern for managing dependencies in TypeScript applications. It keeps our code clean and maintainable by centralizing dependency management. 

By using `tsyringe`, we can take full advantage of this pattern with its simple yet powerful API. So go forth and conquer your dependency chaos with tsyringe!

Happy Coding! 🚀 