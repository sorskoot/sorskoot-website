---
id: 20260122
draft: true
title: Game Systems
date: 2026-01-22T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20260122
permalink: /2026/01/GameSystems/
categories:
  - 
tags:
  - 
images:
  - /images/2026/01/??.png
---

Hello Coders! 👾

There are various game engine for web games available. They all include the most common features for building games on the web. Mostly focussed around rendering 2D or 3D. However, there are a lof of systems, utilities and patterns that are common in game development that are not included in any of these engines. Pretty much all tutorials and courses on game development focus on getting started. They show you the very basics of a small game or demo. When you actually build a more complex game, a lot of systems binding everything together is a mystery. They are probably used in games, but not visible for anyone. Unity has an asset store so it makes sense for people to sell systems and tools there. But for the web there isn't such a marketplace.

This post will be a collection of libraries, systems, tools and patterns I find useful. It won't be a complete list. I don't have experience with most of them. This is a start of just collecting them in one place so I can find them again later. Hopefully it will be useful for others as well.

## Architecture Patterns

### Inversion of Control / Dependency Injection

- **InversifyJS**
  - A powerful and lightweight inversion of control container for JavaScript & Node.js apps powered by TypeScript.
  - <https://inversify.io/>

- **TSyringe**
  - A lightweight dependency injection container for TypeScript/JavaScript for constructor injection by Microsoft.
  - <https://github.com/microsoft/tsyringe>

### Entity Component System (ECS)

- **bitECS**
  - Flexible, minimal, data-oriented ECS library for Typescript.
  - <https://github.com/NateTheGreatt/bitECS>

- **Entity-System-js**
  - A simple Entity Component System library for JavaScript.
  - <https://github.com/adngdb/entity-system-js> / <https://entity-system-js.readthedocs.io/en/latest/>

### State Management

- **XState**
  - State machines and statecharts for the modern web.
  - <https://stately.ai/docs/xstate>

## UI / GUI

- **ore-ui**
  - React library for creating game UI by Mojang
  - <https://github.com/mojang/ore-ui>

## Other

- **LocalForage**
  - localForage is a JavaScript library that improves the offline experience of your web app by using an asynchronous data store with a simple, localStorage-like API. It allows developers to store many types of data instead of just strings.
  - <https://localforage.github.io/localForage/>

- **MessagePack**
  - This library is an implementation of MessagePack for TypeScript and JavaScript, providing a compact and efficient binary serialization format.
  - <https://github.com/msgpack/msgpack-javascript>

- **CBOR**
  - CBOR (Concise Binary Object Representation) is a data format whose design goals include the possibility of extremely small code size, fairly small message size, and extensibility without the need for version negotiation.
  - <https://github.com/paroga/cbor-js> / <https://cbor.io/>

- **game-inputs**
  - A simple library for abstracting key/mouse input for games.
  - <https://github.com/Bloxdy/game-inputs>

- **game-shell**
  - A generic shell for creating interactive demos/games in JavaScript.
  - <https://github.com/mikolalysenko/game-shell>

- **ndarray**
  - Multidimensional arrays for JavaScript.
  - <https://github.com/scijs/ndarray>

- **core-js**
  - Modular standard library for JavaScript. Includes polyfills for ECMAScript up to 2025, ECMAScript proposals and some cross-platform WHATWG / W3C features.
  - <https://core-js.io/>

- **Amodx/Libraries**
  - a collection of various libraries by Amodx. Including Math, NCS, RNG, Audio and binary.
  - <https://github.com/Amodx/Libraries>

- **AssetPack**
  - A configurable asset pipeline for the web
  - <https://pixijs.io/assetpack/>

- **YarnSpinner** / **Bondage.js**
  - Yarn Spinner creates narrative game tools for writers, programmers, game designers, and everyone in between. Bondage.js is a JavaScript implementation of the Yarn Spinner runtime.
  - <https://yarnspinner.dev/> / <https://github.com/hylyh/bondage.js>

- **Monomorph**
  - Monomorph is a Typescript and Javascript library for performance-critical applications. With Monomorph, you can easily create classes that have built in garbage collections, nesting, and serialization.
  - <https://codeberg.org/perplexdotgg/monomorph>

## Full Games

- **Shapez.io**
  - This is the source code for shapez.io, an open source base building game inspired by Factorio.
  - <https://github.com/Shapez-io-community/shapez.io-community>
