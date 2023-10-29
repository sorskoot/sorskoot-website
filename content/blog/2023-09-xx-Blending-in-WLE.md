---
id: 20230920
draft: true
title: JS13KGames Devlog 1
date: 2023-09-20T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20230920
permalink: /2023/09/Blending/
categories:
  - WebXR
tags:
  - Wonderland Engine
---

Sure, let's break down each of these options in the blending modes for GLSL (OpenGL Shading Language) shaders.

Blending:

blendSrcRgb: This sets the source RGB factor for blending. The source color will be multiplied by this factor in any blending equation.

blendSrcAlpha: This sets the source Alpha factor for blending. This defines how much of the alpha value from the source will be used in any blending equation.

blendDestRgb: This sets the destination RGB factor for blending. The destination color will be multiplied by this factor in any blending equation.

blendDestAlpha: This sets the destination Alpha factor for blending. It determines how much of the alpha value from the destination will be used in any blending equation.

blendEqRgb: This is used to set a blend equation that uses RGB values for computing output pixel color.

blendEqAlpha: This is used to set a blend equation that uses Alpha values for computing output pixel transparency.

Options for blendSrcRgb, blendSrcAlpha, blendDestRgb and blendDestAlpha:

Zero : Completely ignores this color/alpha information.

One : Fully uses this color/alpha information without modification.

source Color : Uses individual R/G/B components from the source.

one minus source color : Uses one minus individual R/G/B components from the source (it's a form of inversion).

source alpha : Uses alpha component from your original source texture.

6.source alpha saturate : Uses minimum of Source Color or 1 minus DestColor.

7.one minus source alpha : Uses inverted alpha from your original texture - it's an easy way to swap transparent and solid areas in your texture.

8.destination color : Uses individual R/G/B components currently present on screen (destination).

9.one minus destination color : Subtracting individual R/G/B components currently present on screen (destination) from one; another form of inversion, but using what’s already drawn instead of original texture.

10.destination alpha : Similar to 'Source Alpha', but using what’s already been drawn instead of your original texture..

11.one minus destination alpha : Inverted 'Destination Alpha'.

Options for blendEqRgb and blendEqAlpha:

1.add: Adds together both colors/alphas - good for things like lights or glows.

2.subtract: Subtracts both colors/alphas - can be useful with certain types of masks

3.reverse subtract: Subtracts both colors/alphas but swaps order (Destination - Source instead of Source - Destination).

4.min: Gets lower value between Source and Destination; less common usage.

5.max: Gets higher value between Source and Destination; can also have some unique effects.

To achieve traditional transparency effects in GLSL Shaders, you generally want to set your blend settings to respect the source alpha for blending with the destination. Here is a common setting:

```
blendSrcRgb: One
blendSrcAlpha: One
blendDestRgb: one minus source alpha 
blendDestAlpha: one minus source alpha 

blendEqRgb: add
blendEqAlpha: add
```

In this configuration:

blendSrcRgb and blendSrcAlpha are set to One, meaning they will fully use the original color and alpha information from your texture.

blendDestRgb and blendDestAlpha are set to one minus source alpha. It means what's already on screen (the destination) will be multiplied by an inverted version of your texture’s alpha - effectively making sure that only opaque parts of your texture overwrite what's already on screen.

add as a blend equation means colors/alphas will be added together. It is the most commonly used operation for standard transparency because it allows colors to mix together based on their opacity.

These settings should give you typical 'alpha' transparency where the background can show through parts of your new texture based on its alpha channel.

The exact effect you get may also depend on other factors like if depth testing is enabled or disabled, or if there are other effects active in your shader or rendering pipeline.

---

# Let's Talk Shaders: Blending Modes in Wonderland Engine 🎩

Hey everyone! Today, we're gonna explore the curious world of blending modes when working with Wonderland Engine shaders. It might seem a bit tech-heavy, but I'll break it down to make sure it's easy to digest. So, pop on your coding hats and let's dive in!

## Blending Basics

So, blending is totally an intriguing thing in shaders and pipelines. It's basically how different colors mix and match to create new hues. In Wonderland Engine shaders, we tweak certain parameters to set up our blending equations:

- `blendSrcRgb`: This one sets up the source RGB factor for blending.
- `blendSrcAlpha`: This handles the source Alpha factor for blending.
- `blendDestRgb`: This takes care of the destination RGB factor for blending.
- `blendDestAlpha`: This guy sets up the destination Alpha factor for blending.
- `blendEqRgb`: This comes up with a blend equation using RGB values.
- `blendEqAlpha`: This puts together a blend equation using Alpha values.

Each parameter has its own part in cooking up the final blend. But what are their options, and how do we use them? 

## Unmasking the Options

For `blendSrcRgb`, `blendSrcAlpha`, `blendDestRgb`, and `blendDestAlpha`, we've got loads of options. They start from 'Zero', which pretty much ignores color or alpha info, to 'One', which uses them as they are. We also have stuff like 'source color' that uses individual R, G, B components from the source.

`blendEqRgb` and `blendEqAlpha` options include 'add', which combines both colors or alphas (awesome for lights or glows), 'subtract', which removes them (handy with certain mask types), and others like 'min' and 'max' that pick out lower and higher values between Source and Destination.

## Classic Transparency Effects

To pull off regular transparency effects in GLSL Shaders, you'd want your blend settings to respect the source alpha when blending with the destination. Here's a typical setup:

```
blendSrcRgb: One
blendSrcAlpha: One
blendDestRgb: one minus source alpha 
blendDestAlpha: one minus source alpha 

blendEqRgb: add
blendEqAlpha: add
```

In this config, both `blendSrcRgb` and `blendSrcAlpha` are set to 'One'. This means they'll fully utilize the original color and alpha from your texture. On the flip side, both `blendDestRgb` and `blendDestAlpha` are set to 'one minus source alpha'. It means what's already visible on screen (the destination) will be multiplied by an inverted version of your texture’s alpha—making sure that only opaque parts of your texture overwrite what's already visible.

With add as a blend equation, colors and alphas will be added together—a common operation for standard transparency because it allows colors to mingle based on their opacity.

These settings should give you typical 'alpha' transparency where the backdrop can peek through parts of your new texture based on its alpha channel.

However, the precise effect might also depend on other factors like if depth testing is switched on or off, or if there are other effects active in your shader or rendering pipeline.

## That's a Wrap!

And that's all, folks! A quick tour through the realm of blending modes in Wonderland Engine shaders. I hope you've found this handy for your own coding quests. Remember, getting these foundational concepts and how they interact is key to creating those flashy effects we all crave in our games and apps.

Happy coding to all my coder buddies out there! 🚀