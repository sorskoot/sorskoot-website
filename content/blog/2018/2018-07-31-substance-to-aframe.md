---
id: 1994
title: Substance Painter to AFrame
date: 2018-07-27T22:49:33+00:00
author: Timmy
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=1994
permalink: /2018/07/Substance-Painter-to-AFrame/
categories:
  - AFrame
  - Substance
  - WebVR
tags:
  - Aframe
  - Substance
  - webvr
---
I was working with on a WebVR project the other day and was trying to get a model rendered with the correct textures. I was creating the textures in Substance Painter. I was doing a back and forth between various tools to get the textured model to render correctly. At first, I was using a .obj model. But I rather would have used a .glTF model.
Luckily, there's actually a very nice way to get directly to .glTF  from Substance Painter.

When you are done painting your textures, got to the file menu and look for _Export Textures…_.

![Export step 1](/images/2018/07/sp-export1.png)

In the config dropdown, find _glFT PBR Metal Roughness_. Depending on where I need the resulting files I might lower the resolution of the textures to 512x512. When uploading you models to FaceBook you need to do this to decrease the file size. 

![Export step 2](/images/2018/07/sp-export2.png)

Make any other configuration where needed and hit _export_. 

When you open the resulting folder you'll end up with files like this.

![Export result](/images/2018/07/glb-export.png)

Depending on the usage you can copy these to your project. If you only need the model with textures, the .glb file is probably the one you need. This file contains the .glTF with textures in a binary format.

To use the file in A-Frame, use the `<_a-gltf-model>` tag. Like so:

```html
<a-scene>

  <a-assets>
    <a-asset-item id="art-model" src="/assets/art.glb"></a-asset-item>
  </a-assets>

  <a-gltf-model id="art" src="#art-model" position="0 2.5 -10" ></a-gltf-model>
      
</a-scene>
  ```

  And that's all! 