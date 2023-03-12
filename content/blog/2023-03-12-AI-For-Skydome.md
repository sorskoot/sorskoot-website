---
id: 20230201
draft: true
title: AI for Skydome
date: 2023-03-12T00:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=202303
permalink: /2023/03/AISkydome/
categories:
  - WebXR  
tags:
  - AI

---

## Skydome

In VR, it's common to add a texture all around the player so there's not a black nothing. This can be any a 360 image, but oftain an image of the sky is used, thus the name 'Skydome'. It's typically used to create a sense of immersion for the user. One way to create a skydome is by using an equirectangular image, which is a type of panoramic image that can be mapped onto a sphere to create a 360-degree view of a scene. By wrapping an equirectangular image around a sphere and place the player on the inside of the sphere, developers can create an immersive environment that surrounds the user in all directions. 

If you have a 360 camera you can use your own pictures. Another way of creating these is by rendering them in Blender for example (see my post on that [here](https://timmykokke.com/blog/2022-05-14-3d-skydomes/)). I recently started using another way of creating these images, using AI.

## Skybox Labs

[Skybox Labs by Blockade Labs](https://skybox.blockadelabs.com/) is a powerful and easy to use tool that allows users to generate equirectangular images using AI, using similar techniques as Stable Diffusion or Midjourney. The tool is free (at the moment of writing) very easy to use. Just head over to Skybox Lab (blockadelabs.com) and enter a short description of what you want your skydome to look like. You can use the list next to the text entry to specify the style you want for your image. Do you want a realistic image? Or is it more suitable for your game to use a more painterly style? When you've made your choice hit generate to get your image.

You can go to https://skybox.blockadelabs.com/ to try it for yourself.

{{< img-link "/images/2023/03/Skydome_example.png" "Skydome Example" >}}

## Example

Here's an example of how to set an equirectangular image as a skydome in A-Frame:

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Equirectangular Image Skydome</title>
    <script src="https://aframe.io/releases/1.4.1/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-sky src="path/to/my-equirectangular-image.jpg" rotation="0 -90 0"></a-sky>
    </a-scene>
  </body>
</html>
```

In this example, we're using the `<a-sky>` primitive to create a skydome. The src attribute is set to the path of our equirectangular image file, and the rotation attribute is set to "0 -90 0" to rotate the image correctly. To try the example for yourself, head over to this [Glitch](https://glitch.com/edit/#!/skybox-a-frame-example) and to see it run go [here](https://skybox-a-frame-example-.glitch.me/).

Of course this might work a bit different in other engines, but all of them support using an image as a skydome.
