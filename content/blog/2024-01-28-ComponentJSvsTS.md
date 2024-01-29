---
id: 20240129
draft: false
title: 'Wonderland Components: JS vs TS'
date: 2024-01-29T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20240129
permalink: /2024/01/ComponentJSvsTS/
categories:
  - WebXR
tags:
  - Wonderland Engine
  - TypeScript
  
---

Hello Coders! 👾 Today, I want to chat about something that's been asked me quite a few times. **What is the difference between JavaScript and TypeScript components in Wonderland Engine?** In the past, I swore by JavaScript, but last year I switched over and I have to say it's my preferred way of writing components now.

But I hear you think, "I already have all my code in JavaScript, and I don't want to write everything again and I don't even know TypeScript". Well. Getting started is very easy and you don't have to rewrite your code. Because Wonderland Engine is using [ESBuild](https://esbuild.github.io/) by default, you can use both at the same time! But to get the most out of it, I would suggest adding a `tsconfig` file (I'll add a basic one at the end to get you going 😉). 

To add a new component to your project, whether you want JavaScript or TypeScript, just right-click in the asset browser inside Wonderland Editor and select either 

{{<img-link "/images/2024/01/newComponent.png" "New Component Dialog" >}}

## 🤔 JavaScript or TypeScript? That is the question!

First things first, let's have a look at a default component in JavaScript. It's pretty straightforward. Here's what it looks like:

```js
import {Component, Property} from '@wonderlandengine/api';

export class JsComponent extends Component {
    static TypeName = 'js-component';
    static Properties = {
        param: Property.float(1.0),
        randomObj: Property.object({ required: true })
    };

    start() {
        console.log('start() with param', this.param);
    }

    update(dt) {
        // Called every frame.
    }
}
```

As you can see, we've got our properties defined right there, and we're all set to log something when the `start()` method kicks in. 

But then, there's TypeScript. Check out how a TS component looks:

```ts
import {Component} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';

export class TsComponent extends Component {
    static TypeName = 'ts-component';

    @property.float(1.0)
    param = 1.0;
    
    @property.object({required:true})
    randomObj!: Object3D;

    start() {
        console.log('start() with param', this.param);
    }

    update(dt: number) {
        // Called every frame.
    }
}
```
Both JavaScript and TypeScript look pretty similar, don't they?

The biggest difference between these examples is the way the properties are defined. Notice the `@property` decorators? They're a TypeScript thing, and they make it super clear what each property is all about. The `param` property doesn't have an explicit type defined. Because it's very easy to read the type from the line it's not needed to add the type. 

Another thing to note is the `!` after `randomObj`. This tells TypeScript the property will be initialized so it doesn't have to annoy us with errors telling it's not initialized.

Plus, TypeScript is all about types, so it's great for catching errors before they sneak into your game. As you can see in the `update` method. 

This TypeScript component is a template that can be used as a starting point for creating custom behavior in a Wonderland Engine project. By defining properties with decorators, you ensure they can be easily configured within the editor, allowing for a more designer-friendly approach to development.

## The Showdown

When it comes to setting up your game components, both JS and TS have their perks. With JS, you're probably more familiar with the syntax, and it's a bit less strict, which can be nice when you're prototyping or just want to get something up and running quickly.

On the flip side, TS brings some serious order to the chaos. Those types and decorators aren't just for show; they help you manage your code better, catch errors early, and overall, they can make your codebase feel more robust and maintainable. When a project starts to grow in size, or when you need to work on a project someone else created, you will be glad there's a safety net to catch your bugs. 

Now, I've been using primarily TypeScript in my games since last summer, and I've gotta say, it saved me so many times. It has a learning curve and I sometimes still feel TypeScript is restricting. There are just some things you can do in JavaScript _because_ it's not using types, but most of the time there's a way to describe what you need in TypeScript.

## Wrapping Up and Moving Forward

I'm curious, though - what's your take on this? Are you team JS or team TS when it comes to game development? Drop a comment and let me know your thoughts!

Alright, that's a wrap for today's dev talk! I hope you found this comparison a bit useful. Whether you're a JavaScript enthusiast or a TypeScript aficionado, remember that the most important thing is to keep creating and having fun with your game development journey.

Stay tuned for more updates on my game development progress, and don't forget to subscribe or follow for the latest scoop. Your feedback is always welcome, and I can't wait to share more with you all!

Happy Coding! 🚀

---
## tsconfig.json
Add this file to your project to get the decorators working. Name it `tsconfig.json` and add it to the root of your project, alongside the `.wlp` file.

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "outDir": "./dist",
        "declaration": true,
        "allowJs": false,
        "newLine": "LF",
        "strict": true,
        "experimentalDecorators": true
    },
    "include": [ "./js" ],
    "exclude": [ "node_modules" ]
}
```