---
id: 20240205
draft: false
title: Wonderland Component Life Cycle
date: 2024-02-05T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20240205
permalink: /2024/02/ComponentLifeCycke/
categories:
  - WebXR
tags:
  - Wonderland Engine
  - TypeScript
  
---
Hello Coders! 👾

Today, I want to talk about something that often puzzles people: the lifecycle of a component. You know, those moments when you're left scratching your head, wondering when and in what order functions like `start` and `onActivate` are being called. 🤔

I've seen plenty of documents from Unity and other platforms, but I thought it was high time we had one for Wonderland. So, let's dive right in!

## The Basics

First, let's have a look at all the steps in the lifecycle of a Wonderland component. These are all the different places you can hook into. This doesn't mean you have to, but you could. 

{{<img-link "/images/2024/02/Flow.png" "Flow" >}}

If you've ever seen a Wonderland component, a couple might be familiar. In the default template `init`, `start` and `update` are included. 

Let's go over them and talk about their key functions and when you should (and shouldn't) use them:

### onRegister

The first method that is called in the life cycle of a component is the `onRegister` method. This immediately is a special one, since it is _static_. It is callen when the component is registered with Wonderland Engine. This is before the component is instantiated. The common thing you can do here is register other components this component depends on. You can add a little bit of logic to have a [specific component registered in specific cases](https://wonderlandengine.com/jsapi/component/#onRegister). The instance of the engine is passed a parameter.

### init

The more often used method `init` is called once after the component is initialized.
This is not the place to create or use components, but you'll be fine initiating a download from an external service, loading a file or maybe something else. As long as you keep in mind you can't do anything with resources in the engine yet.

### validateProperties

Before the component is started, the `validateProperties` method is called. Here, you can add custom validations by overriding the method. Whenever you find that a property should be invalid, throw an error. Remember to call `super()` to make sure the original validation is being executed as well.

### start

The `start` method is overridden very commonly. This is the place where you start reading components from properties and start to change things on other components. The start (and validateProperties) is called once in the life cycle of a component, but it doesn't have to be called right after init. When a component is not active at the beginning, for example when it is disabled in the Editor, validateProperties and start are called when the component first becomes active.

### onActivate

Now we're getting to the methods that can be called more than once in the life cycle of the component. `onActive` is called when a component becomes active. Whether this is done by another component or when the component is started active. Common to add event handlers.

### update

The `update` method is called every frame. As a parameter, it gets the time that has passed since the previous frame in seconds. This can be used to calculate constant changes over time. `Update` would be the right place to do the business logic of your game. 

### onDeactivate

When a component is deactivated, by setting the `active` to false either on the component itself or on the object the component belongs to. Keep in mind this method is not called when a component starts with its inactive property set to false. It had to be active first. Overriding the `onDecative` method would be the perfect place to unsubscribe from event handlers.

{{<img-link "/images/2024/02/InactiveComponent.png" "Inactive Component" >}}

### onDestroy

When `destroy` is called on an object it gets removed. When `destroy` is called on a component the component is removed from the object. In either of these cases, the `onDestroy` method is called. This way you can make sure everything is cleaned up or maybe even do something else. The destruction of the object can't be stopped though.

## Overriding Methods

There are also a couple of methods that can be overridden, although they're not really a part of the lifecycle. With all of these, make sure to call `super()` and keep an eye on the return value. Some return `this`.

### resetProperties

The first method that is being called after a component is instantiated is the `resetProperies` method. This method resets all properties to their default values, so a bool to false and a number to 0. If there's anything you'd like to reset yourself, that is not used by the editor, you can do it here. Make sure you call `super()` to make sure that the original resetProperties is executed as well. Also, return `this` so the method can be chained. 

### copy

This method copies all the properties from `src` into this instance. When overwritten, you can add some custom logic to the cloning process.

### equals

This method is used for comparing components. Override it if you want to add custom code. If you override this, make sure to return a bool indication if the component is equal to the one passed as a parameter.


## The Order of Things

The `onRegister` method is _always_ called first. Even when a component is not used but is registered with the engine in the `onRegister` method of another component, it is called. 

Under the most common situation, the order is as follows:

`onRegister → resetProperties → init → validateProperties → start → onActivate → update`

There's a lot of stuff happening internally between the calls, but you can be certain everything is called in this order. `Update` keeps being called every frame from then on. 

So, what's the order of operations when adding a component to an object at runtime? The sequence stays the same, although the `onRegister` isn't called in that case since it was already registered.

`resetProperties → init → validateProperties → start → onActivate → update`

And if you want to start inactive, you can use this code:

```js
this.object.addComponent(Test,{active:false});
```

This will add the component, but keep it inactive. The sequence then becomes:

`resetProperties → init`

After which it stops and waits until it is activated. To activate the component:

```js
this.object.getComponent(Test).active = true;
```

At that point the sequence continues.

`validateProperties → start → onActivate → update`

Until you might want to deactivate it again:

```js
this.object.getComponent(Test).active = false;
```

`onDeactivate`

... is the only method that is called then. Until it becomes active again.

`onActivate → update`

And then when you want to remove the component. 

```js
this.object.getComponent(Test).destroy();
```

`onDestroy`

This is the final method that is called. If you try to access the component after that the engine will throw you an error.

## Your Thoughts?

I hope this post has helped clear up some of the confusion around the lifecycle of a component in Wonderland. But I'd love to hear your thoughts! Have you found any tricks or tips that make managing the lifecycle easier? Or maybe you've run into some pitfalls that other developers should avoid. Let me know in the comments!

Until next time, keep coding, keep creating, and keep having fun. Game development is a journey, and I'm glad we're on it together.

Happy Coding! 🚀