---
id: 20250428
draft: false
title: Loading Json
date: 2025-04-28T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20250428
permalink: /2025/04/loadingjson/
categories:
  - Wonderland Engine
tags:
  - Wonderland Engine
images:
 - /images/2025/04/loading-json.png
---

Hello Coders! 👾

When I'm [developing my games](https://timmykokke.com/#games) with [Wonderland Engine](https://wonderlandengine.com/), I often need to load external data like level configurations or game settings from files at runtime. In this short tutorial, I'll show you a simple and effective way to load JSON files directly within your Wonderland components.

## Create a JSON Loader Component

First, I create a new component class that inherits from Wonderland Engine's `Component` class. This component will handle fetching and parsing JSON data:

```typescript
// filepath: src/components/json-loader.ts
import { Component } from '@wonderlandengine/api';

export class JsonLoader extends Component {
    static TypeName = 'json-loader';

    async loadJson<T>(filePath: string): Promise<T> {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Oops! Couldn't load JSON file: ${filePath}`);
        }
        return await response.json() as T;
    }
}
```

In games this method might be part of a bigger component. For example in a component that handles map-data, the processing of the data is also in this component.

## Using the JSON Loader in Your Game

Now, to use this, I simply call the `loadJson` method with the path to my JSON file. Here's how:

```typescript
// filepath: src/components/level-manager.ts
const levelData = await jsonLoader.loadJson<LevelData>('maps/level1.json');
// Now levelData is strongly typed as LevelData
console.log(levelData);
```

Make sure you place your JSON files (like `maps/level1.json`) inside the `/static` folder of your project. If the `/static` folder doesn't exist yet, just create it. Wonderland Engine automatically copies all files from this folder to your deploy folder when packaging your game in the editor. This way, your JSON files will always be available at runtime.

## Best Practices for Loading Data

Here are some tips I follow to keep things smooth:

- Always handle errors gracefully. Check response statuses and provide clear error messages.
- Keep data files neatly organized in a dedicated folder within your project.
- Use asynchronous methods (`async/await`) to keep your game responsive during loading.

If you want to see the actual implementation of this, be sure to check out the code of the [game jam entry on GitHub](https://github.com/sorskoot/GameDevJS2025/blob/main/js/components/map-loader.ts).

That's it! With these simple steps, loading data in Wonderland Engine becomes easy and efficient.

Happy Coding! 🚀

{{< img-link "/images/2025/04/loading-json.png" "A whimsical Wonderland environment with a small game character opening a file or reading a JSON scrol" >}}
