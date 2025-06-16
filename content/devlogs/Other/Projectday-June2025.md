---
id: 20250606
draft: true
title: Projectday June2025
date: 2025-06-06T01:00:00+00:00
author: Sorskoot
layout: post
share: true
comments: true
guid: https://www.timmykokke.com/?p=20250606
permalink: /2025/06/ProjectdayJune2025/
categories:
  - devlog
tags:
  - wonderland engine
  - project day
images:
  - /images/devlogStills/projectday0625/Unit104.png
---

Hello Coders! 👾

At Wonderland Engine, every first Friday of the month is 'Project Day'. This day is designed to give those who typically work on the engine a chance to work with it, experiencing firsthand what developers face every day. For me, Project Day is an opportunity to explore engine features I don't usually utilize, or just switch things up a bit from my daily work. Since my daily tasks involve working with the engine, this day provides a fresh perspective and allows me to try something different, giving me a chance to offer valuable feedback on my experiences.

This time around I wanted to create something to show off the engine a bit.

## update 1

Got a nice reference for a layout at
<https://homedesignlover.com/interior-design/one-bedroom-apartment-plans/>.

Roughly adjusted the perspective in photoshop to take measurements and drop in Blender.
![alt text](/images/devlogStills/projectday0625/Snag_28a6ecda.png)
Sketched out the floorplan.
![alt text](/images/devlogStills/projectday0625/Snag_28aa7da1.png)

## update 2

Extracted some walls to test the size
![alt text](/images/devlogStills/projectday0625/Snag_28a72b4a.png)

Test with a few objects. Had to make the rooms slightly larger so I can fit objects in.
![alt text](/images/devlogStills/projectday0625/Snag_28a6bf9f.png)
Also made sure to test in VR
![alt text](/images/devlogStills/projectday0625/com.oculus.browser-20250606-094449.jpg)

## update 3

Decided to go with the Retro farmhouse asset from Unity. This contains prettymuch everything I need for this demo.
<https://assetstore.unity.com/packages/3d/environments/urban/hq-retro-farmhouse-modular-154929>

Since the walls are on a 0.5m grid, I changed the grid in Blender to 0.5 to make setting the walls up pretty simple.

![Wonderland Engine](/images/devlogStills/projectday0625/Snag_2902fb22.png)

![Blender](/images/devlogStills/projectday0625/Snag_29034dc7.png)

And, always check in VR during setting things up to make sure the size feels OK.
 ![alt text](/images/devlogStills/projectday0625/com.oculus.browser-20250606-111851.jpg)
 ![alt text](/images/devlogStills/projectday0625/com.oculus.browser-20250606-111912.jpg)

 Next up. Adding doors, ceilings, floors and the corners of the walls.

Small tip:
You want to prevent surfaces sticking through eachother as much as possible, since that might cause artifacts later on when baking the light maps.
![alt text](/images/devlogStills/projectday0625/Snag_29034dc7.png)

## update 4

Walls, doors, floor and ceiling are in and cleaned up.
![alt text](/images/devlogStills/projectday0625/Snag_2946853c.png)
![alt text](/images/devlogStills/projectday0625/Snag_29484d0b.png)

Next up. Fixing the textures.

## update 5

Small tip for texturing.
There are texture that are tiling. Often these textures correspond with a certain size, in this case it's 2.5m. So, fixing the UVs after merging and modifying textures. I apply them using a Cube projection, with a size of 2.5m. This makes sure they are all the same size.
![alt text](/images/devlogStills/projectday0625/Snag_296c0c89.png)

## update 6

First bumb today. I had some issues with importing the .tif files. So I needed to write a script to convert them to .png. With that working, it's on to adding some textures in Wonderland Engine.

In the Physical shader in Wonderland Engine, the Occlusion, Metalic and Roughness textures are combined into 1. To create this ORM texture, I use a little utility called [Channel Mixer](https://github.com/juninholiveira/channel-mixer). With this you can drop the different textures in and get 1 ORM texture out.

But, with some hickups I do have some textures now.

![alt text](images/devlogStills/projectday0625/Snag_29b2ffae.png)

To fix some issues with the normals, causing artifacts after merging vertices in Blender, I
:Weighted Normal Modifier
Screenshots that show both objects in Edit Mode before and after joining would be quite helpful. You need to add the Weighted Normal Modifier to your mesh to clean up the visual artifacts. Check the Face Orientation. Both objects must be blue in color.

With the materials for the walls, floors, ceiling and doors in place the scene is starting to look better.
![alt text](/images/devlogStills/projectday0625/com.oculus.browser-20250606-144304.jpg)

## Update 7

Lots of textures, and some struggles with the PBR and ORM. Sometimes it works and sometimes it doesn't. (Explain the soltion)

## Update 8

Tried to bake the lights... For some strange reason baking is only black. I don't get it yet...

### Update 8b

I'm stupid...

## Update 9

Tweaking normals and sharp edges...

## Update 10

Not completely done, but it looks OK.
