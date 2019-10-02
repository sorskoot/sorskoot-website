---
id: 1997
draft: false
title: OBS HueShift Shader
date: 2019-10-01T22:13:11+00:00
author: Timmy
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=1997
permalink: /2019/10/Hue-Shift-Shader-OBS
categories:
  - Twitch
tags:
  - LiveCoding
  - Twitch
---

A few weeks ago I was watching [Gael Level](https://www.twitch.tv/Geallevel) on Twitch. And during his stream he had this fun effect going on where he shifted the hue of the camera. I later spoke with him about this and asked what the plugin was that he was using. It turned out there wasn't any and he was creating the effect by hand... Since I'm a developer and don't like repeating things, like clicking, I decided to automate this.

<!--  Intro -->

<!-- {{< clip ConcernedUnusualWatermelonCopyThis >}} -->

## The Shader

In [OBS](https://obsproject.com/) you can install plugins to help with various things. There is an extension to add shaders to various elements. It's called the [OBS ShaderFilter](https://github.com/nleseul/obs-shaderfilter). You use this to load and execute shaders written in the HLSL language. I wrote the following shader:

{{< gist c839e21282ac24a864199bd18f838dbe >}}

You can also download it [here](/media/hue-shift.shader).

## Adding it to a camera

To add the shader, you'll have to add it to a _source_ in OBS. Just right-click a source and go to filters. Click the `plus` icon in the lower left corner and add a `user-defined shader`. Check the property to load a shader from a file and select the file containg the shader. You can tweak the properties until you have something you like.
{{< img-link "/images/2019/10/HueShiftFilterProperties.png" "Hue Shift Filter Properties" >}}

And that's it.

## Thanks

Shout out for the idea of this effect:

{{< twitch gaellevel >}}
