---
id: 20260401
draft: false
title: Automatic Imports
date: 2026-04-01T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20260401
permalink: /2026/04/AutomaticImports/
categories:
  - Game Development
tags:
  - A-Frame
  - Vite
images:
  - /images/2026/04/AutomatedImports.png
---

Hello Coders! 👾

I keep running into the same problem in almost every game I build, especially when the project gets a bit bigger. Once I have a few components, systems, and helper modules, my main file turns into a long wall of imports. Then I add one extra file, forget one import, and lose time debugging something silly.

## Let Vite Do The Work

I recently (finally) switched to [Vite](https://vite.dev/). One small feature made my life much easier right away: automatic imports with glob patterns. Instead of manually importing every file, I can tell Vite to load whole groups based on naming.

I use `import.meta.glob` for this. It loads files by pattern, so I don't need to update my entry file every time I add another module.

In my case, I keep the auto-loading in a separate file:

##### auto-imports.ts
```ts
/**
 * Auto-imports for components, systems and shaders.
 */
import.meta.glob('./components/*-component.ts', { eager: true });
import.meta.glob('./systems/*-system.ts', { eager: true })
import.meta.glob('./shaders/*-shader.ts', { eager: true })
```

Then I only need to import that file once in my app entry:

##### main.ts
```ts
import 'aframe';
import './auto-imports.ts';
```

## Why I Like This

This works really well when files register themselves on import, for example in my [A-Frame](https://aframe.io/) setup. The `eager: true` option makes sure Vite loads them immediately, which is exactly what I want for components and systems.

The nice part is that this scales with the project. As long as I keep the same naming pattern, new files are picked up automatically. My `main.ts` stays small, and it saves me from those missing-import bugs all the time.

If your project starts collecting many self-registering modules, this is a simple way to keep things under control without adding extra tooling.

Happy Coding! 🚀

{{< img-link "/images/2026/04/AutomatedImports.png" "A Robot handling Automated Imports" >}}