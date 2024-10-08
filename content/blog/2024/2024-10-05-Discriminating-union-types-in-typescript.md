---
id: 20241008
draft: false
title: Discriminating Union Types In Typescript
date: 2024-10-08T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20241008
permalink: /2024/10/Discriminatinguniontypesintypescript/
categories:
  - TypeScript 
tags:
  - Architecture
images:
  - /images/2024/10/puzzle_pieces.png
---
Hello Coders!👾

Recently I've been working on porting an ancient Unity game to the Wonderland Engine, and it's been an interesting process to rework the game’s features to fit into a new environment.

During this port, I ran into Unity’s way of handling two specific types of properties in particle systems: Min/Max Gradients and Min/Max Curves. In Unity, you can choose the type of MinMaxCurve or GradientMode you want from a dropdown, and the editor adjusts the properties accordingly. While this setup works fine in Unity’s editor, the underlying logic is also managed by the editor, and the type itself includes all different variations of properties. Moving to the Wonderland Engine gave me a chance to rethink and possibly improve this implementation.

Unlike C#, TypeScript offers a feature called '*Discriminated Unions*', which provides a more structured and type-safe approach to handling complex types based on Enums. This feature not only reduces the chances of errors but also improves the readability and maintainability of the code—essential when dealing with complex game development tasks.

In this blog post, we'll dive into how these Discriminated Unions work in TypeScript by recreating the implementation of [MinMaxGradient](https://docs.unity3d.com/ScriptReference/ParticleSystem.MinMaxGradient.html).

### Defining the Gradient Modes with Enums

The first step is to define an `Enum` that represents all possible gradient modes our particle system can have.

```typescript
export enum ParticleSystemGradientMode {
    Color,
    Gradient,
    TwoColors,
    TwoGradients,
    RandomColor,
}
```

### Crafting Specific Types for Each Gradient Mode

With the enum in place, we can now define specific types for each gradient mode:

1. **Single Color Mode**: To specify a single color gradient.

```typescript
type MinMaxGradientColor = {
    mode: ParticleSystemGradientMode.Color;
    color: Color;
};
```

2. **Two Colors Mode**: To define a gradient between two colors.

```typescript
type MinMaxGradientTwoColors = {
    mode: ParticleSystemGradientMode.TwoColors;
    colorMin: Color;
    colorMax: Color;
};
```

3. **Gradient Mode**: When you need more complexity than just a solid color or a blend of two.

```typescript
type Gradient = {
    gradientMode: number;
    colorKeys?: ColorKey[];
    alphaKeys?: AlphaKey[];
};

type MinMaxGradientGradient = Gradient & {
    mode: ParticleSystemGradientMode.Gradient | ParticleSystemGradientMode.RandomColor;
};
```

4. **Two Gradients Mode**: For interpolating between two separate gradient definitions.

```typescript
type MinMaxGradientTwoGradients = {
    mode: ParticleSystemGradientMode.TwoGradients;
    gradientMin: Gradient;
    gradientMax: Gradient;
};
```

### Combining All Under a Union Type

Once we have defined the specifics, we can create a union type that encapsulates all our gradient types:

```typescript
export type MinMaxGradient =
    | MinMaxGradientColor
    | MinMaxGradientGradient
    | MinMaxGradientTwoColors
    | MinMaxGradientTwoGradients;
```

This type allows us to use a single variable to represent any of the gradient modes.

### Handling the Gradients

In practice, you would typically use a `switch` statement to handle the different gradient modes. Here’s an example skeleton implementation:
Note that the intellisense only shows possible properties. And when you try to use an incorrect property you'll get an error.

```typescript
function handleGradient(gradient: MinMaxGradient) {
    switch (gradient.mode) {
        case ParticleSystemGradientMode.Color:
            // Handle single color gradient
            console.log(gradient.color);
            break;
        case ParticleSystemGradientMode.TwoColors:
            // Handle two colors gradient
            console.log(gradient.minColor, gradient.maxColor);
            break;
        case ParticleSystemGradientMode.TwoGradients:
            // This gives an error
            console.log(gradient.color);
            break
        // etc
    }
}
```

### Conclusion

By leveraging the power of Discriminated Unions in TypeScript, we can craft robust and flexible definitions for various use cases, such as the particle system gradients we've discussed. This method not only strengthens type safety but also enhances the overall readability and maintainability of the code without sacrificing flexibilty. Embracing these advanced type features makes complex tasks like porting between game engines not just feasible, but also enjoyable and rewarding.

Happy Coding! 🚀
